// set the environment
process.env.NODE_ENV = "test";
const { exportAllDeclaration } = require("@babel/types");
const { executionAsyncId } = require("async_hooks");
//npm package
const request = require("supertest");
const { describe } = require("yargs");
//import app
const app = require("../app");
let items = require("../fakeDb");

let item={ name: "silly" , price:200 }

beforeEach(async() => {
    items.push(item)
});

afterEach(async()=>{
    items = []
});

//GET /items - this should render a list of shopping items.
//Here is what a response looks like:
//[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
describe("GET/items" , async function(){
    test("Gets a list of items" , async function(){
        const response = await request(app).get(`/items`);
        const { items } = response.body;
        expect(response.statusCode).toBe(200);
        expect(items.toHaveLength(1));
    });
});

//GET /items/:name - this route should display a single item’s name and price.
//Here is what a sample response looks like:
//{“name”: “popsicle”, “price”: 1.45}

describe("GET/items/:name" , async function(){
    test("Gests a single item" , async function(){
        const response = await request(app).get(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual(item);
    });

    test("Responds with 404 if can't find item" , async function(){
        const response = await request(app).get(`/items/0`);
        expect(response.statusCode).toBe(404);
    });
});

//POST /items - this route should accept JSON data and add it to the shopping list.
//Here is what a sample request/response looks like:
//{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}

describe("POST/items" , async function(){
    test("Creates a new item" , async function(){
        const response = await request(app)
        .post(`/items`)
        .send({
            name : "Taco",
            price : 0
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toHaveProperty("name");
        expect(response.body.item).toHaveProperty("price");
        expect(response.body.item.name).toEqual("Taco");
        expect(response.body,item.price).toEqual(0);
    });
});

//PATCH /items/:name, this route should modify a single item’s name and/or price.
//Here is what a sample request/response looks like:
//{“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

describe("PATCH/items/:name" , async function(){
    test("Updates a single item" , async function(){
        const response = await request(app)
        .patch(`/items/${item.name}`)
        .send({
            name : "Troll"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual({
            name : "Troll"
        });
    });

    test("Responds with 404 if can't find item", async function () {
        const response = await request(app).patch(`/items/0`);
        expect(response.statusCode).toBe(404);
    });
});

//DELETE /items/:name - this route should allow you to delete a specific item from the array.
//Here is what a sample response looks like:
//{message: “Deleted”}

describe("DELETE /items/:name", async function () {
    test("Deletes a single a item", async function () {
      const response = await request(app)
        .delete(`/items/${item.name}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "Deleted" });
    });
});
