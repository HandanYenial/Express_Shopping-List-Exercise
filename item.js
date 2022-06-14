const items = require("./fakeDb")

class Item{ // each item in the shopping list will have a name and a price
    constructor(name, price){
        this.name = name;
        this.price = price;

        items.push(this);
    }

    static findAll(){  // will retun all items in the list
        return items
    }

    static update(name,data){ // to update the items in the list
        let foundItem = Item.findAll(name);
        if (foundItem === undefined) {
            throw{message:"Not Found" , status:404}
        }
        foundItem.name = data.name;
        foundItem.price = data.price;

        return foundItem;
    }

    static find(name){
        const foundItem = items.find(v=>v.name ===name);
        if(foundItem === undefined){
            throw {
                message:"Not found" , status:404}
            }
            return foundItem
        }

    static remove(name){ // to remove the item with matching id
        let foundIndex = items.findIndex(v=>v.name === name);
        if(foundIndex === -1){
            throw {message: "Not Found" , status:404}
        }
        items.splice(foundIndex,1);
    }
    
}

module.exports = Item;