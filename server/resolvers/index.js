const algoliasearch = require('algoliasearch');
const mailer        = require('nodemailer');
const client        = algoliasearch('4C6MY66NS6', '054dc98ca4a1a4461a1d9ec6a5191967');
const proIndex      = client.initIndex('products');
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const _             = require('lodash');
const User          = require('../models/User');
const Product       = require('../models/Product');
const Order         = require('../models/Order');
const SECRET        = "thisisasecretdonottellanyone";

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

module.exports = {
    // Query
    getProducts: async (args) => {
        let array = await Product.find({'genre': args.genre});
        let from = (args.page - 1) * 10;
        let to = from + 10;
        if (array.length - from < 10) {
            from = 0;
            to = array.length;
        }

        return array.slice(from, to);
    },
    // Query
    singleProduct: async (args) => {
        return Product.findById(args.id);
    },
    // Query
    getOrders: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Not Authenticated!');
        }
        return Order.find({'orderedBy': args.username});
    },
    // Query
    loginUser: async (args) => {
        let user = await User.findOne({'username': args.username});
        if (!user) {
            throw new Error('username is invalid.');
        }
        let valid = bcrypt.compareSync(args.password, user.password, function(err) {
            if (err) throw (err);
        });
        if (!valid) {
            throw new Error('username and password do not match !');
        }
        let token = jwt.sign({ 'userInfo': _.pick(user, ['name', 'email']) }, SECRET, { expiresIn: '1y' });
        delete user.password;
        user.token = token;
        return user;
    },
    // Mutation
    createUser: async (args) => {
        if (!req.isAuth) {
            throw new Error('Not Authenticated!');
        }
        let credentials = new User({
            username    : args.credentials.username,
            name        : args.credentials.name,
            email       : args.credentials.email,
            password    : bcrypt.hashSync(args.credentials.password, 10, function (err) {
                if (err) throw (err);
            }),
        })
        let user = await credentials.save();
        let token = jwt.sign({ 'userInfo': _.pick(user, ['name', 'email']) }, SECRET, { expiresIn: '1y' });
        delete user.password;
        user.token = token;
        return user;
    },
    // Mutation
    createProduct: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Not Authenticated!');
        }
        let product = new Product({
            name         : args.credentials.name,
            author       : args.credentials.author,
            price        : args.credentials.price,
            genre        : args.credentials.genre,
            imgUrl       : args.credentials.imgUrl,
            purchasedBy  : 0,
            numberOfPages: args.credentials.numberOfPages
        });
        await proIndex.saveObject(product,{ autoGenerateObjectIDIfNotExist: true,}, 
            function(err) { if (err) throw err;});
        return product.save();
    },
    // Mutation
    createOrder: async (args, req) => {
        // if (!req.isAuth) {
        //     throw new Error('Not Authenticated!');
        // }
        let order = new Order({
            orderedBy   : args.credentials.orderedBy,
            orderDate   : new Date(),
            products    : args.credentials.products,
            orderAmount : args.credentials.orderAmount
        });
        console.log(process.env.EMAIL)
        let mailOptions = {
            from: process.env.EMAIL,
            to: args.credentials.orderedBy,
            subject: "E-Commerce",
            text: 'There you go!! Just What you Ordered!!.'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
        return order.save();
    }
};