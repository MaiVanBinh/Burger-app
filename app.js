const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000
const MONGODB_URI =  'mongodb+srv://shop:4W6RVfGLECaQkDjL@cluster0-5zjmf.mongodb.net/test?retryWrites=true&w=majority';


const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');

const swaggerOptions={
    swaggerDefinition: {
        components: {},
        info: {
            title: 'Burger app Api',
            description: "This Api doc of this application",
            version: "1.0.0",
            contact: {
                name: "Mai Văn Bình",
                email: "17520280@gm.edu.vn",
            },
            servers: [""]
        }
    },
    apis: ["app.js"]
};

const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/apidocs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /ingredients:
 *  get:
 *    summary: Return ingredients
 *    produces:
 *      - application/json
 *    responses:
 *       '200':
 *         description: OK
 *         schema:
 *              $ref: '#/definitions/Ingredients'
 * /auth/signup:
 *  post:
 *      summary: Use to sign up new account
 *      parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *              $ref: '#/definitions/User'
 *      responses:
 *          '201':
 *               description: Create Success
 *               schema:
 *                  $ref: '#/definitions/SignupSuccess'
 *          '422':
 *              description: return error if input is invalid (email  valid and password > 5)
 *              schema:
 *                  $ref: '#/definitions/AuthError'
 *          '500':
 *               description: return error if server error
 * /auth/login:
 *  post:
 *      summary: Use lo login
 *      parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *              $ref: '#/definitions/User'
 *      responses:
 *          '200':
 *               description: Login success
 *               schema:
 *                  $ref: '#/definitions/LoginSuccess'
 *          '401':
 *              description: Login Failed
 *              schema:
 *                  $ref: '#/definitions/LoginFail'
 *          '500':
 *               description: return error if server error
 * /orders:
 *  get:
 *      summary: get list order burger
 *      parameters:
 *       - in: query
 *         name: auth
 *         description: Token is recived when login
 *         type: string
 *         required: true
 *      responses:
 *          '200':
 *              description: OK
 *              schema:
 *                  $ref: '#/definitions/OrderList'
 *  post:
 *       summary: order burger
 *       parameters:
 *       - in: query
 *         name: auth
 *         description: Token is recived when login
 *         type: string
 *         required: true
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *              $ref: '#/definitions/Order'
 *       responses:
 *          '201':
 *               description: Create Success
 *               schema:
 *                  type: object
 *                  properties: 
 *                      _id: 
 *                          type: string
 *                          example: "5ebe7fdaf7e85a3eec3627c6"
 *          '500':
 *               description: return error if server error
 * definitions:
 *  OrderList:
 *      type: array
 *      items:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  example: "5ebe75f8aa814e22a0c8c48b"
 *              userId:
 *                  type: string
 *                  example: "5ebe75f8aa814e22a0c8c48b"
 *              createdAt:
 *                  type: string
 *                  example: "2020-05-15T10:59:04.381Z"
 *              updatedAt:
 *                  type: string
 *                  example: "2020-05-15T10:59:04.381Z"
 *              price:
 *                  type: number
 *                  example: 6.7
 *              ingredients:
 *                  type: object
 *                  properties:
 *                      bacon:
 *                          type: number
 *                          example: 2
 *                      cheese:
 *                          type: number
 *                          example: 2
 *                      meat:
 *                          type: number
 *                          example: 2
 *                      salad:
 *                          type: number
 *                          example: 2
 *              orderData:
 *                  type: object
 *                  properties:
 *                      country:
 *                          type: string
 *                          example: "HCM"
 *                      deliveryMethod:
 *                           type: string
 *                           example: "fastest"
 *                      email:
 *                          type: string
 *                          example: "sda@adas.cmas"
 *                      name:
 *                          type: string
 *                          example: "mvb"
 *                      street:
 *                          type: string
 *                          example: "quan1"
 *                      zipcode:
 *                          type: string
 *                          example: "12345"
 *  User:
 *      type: object
 *      properties:
 *          email:
 *              type: string
 *              example: test@test.com
 *          password:
 *              type: string
 *              example: "12345"
 *  Ingredients:
 *      type: object
 *      properties:
 *          meat:
 *              type: number
 *              example: 0
 *          bacon:
 *              type: number
 *              example: 0
 *          cheese:
 *              type: number
 *              example: 0
 *          salad:
 *              type: number
 *              example: 0
 *  SignupSuccess: 
 *      type: object
 *      properties:
 *          message:
 *              type: string
 *              example: Create Success
 *          userId:
 *              type: object
 *              example: {$oid: 5ebe597143b8dc357464f932}
 *  AuthError: 
 *      type: object
 *      properties:
 *          message:
 *              type: string
 *              example: Invalid input
 *          data:
 *              type: string
 *              example: Email already exists
 *  LoginSuccess:
 *      type: object
 *      properties:
 *          token:
 *              type: string
 *          expirationTime:
 *              type: number
 *              example: 3600
 *          userId:
 *              type: object
 *              example: {$oid: 5ebe597143b8dc357464f932}
 *  LoginFail: 
 *      type: object
 *      properties:
 *          message:
 *              type: string
 *              example: "Email or password fail"
 *  Order:
 *      type: object
 *      properties:
 *          ingredients:
 *              type: object
 *              properties:
 *                  bacon:
 *                      type: number
 *                      example: 2
 *                  cheese:
 *                      type: number
 *                      example: 2
 *                  meat:
 *                      type: number
 *                      example: 2
 *                  salad:
 *                      type: number
 *                      example: 2
 *          orderData:
 *              type: object
 *              properties:
 *                  country:
 *                      type: string
 *                      example: "HCM"
 *                  deliveryMethod:
 *                      type: string
 *                      example: "fastest"
 *                  email:
 *                      type: string
 *                      example: "sda@adas.cmas"
 *                  name:
 *                      type: string
 *                      example: "mvb"
 *                  street:
 *                      type: string
 *                      example: "quan1"
 *                  zipcode:
 *                      type: string
 *                      example: "12345"
 *          price: 
 *              type: number
 *              example: 6.7
 */




const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// De co the truy cap tren nhieu domain
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});
app.get('/ingredients', (req, res) => {
    res.status(200).json({
        meat: 0,
        bacon: 0,
        cheese: 0,
        salad: 0
    });
});
app.use('/auth' ,authRoutes);
app.use('/orders', orderRoutes);

app.use((e, req, res, next) => {
    const status = e.statusCode;
    const message = e.message;
    let data = e.data;
    if(!data){
        data = ["unexpect error"]
    }
    res.status(status).json({message: message, data: data[0].msg});
})
mongoose.connect(MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => {
    app.listen(PORT, () => {
        console.log('Server run!');
    });
})
.catch(e => console.log(e));


