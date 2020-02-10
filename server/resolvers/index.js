const algoliasearch = require('algoliasearch');
const client        = algoliasearch('4C6MY66NS6', '054dc98ca4a1a4461a1d9ec6a5191967');
const proIndex      = client.initIndex('products');
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');
const _             = require('lodash');
const User          = require('../models/User');
const Product       = require('../models/Product');
const Order         = require('../models/Order');
const SECRET        = "thisisasecretdonottellanyone";

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
    getOrders: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Not Authenticated!');
        }
        return Order.find({'orderedBy': args.username});
    },
    // Query
    loginUser: async (args) => {
        let user = await User.findOne({'username': args.credentials.username});
        if (!user) {
            throw new Error('username is invalid.');
        }
        let valid = bcrypt.compareSync(args.credentials.password, user.password, function(err) {
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
        let credentials = new User({
            username    : args.credentials.username,
            name        : args.credentials.name,
            email       : args.credentials.email,
            password    : args.credentials.password
        })
        let user = await credentials.save();
        let token = jwt.sign({ 'userInfo': _.pick(user, ['name', 'email']) }, SECRET, { expiresIn: '1y' });
        delete user.password;
        user.token = token;
        return user;
    },
    // Mutation
    createProduct: async (args, req) => {
        // if (!req.isAuth) {
        //     throw new Error('Not Authenticated!');
        // }
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
        return order.save();
    }
};