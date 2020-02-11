const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type Product {
        _id             : String!
        name            : String!
        author          : String!
        price           : Float!
        genre           : String!
        imgUrl          : String!
        purchasedBy     : Float!
        numberOfPages   : Float!
    }

    type Order {
        _id             : String!
        orderedBy       : String!
        orderDate       : String!
        products        : [String]
        orderAmount     : Float!
    }

    type User {
        username        : String!
        name            : String!
        email           : String!
        password        : String!
    }

    type UserToken {
        username        : String!
        name            : String!
        email           : String!
        token           : String!
    }

    input SignUpInput {
        username        : String!
        name            : String!
        email           : String!
        password        : String!
    }

    input ProductInput {
        name            : String!
        author          : String!
        price           : Float!
        genre           : String!
        imgUrl          : String!
        numberOfPages   : Float!
    }

    input UserInput {
        username        : String!
        password        : String!
    }

    input OrderInput {
        orderedBy       : String!
        products        : [String!]!
        orderAmount     : Float!
    }

    type RootQuery {
        getProducts(genre: String!, page: Float!)   : [Product]
        singleProduct(id: String!)                  : Product
        getOrders(username: String!)                : [Order]
        loginUser(credentials: UserInput)           : UserToken
    }

    type RootMutation {
        createUser(credentials: SignUpInput)        : UserToken
        createProduct(credentials: ProductInput)    : Product
        createOrder(credentials: OrderInput)        : Order
    }

    schema {
        query       : RootQuery
        mutation    : RootMutation
    }
`);