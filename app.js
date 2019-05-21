const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const swaggerUI = require('swagger-ui-express');
//const swaggerDoc = require('./swagger.json');

const app = express();

const productRoutes = require('./api/routes/productsRoute')
//const ordersRoutes = require('./api/routes/ordersRoute')
const usersRoutes = require('./api/routes/usersRoute')

//app.use('/', swaggerUI.serve);
//app.get('/swagger', swaggerUI.setup(swaggerDoc));



const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'Alistair API',
      version: '1.0.0',
      description: 'Test Express API with autogenerated swagger doc',
    },
    termsOfService: "http://swagger.io/terms/",
  contact: {
    email: "apiteam@swagger.io"},
  license:{
    name: "Apache 2.0",
    url: "http://www.apache.org/licenses/LICENSE-2.0.html",
  },
    "schemes": [
        "http"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],

    securityDefinitions: {
        ApiKeyAuth: {
          type: 'apiKey',
          //description: 'JWT authorization of an API',
          name: 'Authorization',
          in: 'header',
        }
    }

  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['./api/routes/*.js'],
};

const specs = swaggerJsdoc(options);

const swaggerUi = require('swagger-ui-express');

app.use(compression());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));






app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With', 'Content-Type', 'Accept', 'Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});


app.use('/products', productRoutes);
//app.use('/orders', ordersRoutes);
app.use('/users', usersRoutes);

//app.use( (req, res, next)=>{
//          res.status(200).json(
//              {message: 'Hello Restful API Node'}
//          );
//
//    });


//error handling
//not found

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

});

app.use((error, req, res, next)=>{
    res.error = error.status || 500;
    res.json({error : {message: error.message}});

    

});

module.exports = app;


