import axios from "axios";

//Siehe ToDo
//produkte sollten nun eingefügt werden, arrays bis auf preis vorhanden.
//weitere generate und post methoden müssen her
let starterArray = [
    {
        id: "",
        name: "Salat",
        description: "Ein leckerer Salat.",
        category_id: "",
        type: "Salat",
        image_path: ""
    },
    {
        id: "",
        name: "griechischer Salat",
        description: "Ein griechischer Salat.",
        category_id: "",
        type: "Salat",
        image_path: ""
    },
    {
        id: "",
        name: "Wurstsalat",
        description: "Ein Wurstsalat",
        category_id: "",
        type: "Salat",
        image_path: ""
    },
    {
        id: "",
        name: "Brot",
        description: "Ein Brot als Vorspeise.",
        category_id: "",
        type: "Brot",
        image_path: ""
    },
    {
        id: "",
        name: "Suppe",
        description: "Jolas Lieblingssuppe aus hochstetten(Bayern)",
        category_id: "",
        type: "Suppe",
        image_path: ""
    },
    {
        id: "",
        name: "Suppe des Tages",
        description: "Lassen Sie sich überraschen, was es gibt.",
        category_id: "",
        type: "Suppe",
        image_path: ""
    },

];

let mealArray = [
    {
        id: "",
        name: "Hamburger",
        description: "Ein leckerer Hamburger.",
        category_id: "",
        type: "Burger",
        image_path: ""
    },
    {
        id: "",
        name: "Cheeseburger",
        description: "Ein leckerer Cheeseburger.",
        category_id: "",
        type: "Burger",
        image_path: ""
    },
    {
        id: "",
        name: "Pizza Hawaii",
        description: "Pizza belegt mit Schinken und Ananas.",
        category_id: "",
        type: "Pizza",
        image_path: ""
    },
    {
        id: "",
        name: "Pizza Funghi",
        description: "Pizza belegt mit Champignons.",
        category_id: "",
        type: "Pizza",
        image_path: ""
    },
    {
        id: "",
        name: "Chicken Teriyaki",
        description: "Ein Brot - für Zutatem fragen Sie ihren Arzt oder Apotheker.",
        category_id: "",
        type: "Sandwich",
        image_path: ""
    },
    {
        id: "",
        name: "Sub des Tages",
        description: "Lassen Sie sich überraschen, was es gibt.",
        category_id: "",
        type: "Sandwich",
        image_path: ""
    },

];


let dessertArray = [
    {
        id: "",
        name: "Eis",
        description: "Ein leckeres Eis.",
        category_id: "",
        type: "Eis",
        image_path: ""
    },
    {
        id: "",
        name: "McFlurry Cookie Dough",
        description: "Eis mit Keksteig",
        category_id: "",
        type: "Eis",
        image_path: ""
    },
    {
        id: "",
        name: "Donut",
        description: "Ein Donut.",
        category_id: "",
        type: "Süßes",
        image_path: ""
    },
    {
        id: "",
        name: "Berliner",
        description: "Ein Berliner gefüllt mit Fruchtkonfitüre",
        category_id: "",
        type: "Süßes",
        image_path: ""
    },
    {
        id: "",
        name: "Gummibärchen",
        description: "Leckere Gummibärchen.",
        category_id: "",
        type: "Süßes",
        image_path: ""
    },
    {
        id: "",
        name: "Eis des Tages",
        description: "Lassen Sie sich überraschen, was es gibt.",
        category_id: "",
        type: "Eis",
        image_path: ""
    },

];

let categoryArray = [
    {
        id: "",
        restaurant_id: "",
        name: "Vorspeise"
    },
    {
        id: "",
        restaurant_id: "",
        name: "Hauptgang"
    },
    {
        id: "",
        restaurant_id: "",
        name: "Nachspeise"
    },
    {
        id: "",
        restaurant_id: "",
        name: "Vorspeise"
    },
    {
        id: "",
        restaurant_id: "",
        name: "Hauptgang"
    },
    {
        id: "",
        restaurant_id: "",
        name: "Nachspeise"
    },
    {
        id: "",
        restaurant_id: "",
        name: "Vorspeise"
    },
    {
        id: "",
        restaurant_id: "",
        name: "Hauptgang"
    },
    {
        id: "",
        restaurant_id: "",
        name: "Nachspeise"
    }
];

let restaurantArray = [
    {
        id: "",
        name: "McDonalds",
        address: "Marienstr. 27",
        businessUserID: ""
    },
    {
        id: "",
        name: "PizzaHut",
        address: "Hausmannstr. 22",
        businessUserID: ""
    },
    {
        id: "",
        name: "Subway",
        address: "Königsstr. 59",
        businessUserID: ""
    }
];

let businessUserArray = [
    {
        id: ``,
        fname: `Bernd`,
        lname: `Kaulitz`,
        email: `berndkaulitz@gmail.com`,
        password: `password`,
        confirmPW: `password`
    },
    {
        id: ``,
        fname: `Maria`,
        lname: `Hausman`,
        email: `mariahausmann@gmail.com`,
        password: `password`,
        confirmPW: `password`
    },
    {
        id: ``,
        fname: `Sebastian`,
        lname: `Schrummpf`,
        email: `sebastianschrummpf@gmail.com`,
        password: `password`,
        confirmPW: `password`
    }
];
//brauchen wir die?
let orderArray = [
        {
            id: "",
            tableNumber: 5,
            order_status: "delivered",
            time: "15:00",
            paid: true,
            restaurant_id: "",
            user_id: ""
        },
        {
            id: "",
            tableNumber: 23,
            order_status: "pending",
            time: "19:00",
            paid: false,
            restaurant_id: "",
            user_id: ""
        },
        {
            id: "",
            tableNumber: 223,
            order_status: "pending",
            time: "21:00",
            paid: true,
            restaurant_id: "",
            user_id: ""
        },
        {
            id:"",
            tableNumber: 1,
            order_status: "canceled",
            time: "8:00",
            paid: false,
            restaurant_id: "",
            user_id: ""
        }
        
];
let orderedProductsArray = [
    {
        id: "",
        order_id: "",
        price_id: "",
        amount: 2,
        specialWish: "spicy",
        product_id: ""
    },
    {
        id: "",
        order_id: "",
        price_id: "",
        amount: 1,
        specialWish: "medium",
        product_id: ""
    },
    {
        id: "",
        order_id: "",
        price_id: "",
        amount: 1,
        specialWish: "ohne tomaten",
        product_id: ""
    },
    {
        id: "",
        order_id: "",
        price_id: "",
        amount: 5,
        specialWish: "viel soße",
        product_id: ""
    },

];

let userArray= [
    {
        id: "",
        fname: "klaus",
        lname: "kleber",
        email: "kleber@klebengeblieben.to",
        password: "123",
        order_id:""
    },
    {
        id: "",
        fname: "chantal",
        lname: "baumann",
        email: "chantal@baumann.de",
        password: "ponny123",
        order_id: ""
    },
    {
        id: "",
        fname: "Karl",
        lname: "Marx",
        email: "dasKapital@web.de",
        password: "passwort",
        order_id: ""
    },
    {
        id: "",
        fname: "lukas",
        lname: "mustermann",
        email: "lukas@mustermann.me",
        password: "musterpasswort",
        order_id: ""
    }
    
];

let paymentMethodArray = [
{
    id : "",
    name: "paypal",
    user_id: "",
    restaurant_id: ""
},

{
    id: "",
    name: "bar",
    user_id: "",
    restaurant_id:""
}

];






exports.insertData = function () {
    console.log("Inserting Data " + Date.now());

    generateBusinessUser()
        .then(result => {
            generateRestaurants(result).then(result => {
                generateCategories(result).then(result => {
                    generateProducts(result).then(result => {
                  
                    
                        console.log(hyperArray)
                    })
                });
            });
        }).catch(err => {
            console.log(err);
        });
};


 //TODO
                //den teil kann man vermutlich mit einer vorschleife durch den hyperarray besser lösen
                
async function generateProducts(categories) {
    return new Promise((resolve, reject) => {
        innerFunction();

        async function innerFunction() {
            let starterIterator=0;
            let mealIterator=0;
            let dessertIterator=0;
            //for(let i=0; i<categories.length; i++){
            //if (i==0||i%3==0){
            //   for(let count = starterIterator; count<=starterIterator+2; count++)  }}

            //code oben wahrscheinlich unnötig, if abfragen durch modulo ersetzen
            for (let category of categories) {
                if (category == categories[0]){
                for (let starter of starterArray) {
                    starter.category_id = category.id;
                }
                for (let element of starterArray) {
                    await postProduct(element)
                        .then(result => {
                            element.id = result.id;
                        })
                        .catch(err => {
                            reject(err);
                            throw new Error(err);
                        })
                }

                }
                else if(category == categories[1]){
                    for (let meal of mealArray) {
                        meal.category_id = category.id;
                    }
                    for (let element of mealArray) {
                        await postProduct(element)
                            .then(result => {
                                element.id = result.id;
                            })
                            .catch(err => {
                                reject(err);
                                throw new Error(err);
                            })
                    }

                }
                else if(category == categories[2]){
                    for (let dessert of dessertArray){
                        dessert.category_id = category.id;
                    }

                    for (let element of dessertArray) {
                        await postProduct(element)
                            .then(result => {
                                element.id = result.id;
                            })
                            .catch(err => {
                                reject(err);
                                throw new Error(err);
                            })
                    }
                }
                
               

               
               

               

               
            }
            let hyperArray = [starterArray, mealArray, dessertArray];
            resolve(hyperArray);
        }
    });
}

async function postProduct(product) {
    const {name, description, category_id, type, image_path} = product;

    console.log(name);
    console.log(description);
    console.log(category_id);
    console.log(type);

    try {
        const requestBody = {
            query: `
            mutation {
                addProduct(userInput : {
                    name: "${name}",
                    description: "${description}",
                    type: "${type}",
                    category_ID: "${category_id}",
                    image_path: "${image_path}"}) {
                        id
                        }
                    }
            `
        };
        const {data} = await axios.post(
            "http://localhost:5000/graphql",
            requestBody
        );

        if (data.errors) {
            console.log(errors[0]);
        } else {
            const productResult = await data.data.addProduct;

            console.log(productResult);

            return productResult;
        }
    } catch (err) {
        console.log("[ERROR4] " + err);
    }
}

async function generateCategories(restaurants) {
    return new Promise((resolve, reject) => {
        innerFunction();

        var newCategoryArray = [];

        async function innerFunction() {

            for (let i = 0; i<restaurants.length; i++) {
                for (let category of categoryArray) {
                    category.restaurant_id = restaurant.id;
                    newCategoryArray[i]=categoryArray[i];
                }

                for (let element of categoryArray) {
                    await postCategory(element)
                        .then(result => {
                            element.id = result.id;
                        })
                        .catch(err => {
                            reject(err);
                            throw new Error(err);
                        });
                }
            }

            resolve(newCategoryArray);
        }
    });
}

async function postCategory(category) {
    const {name, restaurant_id} = category;

    console.log(name);
    console.log(restaurant_id);
    try {
        const requestBody = {
            query: `
                        mutation {
                          addCategory(userInput: {
                              name: "${name}", 
                              restaurant_ID: "${restaurant_id}"}) {
                                  id
                              }
                          }
        
                      `
        };

        const {data} = await axios.post(
            "http://localhost:5000/graphql",
            requestBody
        );

        if (data.errors) {
            console.log(data.errors[0]);
        } else {
            /*         setError(null);
                      setLoading(false); */
            const categoryResult = await data.data.addCategory;

            console.log(categoryResult);

            return categoryResult;
        }
    } catch (err) {
        console.log("[ERROR3] " + err);
    }
}

async function generateRestaurants(businessUser) {
    return new Promise((resolve, reject) => {
        innerFunction();

        async function innerFunction() {
            let index = 0;

            for (let element of restaurantArray) {
                element.businessUserID = businessUser[index].id;
                index++;
            }

            for (let element of restaurantArray) {
                await postRestaurant(element)
                    .then(result => {
                        element.id = result.id;
                    })
                    .catch(err => {
                        reject(err);
                        throw new Error(err);
                    });
            }

            resolve(restaurantArray);
        }
    });
}

async function postRestaurant(restaurant) {
    const {name, address, businessUserID} = restaurant;
    try {
        const requestBody = {
            query: `
                        mutation {
                            addRestaurant(userInput: {
                                name: "${name}", 
                                address: "${address}", 
                                businessUser_ID: "${businessUserID}"}) {
                                    id
                                }
                            }
        
                      `
        };

        const {data} = await axios.post(
            "http://localhost:5000/graphql",
            requestBody
        );

        if (data.errors) {
            console.log("[ERROR2] " + data.errors);
        } else {
            /*         setError(null);
                      setLoading(false); */
            const restaurantResult = await data.data.addRestaurant;

            return restaurantResult;
        }
    } catch (err) {
        console.log("[ERROR3] " + err);
    }
}

async function generateBusinessUser() {
    return new Promise((resolve, reject) => {
        innerFunction();

        async function innerFunction() {
            for (let element of businessUserArray) {
                await postBusinessUser(element)
                    .then(result => {
                        element.id = result.id;
                    })
                    .catch(err => {
                        reject(err);
                        throw new Error(err);
                    });
            }

            resolve(businessUserArray);
        }
    });
}

async function postBusinessUser(businessUser) {
    const {fname, lname, email, password, confirmPW} = businessUser;
    try {
        const requestBody = {
            query: `
                        mutation {
                          addBusinessUser(userInput: {
                          fname: "${fname}", 
                          lname: "${lname}", 
                          email: "${email}", 
                          password: "${password}", 
                          confirmPW: "${confirmPW}"}){
                                id
                                token
                                email
                            }
                        }
                    `
        };

        const {data} = await axios.post(
            "http://localhost:5000/graphql",
            requestBody
        );

        if (data.errors) {
            console.log(data.errors);
        } else {
            /*         setError(null);
                    setLoading(false); */
            const userResult = await data.data.addBusinessUser;

            return userResult;
        }
    } catch (err) {
        console.log("[ERROR5] " + err);
    }
}
