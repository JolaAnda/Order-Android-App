import { buildSchema } from "graphql";

export default buildSchema(`

type Order {
    id: ID!
    user: User!
    tableNumber: Int!
    orderStatus: Int!
    time: String!
    products: [Product!]
    restaurant: Restaurant!
    total: Float!
}

input InputOrder {
    tableNumber: Int!
    restaurant_id: String!
    products: [String!]!
}

type OrderedProduct{
    id: ID!
    product: Product!
    wish: String!
    order: Order!
}

input InputOrderedProduct{
    product_ID: String!
    wish: String!
    order_ID: String!
}

type Restaurant {
    id: ID!
    name: String!
    address: String!
    payment_methods: [Payment_Method!]
    tables: [String!]
    businessUser: BusinessUser!
    categories: [Category!]
    orders: [Order!]
}

input InputRestaurant{
    name: String!
    address: String!
    businessUser_ID: String!
    payment_method_IDs: [String!]
    tables: String
}

type User {
    id: ID!
    fname: String!
    lname: String!
    email: String!
    token: String!
    payment_methods: [Payment_Method!]
}

input InputUser{
    fname: String!
    lname: String!
    email: String!
    password: String!
    confirmPW: String!
}

type BusinessUser{
    id: ID!
    fname: String!
    lname: String!
    email: String!
    token: String!
    restaurants: [Restaurant!]
}

input InputBusinessUser{
    fname: String!
    lname: String!
    email: String!
    password: String!
    confirmPW: String!
}

type Payment_Method{
    id: ID!
    name: String!
}

input InputPayment_Method{
    name: String!
}

type Category {
    id: ID!
    name: String!
    restaurant: Restaurant!
    products: [Product!]
}

input InputCategory{
    name: String!
    restaurant_ID: String!
}

type Product {
    id: ID!             
    name: String!
    description: String!
    type: String!
    category: Category!
    image_path: String
    price: Float
}

input InputProduct {
    name: String!
    description: String!
    type: String!
    category_ID: String!
    image_path: String
    price: Float
}

type Price {
    id: ID
    price:String
    fromYear: Int
    toYear: Int
    fromMonth: Int
    toMonth: Int
    fromWeek: Int
    toWeek: Int
    fromDay: Int
    toDay: Int
    fromH_min: String
    toH_min: String
}

input InputPrice {
    productID: String
    price: String
    fromYear: Int
    toYear: Int
    fromMonth: Int
    toMonth: Int
    fromWeek: Int
    toWeek: Int
    fromDay: Int
    toDay: Int
    fromH_min: String
    toH_min: String
}


type RootQuery {
    getAllRestaurants: [Restaurant]!
    getRestaurantByID(restaurantID: String!): Restaurant!
    getRestaurantsByBU(businessUser_id: String!): [Restaurant!]

    getCategoriesByRestaurantID(restaurantID: String!): [Category!]
    
    getProductByID(id: String!): Product!
    
    getOrdersByUser(user_id: ID!): [Order]
    getOrdersByUserAndPaid(user_id: ID!, paid: Boolean!): [Order]
    getOrdersByUserAndOrderStatus(user_id: ID!, orderStatus: Int!): [Order]

    getOrderedProductsByRestaurant(restaurant_id: ID!): [OrderedProduct]
    
    userLogin(email: String!, password: String!): User
    verifyUserToken(token: String!): User

    businessUserLogin(email: String!, password: String!): BusinessUser
    verifyBusinessUserToken(token: String!): BusinessUser
}

type RootMutation{
    addRestaurant(userInput: InputRestaurant): Restaurant

    addOrderedProduct(userInput: InputOrderedProduct): OrderedProduct

    addOrder(userInput: InputOrder): Order
    
    addCategory(userInput: InputCategory): Category
    
    addProduct(userInput: InputProduct): Product
    
    addPrice(product_ID: String!, price: Float): Product
    
    addPaymentMethod(userInput: InputPayment_Method): Payment_Method
    
    addUser(userInput: InputUser): User
    
    addBusinessUser(userInput: InputUser): BusinessUser

    addUrlToProduct(productID: String!, url: String!): Product

    deleteOrder(orderID: String!) : Order

}

schema {
    query: RootQuery
    mutation: RootMutation 

}

`);
