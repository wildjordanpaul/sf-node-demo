# sf-node-demo
A Basic Node.js REST server from demo given 2/20/2015

To get things running locally, you will need to install node (or io.js):
* For io.js - https://iojs.org
* Mac: `brew install node`
* Windows: download online
* Ubuntu: `sudo apt-get install nodejs`
* RedHat: `sudo yum install nodejs`

Then navigate into the repo, and run:
  `npm install`

To run the server:
  `node index.js`
  
The server will be running at: http://localhost:4444/api
  
Note: To get the app to work correctly, you will need to:
  * Install postgresql
  * `CREATE DATABASE demo_db`
  * change the conString variable in psql-provider.js to point to your local psql server
  * alternatively, you could write your own mongo/mysql provider
    (see http://mongoosejs.com/ or https://github.com/felixge/node-mysql/)

To read more about the Node modules that were used:
  * https://github.com/brianc/node-postgres
  * http://expressjs.com/

