# isItOpen
Is it open? By Steven Gibson, Jimmy Keating, Alex Franklin, Jack Carroll, and Gerard Lucas

[Main Website](https://whatstarted.com/)  
[API Guide](https://server.whatstarted.com/api-docs/#/)


## Back-End
This project lives in the "server" folder. To install, cd to the server folder and run:  

### `npm install` 

To start the server cd to server folder and run:  

### `npm start`  

Organization:
-------------
- app.js: Application setup and entry point
- .env: Configuration settings
- Models: Mongoose definition files for things stored in MongoDB
- Controllers: API endpoint setup for each model allowing for data access
- Services: Importable, reusable functionality

Make a new database object and use in API:
------------------------------------------
- Add model in models folder.
- create controller in controllers folder.
- optional: add openapi documentation for use with swagger-ui (http://localhost:8099/api-docs/)
- add to controller import section of app.js (search for comment: // import controllers)
- data should be available at http://localhost:8099/api/*yourendpoint* (and at http://localhost:8099/api-docs/ if openapi docs present)


## Front-End
This project lives in the "client" folder. To install, cd to the client folder and run:

### `npm install` 

To start the react website cd to client folder and run:

### `npm run dev`

Project created with React + Vite template.


