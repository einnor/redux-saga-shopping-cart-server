const express = require('express');
const cors = require('cors');
const port = 8081;
const app = new express();
YAML = require('yamljs');

const serverDelayConstant = 100;
// Simulate a small amount of delay to demonstrate app's async features
app.use((req,res,next)=>{
    const delay = (Math.random() * 15 + 5) * serverDelayConstant;
    setTimeout(next,delay);
});

app.use(express.static('public'));

nativeObject = YAML.load('database.yml',(database)=>{
	
	const makeCartAdjustmentRoute = (shouldAdd = true) => (req,res)=>{
        const { owner, itemID } = req.params;
        const cart = database.carts.find(cart=>cart.owner === owner);
        if (!cart) {
            return res
                .status(500)
                .json({
                    error:"No cart found with the specified ID",
                    owner
                })

        }

        const item = database.items.find(item => item.id === itemID);
        if (!item) {
            return res
                .status(500)
                .json({
                    error:"No item found with the specified ID",
                    itemID
                })
        }

	
        const existingItem = cart.items.find(cartItem=>cartItem.id === itemID);
        if (existingItem) {
			if (shouldAdd && parseInt(existingItem.quantity) >= parseInt(item.quantityAvailable)) {
				return res.status(503)
				.json({
					error:"An insufficient quantity of items remains.",
					itemID,
					quantityAvailable:item.quantityAvailable
				});
			}
            existingItem.quantity += (shouldAdd ? 1 : -1);
            if (existingItem.quantity === 0) {
                cart.items = cart.items.filter(item=>item.id !== itemID);
            }
        } else {
            if (shouldAdd) {
                cart.items.push({
                    quantity:1,
                    id:itemID
                })
            } else {
                return res.status(500)
                    .json({
                        error:"No item with the specified ID exists in the cart to be removed",
                        owner,
                        itemID
                    })
            }

        }
        res
            .status(200)
            .send(cart);
    }

    

    app.listen(port,()=>{
        console.log(`Redux Saga Cart backend server is listening on ${port}`)
    });
});
app.use(cors());
