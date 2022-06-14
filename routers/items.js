const Item = require('../item');
const express = require('express');

const router = express.Router();

//GET /items - this should render a list of shopping items.
//Here is what a response looks like:
//[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]

router.get('' , (req,res,next) =>{
    try{
        return res.json({items:Item.findAll()});
    } catch(err){
        return next(err)
    }
});

//POST /items - this route should accept JSON data and add it to the shopping list.
//Here is what a sample request/response looks like:
//{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}

router.post('' , (req,res,next)=>{
    try{
        let newItem = new Item(req.body.name , req.body.price);
    }catch(err){
        return next(err)
    }
});

//GET /items/:name - this route should display a single item’s name and price.
//Here is what a sample response looks like:
//{“name”: “popsicle”, “price”: 1.45}

router.get('/:name' , (req,res,next) => {
    try{
        let foundItem = Item.find(req.params.name);
        return res.json({item:foundItem});
    } catch(err){
        return next(err)
    }
});

//PATCH /items/:name, this route should modify a single item’s name and/or price.
//Here is what a sample request/response looks like:
//{“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

router.patch('/:name' , (req,res,next) =>{
    try{
        let foundItem = Item.update(req.param.name , req.body);
        return res.json({ item:foundItem});
    }catch(err) {
        return next(err)
    }
});

//DELETE /items/:name - this route should allow you to delete a specific item from the array.
//Here is what a sample response looks like:
//{message: “Deleted”}

router.delete('/:name' , (req,res,next) =>{
    try{
        Item.remove(req.params.name);
        return res.json({message:"Deleted"});
    }catch(err){
        return next(err)
    }
});

module.exports = router;