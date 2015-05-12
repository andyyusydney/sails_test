# sails_test

a [Sails](http://sailsjs.org) application

1. Run the application: sails lift.

2. Create a new project
- sails new projectName
- cd projectName
- sails generate model user

3. setup a project in Production
- npm install waterline-mysql
- set the value of 'default' to 'mysql' in config/adapters.js.
- config the settings of mysql: {
		module: 'waterline-mysql',
		host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
		user: 'YOUR_MYSQL_USER',
		password: 'YOUR_MYSQL_PASSWORD',
		database: 'YOUR_MYSQL_DB'
	}
- change the port number to be 80 and evironment to be 'production' in config/application.js

Resources:
1. Intro to Sails.js
https://www.youtube.com/watch?v=GK-tFvpIR7c&feature=youtu.be 

2. SailsCast: Building a Sails Application
https://www.youtube.com/playlist?list=PLWsZeJCry-F4K4iRImeB3-i0S5mw9Ak-W 

3. Creating a web application from scratch using sails.js
https://www.youtube.com/playlist?list=PLf8i4fc0zJBzLhOe6FwHpGhBDgqwInJWZ 