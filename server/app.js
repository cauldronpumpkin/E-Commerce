const express           = require('express');
const bodyParser        = require('body-parser');
const cors              = require('cors');
const mongoose          = require('mongoose');
const sharp             = require('sharp');
const fs                = require('fs');
const aws               = require('aws-sdk');
const multer            = require('multer');
const graphqlHttp       = require('express-graphql');
const graphQlSchema     = require('./schema/index');
const graphQlResolvers  = require('./resolvers/index');
const auth              = require('./middleware/auth');


const app = express();
const PORT = process.env.PORT || 4000;
mongoose.Promise = require('bluebird');
const upload = multer({
    dest: './uploads/'
});
aws.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: "ap-south-1"
})

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(auth);

// connecting to mongodb
mongoose.connect('mongodb+srv://ishu:mymellon@cluster0-equia.mongodb.net/test?retryWrites=true&w=majority');
db = mongoose.connection;
db.on('error', err => {
    console.log('There was a db connection error');
    console.log(err);
});
db.once('connected', () => {
    console.log("Connected To MongoDB.");
});

// graphql server
app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

// image upload
app.post('/upload', upload.single("file"), async (req, res) => {
    // if (!req.isAuth) {
    //     throw new Error("Not Authenticated!");
    // }
    const s3 = new aws.S3();
    try {
        const now = new Date();
        const buffer = await sharp(req.file.path).resize(220).toBuffer();
        const s3res = await s3.upload({
            Bucket: "ishu-product-image",
            Key: `${now}-${req.file.originalname}`,
            Body: buffer,
            ContentType: 'image/jpeg',
            ACL: "public-read"
        }).promise();

        fs.unlink(req.file.path, () => {
            res.json({ url: s3res.Location });
        })
    } catch(err) {
        console.log(err);
        res.json({err});
    }
});  

// setting up server
app.listen(PORT, () => {
    console.log(`Server has started on ${PORT}`);
})