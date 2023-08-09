//Importación de faker-js
import { faker } from "@faker-js/faker";

//GENERACIÓN DE MOCK PRODUCTS EN JSON
//Se define la función para generar products
/*
export function generateProducts(){
    return {
        //Definición de propiedades del producto con faker
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(6),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int({min:1, max: 50}),
        category: faker.commerce.department(),
        thumbnail: faker.image.url(),
    }
}
*/

//GENERACIÓN DE MOCK PRODUCTS EN DB
export function generateProducts(){
    return {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(6),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.number.int({min:1, max: 50}),
        category: faker.commerce.department(),
        thumbnail: faker.image.url(),
    }
}