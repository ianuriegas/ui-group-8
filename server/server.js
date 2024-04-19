const express = require("express");
const { MongoClient } = require("mongodb");

var ObjectId = require('mongodb').ObjectId; 
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

app.post("/meow", async (req, res) => {
  try {
      const result = await db.collection("users").updateMany(
          {
              "paymentInfo.cardType": "",
              "paymentInfo.cardNumber": "",
              "paymentInfo.expireDate": "",
              "paymentInfo.cvv": ""
          },
          {
              $set: {
                  "paymentInfo": []
              }
          }
      );
      res.status(200).json({
          message: "Update successful",
          modifiedCount: result.modifiedCount
      });
  } catch (error) {
      res.status(500).json({
          message: "An error occurred",
          error: error.message
      });
  }
});


app.get("/getProducts/:id", async (req, res) => {
  try {
    
    const products = db.collection("products");
    var o_id = new ObjectId(req.params.id);
    
    const productsList = await products.findOne({"_id":o_id});
    
    //const item = productsList.find({"_id":o_id }).
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

app.get("/getSubscriptions/:username", async (req, res) => {
  try {
    
    const users = db.collection("users");
    userName = req.params.username
    
    
    const usersList = await users.findOne({ "username": userName });
   
    
    res.json(usersList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.get("/getFavorites/:username", async (req, res) => {
  try {
    
    const users = db.collection("users");
    userName = req.params.username
    
    
    const usersList = await users.findOne({ "username": userName });
    
    res.json(usersList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
app.get("/getWishlist/:username", async (req, res) => {
  try {
    
    const users = db.collection("users");
    userName = req.params.username
    
    
    const usersList = await users.findOne({ "username": userName });
    console.log(usersList.wishlist)
   
    
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
      console.log(cart)
      if (!username || !cart || !Array.isArray(cart.items)) {
          return res.status(400).json({ error: 'Missing required fields or invalid cart format.' });
      }

      const users = db.collection("users");

      const user = await users.findOne({ username });
      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }
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

app.patch('/addAddress', async (req, res) => {
  try {
      const { username, newAddress } = req.body;
      if (!username || !newAddress) {
          return res.status(400).json({ error: 'Missing required fields.' });
      }

      if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.postalCode || !newAddress.country) {
          return res.status(400).json({ error: 'Incomplete address information.' });
      }

      const users = db.collection("users");

      const result = await users.updateOne(
          { username },
          { $push: { addresses: newAddress } }
      );

      if (result.modifiedCount === 0) {
          return res.status(404).json({ error: 'User not found or no changes made.' });
      }

      res.json({ message: 'Address added successfully.' });
  } catch (error) {
      console.error('Error adding address:', error);
      res.status(500).json({ error: 'Failed to add address.' });
  }
});

app.put('/replaceAddress', async (req, res) => {
  try {
      const { username, addresses } = req.body;

      if (!username || !addresses) {
          return res.status(400).json({ error: 'Missing required fields.' });
      }

      if (!Array.isArray(addresses)) {
          return res.status(400).json({ error: 'Invalid address format.' });
      }

      const users = db.collection("users");

      const result = await users.updateOne(
          { username },
          { $set: { addresses } }
      );

      if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'User not found.' });
      } else if (result.modifiedCount === 0) {
          return res.status(200).json({ message: 'Addresses are already up-to-date.' });
      }

      res.json({ message: 'Addresses replaced successfully.' });
  } catch (error) {
      console.error('Error replacing addresses:', error);
      res.status(500).json({ error: 'Failed to replace addresses.' });
  }
});

app.patch('/addPaymentMethod', async (req, res) => {
  try {
      const { username, newPaymentMethod } = req.body;

      if (!username || !newPaymentMethod) {
          return res.status(400).json({ error: 'Missing required fields.' });
      }

      if (!newPaymentMethod.cardType || !newPaymentMethod.cardNumber || !newPaymentMethod.expireDate || !newPaymentMethod.cvv) {
          return res.status(400).json({ error: 'Incomplete payment method information.' });
      }

      const users = db.collection("users");

      const result = await users.updateOne(
          { username },
          { $push: { 'paymentInfo': newPaymentMethod } }
      );

      if (result.modifiedCount === 0) {
          return res.status(404).json({ error: 'User not found or no changes made.' });
      }

      res.json({ message: 'Payment method added successfully.' });
  } catch (error) {
      console.error('Error adding payment method:', error);
      res.status(500).json({ error: 'Failed to add payment method.' });
  }
});

app.put('/replacePaymentInfo', async (req, res) => {
  try {
      const { username, paymentInfo } = req.body;

      if (!username || !paymentInfo) {
          return res.status(400).json({ error: 'Missing required fields.' });
      }

      if (!Array.isArray(paymentInfo)) {
          return res.status(400).json({ error: 'Invalid payment info format.' });
      }

      const users = db.collection("users");

      const result = await users.updateOne(
          { username },
          { $set: { 'paymentInfo': paymentInfo } }
      );

      if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'User not found.' });
      } else if (result.modifiedCount === 0) {
          return res.status(200).json({ message: 'Payment info is already up-to-date.' });
      }

      res.json({ message: 'Payment info replaced successfully.' });
  } catch (error) {
      console.error('Error replacing payment info:', error);
      res.status(500).json({ error: 'Failed to replace payment info.' });
  }
});

// New endpoint to get a user's wishlist
app.get("/wishlist/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const users = db.collection("users");
    const user = await users.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const wishlist = user.wishlist || { productIds: [] }; // Handle cases where wishlist is empty

    res.json(wishlist);
  } catch (e) {
    res.status(500).json({ error: e.message });

  }
});

app.get("/imgSearch", async (req, res) => {
  const { itemName } = req.query;
  if (!itemName) {
    return res.status(400).json({ message: 'Item name is required' });
  }

  const apiKey = '8Jy7i43LXWJdnUW2pOqdrVFrhEqYquyu3h7B1ZxzwBZZDrMjkiatJMgN';
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(itemName)}&orientation=square`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey
      }
    });

    if (response.ok) {
      const data = await response.json();

      if (data.photos && data.photos.length > 0) {
        res.json({ imageUrl: data.photos[0].src.original });
      } else {
        res.status(404).json({ message: 'No images found' });
      }
    } else {
      const errorData = await response.json();
      res.status(response.status).json({ message: errorData.error || 'Error fetching image' });
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(5001, () => {
  console.log("Server started on port 5001");
});

