# Nexu Backend 
This backend is building with MongoDB, Express Js/Node Js.

# Enviroment Setup
```
MongoDB version 7.0.7
Node Js version 16.20.2
NPM version 8.19.4
```

## Install Dependencies
After run the backend you will need to install dependencies using the command
`npm i`

## Important
The `id` of the routes will be a `_id` Object of MongoDB. The id element of the JSON is also avalaible but all the querys was building using this native id of MongoDB.
The `id` value of the model.json was savit because i don't know if has some else purpose

## Available Scripts
In the project directory, you can run:
### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:4321](http://localhost:4321) to view it in your browser.\

The console will show you a menu like this

```
    1) models.js  --   Brands - Models
      Add Brands and Models to database

    2)  ----- FINISH PROGRAM -----
```
To fill the database with the `model.json` data, type: 1 on the console and wait the message: `Successfully executed!`


### `npm run test`
Launches the test runner for Windows OS.


### `npm run test-linux`
If you using Linux OS you can run this command for launches the test


## Notes
The structure of the project is a little different than what we usually do due to the use of tests, which broke my usual scheme a little.
I noticed that the project does not require pagination of the data, so I did not apply it. But in a real proyect this slows down frontend performance.
I laid the foundations for the pagination that I usually use in the models.




