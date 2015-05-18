/**
 * Jplist.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var getFilterQuery = function(status, prevQuery, preparedParams){

  var query = ''
    ,name = status.name
    ,data = status.data;

  if(name && data){

    switch(name){

      case 'title-filter':{

        if(data.path && data.value){

          if(prevQuery.indexOf('where') !== -1){
            query = ' and title like ?? ';
          }
          else{
            query = 'where title like ?? ';
          }

          preparedParams.push('%' + data.value + '%');
        }
      }
        break;

      case 'desc-filter':{

        if(data.path && data.value){

          if(prevQuery.indexOf('where') !== -1){
            query = ' and description like ?? ';
          }
          else{
            query = 'where description like ?? ';
          }

          preparedParams.push('%' + data.value + '%');
        }
      }
        break;
    }
  }

  return query;
};

var getSortQuery = function(status, preparedParams){

  var query = ''
    ,data = status.data
    ,order = 'asc';

  if(data && data.path){

    switch(data.path){

      case '.title':{
        query = 'order by title';
      }
        break;

      case '.desc':{
        query = 'order by description';
      }
        break;

      case '.like':{
        query = 'order by likes';
      }
        break;
    }

    if(query){
      if(data.order){
        order = data.order.toLowerCase();
      }

      if(order !== 'desc'){
        order = 'asc';
      }

      query = query + ' ' + order;
    }
  }

  return query;
};

var getPagingQuery = function(status, count, preparedParams){

  var query = ''
    ,data = status.data
    ,currentPage = 0
    ,number = 0;

  if(data){

    currentPage = Number(data.currentPage) || 0;
    number = Number(data.number) || 0;

    if(count > number){
      query = 'LIMIT ' + currentPage * number + ', ' + number;
    }
  }

  return query;
};

module.exports = {
  adapter: 'mySqlServer',
  attributes: {
    title: 'string'
  },
  getItemsList: function(statuses, cb){
    //sails.log("statuses=", statuses);

    var json = {}
      ,query = ''
      ,status
      ,filter = ''
      ,sort = ''
      ,paging = ''
      ,pagingStatus = null
      ,preparedParams = []
      ,count = 0
      ,stmt;

    for(var i=0; i<statuses.length; i++){

      //get status
      status = statuses[i];

      switch(status.action){

        case 'paging':{
          pagingStatus = status;
        }
          break;

        case 'filter':{
          filter += getFilterQuery(status, filter, preparedParams);
        }
          break;

        case 'sort':{
          sort = getSortQuery(status, preparedParams);
        }
          break;
      }
    }

    //count database items for pagination
    query = 'SELECT count(ID) as count FROM `item` ' + filter + ' ' + sort;

    console.log("query1=", query);
    Jplist.query(query, preparedParams, function(err, results){

      if(!err && _.isArray(results) && results.length > 0){
        count = results[0].count;
      }

      if(pagingStatus){
        paging = getPagingQuery(pagingStatus, count, preparedParams);
      }

      //init query with sort, filter and pagination
      query = 'SELECT * FROM `item` ' + filter + ' ' + sort + ' ' + paging;
      console.log("query 2=", query);
      Jplist.query(query, preparedParams, function(err, results){
        if (err){
          return cb(err, {});
        }

        //sails.log("results=", results);

        cb(null, {
          count: count
          ,data: results
        });
      });
    });

    //var sql = "select * from item";
    /*Jplist.query(sql, function(err, data){
      if (err){
        return cb(err, {});
      }

      return cb(null, data);

    })*/
  }
};

