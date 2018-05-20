# Stack

`Server:` `Express.js` - I chose Express because of its flexibility and minimalism.

`Database:` `MongoDB` - I chose MongoDB (NoSQL) solution over SQL because I could host database on [mlab](http://mlab.com) with one click, also because I didn't need here any transactions and I don't have here many relations.

`ODM:` `Mongoose` - I chose Mongoose because of its data validation, plugins and data abstraction.

`Test:` `Jest` - I chose Jest because I wanted to try something new.

`Documentation:` `Swagger UI` - I chose Swagger because I admire it for design, and possibility of automation.

# Live version
API is hosted on [Heroku](https://movie-db-rest-api.herokuapp.com/docs/), so you can play with it without installing.

# Prerequisites
* Latest version of Node and NPM 
# Start
* ```npm install```

* ``` cp .env.example .env```

* ``` cp .env.test.example test/.env```

* ```npm start```

App is running by default on port `3000`.

# Database

You don't need to have MongoDB installed on your device if you using example enviroments.

If you want to use your own MongoDB then you should provide proper entry for ```MONGO_URL``` key in ```.env``` file. 

Value of this ```MONGO_URL``` key should follow convenction:

`mongodb://<dbuser>:<dbpassword>@<address>:<port>/<dbname>`

# Documentation
API documentation was made by using Swagger framework, you can found it on [/docs](https://movie-db-rest-api.herokuapp.com/docs/) route


# OMBDApi
Application uses OMBDBApi to fetch information about movies.

OMDBApi needs api key to work properly, by default api key is exposed in ```.env.example```, so you don't need to bother about yours, just copy it from ```.env.example```

If you want to use your own ```API KEY``` then you should provide proper entry for ```OMDB_API_KEY``` key in ```.env``` file.


# Testing
Make sure you have done steps from ``Start`` section
then `npm run test`.

Keep in mind that when you run `npm run test` test database is used

Integration tests are located in `/test/integration`

Unit tests are located in `/test/unit`


# Environments
I exposed my enviroment variables on purpose - so you can play with application with minimal effort.


