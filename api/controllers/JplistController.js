module.exports = {
  index: function(req, res, next) {
    console.log('req.xhr=', req.xhr);

    var sql = "select * from item";
    Jplist.query(sql, function(err, data){
      sails.log("data=", data);

      var data = {
        data: data
      };

      //return res.ok(data); // JSON
      if (req.xhr) { // xhr
        data.layout = null;
      }
      res.view(data);
    });

    /* Jplist.find()
      .exec(function(err, response){
        sails.log("response=", response);

        if (err) return next(err);

       //return res.ok(data); // JSON
       if (req.xhr) { // xhr
       data.layout = null;
       }
       res.view(data);

      });*/
  }

};
