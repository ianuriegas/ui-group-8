const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

app.use(express.json());

const uri = "mongodb+srv://temp:temp1234@ui-group-8.migbrji.mongodb.net/"
let client;
let db;

const connectToMongo = async () => {
  if (!client) {
    client = new MongoClient(uri);
      await client.connect();
      db = client.db("group_8_db"); 
      console.log("Connected to MongoDB");
  }
};

connectToMongo().catch(console.error);

//Function To Sort Items By Category
function FetchCategory(itemArray, category){
  let items =[];
  itemArray.forEach(item => {
    if(item.category == category){
      items.push(item)
    }
    
  });
  return items;

}

//Function to sort Items By Price
function sortByPrice( itemArray){
  const sortedArray = itemArray.sort((a,b) =>{
    return a.price - b.price;
  });
  return sortedArray;
}

app.get("/getProducts", async (req, res) => {
  try {
    const products = db.collection("products");
    
    const productsList = await products.find({}).toArray();
    res.json(productsList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Test Route
// app.get("/getFrozen" , async (req, res) => {
// try {
//   await client.connect();
//     const database = client.db("group_8_db");
//     const products = database.collection("products");
//     const productsList = await products.find({}).toArray();
//     const frozenlist = await FetchCategory(productsList,"Dairy");
    
//     // frozenlist.sort((a,b) =>{
//     //   return a.price - b.price;
//     // });
    
//     console.log(sortByPrice(frozenlist));
//     res.json(productsList);
// } catch (e) {
//   res.status(500).json({ error: e.message });
  
// }finally{
//   await client.close();
// }
// });

app.get("/getDiscounts", async (req, res) => {
  try {
    const products = db.collection("discounts");
    const productsList = await products.find({}).toArray();
    res.json(productsList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    const users = db.collection("users");
    const usersList = await users.find({}).toArray();
    res.json(usersList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/getUserFromUsername", async (req, res) => {
  try {
    const { username } = req.query;
    const users = db.collection("users");
    const user = await users.findOne({ "username": username }); 

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/createUser", async (req, res) => {
  try {
    const users = db.collection("users");
    const result = await users.insertOne(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } 
});

app.post('/updateCart', async (req, res) => {
  try {
      const { username, productId, quantity } = req.body;

      if (!username || !productId || typeof quantity !== 'number') {
          return res.status(400).json({ error: 'Missing required fields or invalid data types.' });
      }

      const users = db.collection("users");

      const user = await users.findOne({ username });

      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }

      const itemExists = user.cart.items.find(item => item.productId === productId);

      if (itemExists) {
          await users.updateOne(
              { username, "cart.items.productId": productId },
              { $set: { "cart.items.$.quantity": quantity } }
          );
      } else {
          await users.updateOne(
              { username },
              { $push: { "cart.items": { productId, quantity } } }
          );
      }

      res.json({ message: 'Cart updated successfully.' });
  } catch (error) {
      console.error('Error updating the cart:', error);
      res.status(500).json({ error: 'Failed to update cart.' });
  }
});

app.put('/replaceCart', async (req, res) => {
  try {
      const { username, cart } = req.body;

      // Validate the required inputs
      if (!username || !cart || !Array.isArray(cart.items)) {
          return res.status(400).json({ error: 'Missing required fields or invalid cart format.' });
      }

      const users = db.collection("users");

      // Check if the user exists
      const user = await users.findOne({ username });
      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }

      // Replace the cart, ensuring that items and discountCode are correctly structured
      const result = await users.updateOne(
          { username },
          { $set: { 'cart': { items: cart.items, discountCode: cart.discountCode || "" } } }
      );

      if (result.modifiedCount === 0) {
          return res.status(404).json({ error: 'No changes made to the cart.' });
      }

      res.json({ message: 'Cart replaced successfully.' });
  } catch (error) {
      console.error('Error replacing cart:', error);
      res.status(500).json({ error: 'Failed to replace cart.' });
  }
});

app.post('/addToCart', async (req, res) => {
  try {
    const { username, productId, quantity } = req.body;

    if (!username || !productId || !quantity) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const users = db.collection("users");

    const user = await users.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const updatedUser = await users.findOneAndUpdate(
      { username },
      {
        $push: {
          'cart.items': { productId, quantity }
        }
      },
      { returnOriginal: false }
    );
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Failed to add product to cart.' });
  }
});

app.post('/addToSubscription', async (req, res) => {
  try {
    const { username, productId } = req.body;

    if (!username || !productId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    const users = db.collection("users");

    const user = await users.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const updatedUser = await users.findOneAndUpdate(
      { username },
      {
        $push: {
          'subscriptions.productIds': productId
        }
      },
      { returnOriginal: false }
    );
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Failed to add product to cart.' });
  }
});

app.post('/addToWishlist', async (req, res) => {
  try {
    const { username, productId } = req.body;

    if (!username || !productId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const users = db.collection("users");

    const user = await users.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const updatedUser = await users.findOneAndUpdate(
      { username },
      {
        $push: {
          'wishlist.productIds': productId
        }
      },
      { returnOriginal: false }
    );
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Failed to add product to cart.' });
  }
});

app.post('/addToFavorites', async (req, res) => {
  try {
    const { username, productId } = req.body;

    if (!username || !productId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const users = db.collection("users");

    const user = await users.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const updatedUser = await users.findOneAndUpdate(
      { username },
      {
        $push: {
          'favorites.productIds': productId
        }
      },
      { returnOriginal: false }
    );
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Failed to add product to cart.' });
  }
});

app.post('/removeFromFavorites', async (req, res) => {
  try {
    const { username, productId } = req.body;

    if (!username || !productId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const users = db.collection("users");

    const user = await users.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const updatedUser = await users.findOneAndUpdate(
      { username },
      {
        $pull: {
          'favorites.productIds': productId
        }
      },
      { returnOriginal: false }
    );
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Failed to add product to cart.' });
  }
});

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
