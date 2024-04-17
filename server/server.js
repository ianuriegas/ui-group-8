const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
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
<<<<<<< HEAD
    await client.connect();
    const database = client.db("group_8_db");
    const products = database.collection("users");
    const productsList = await products.find({}).toArray();
    
    res.json(productsList);
=======
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
>>>>>>> 20e33c4d (User sync on Profile Page)
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




app.post('/addToCart', async (req, res) => {
  try {
    const { username, productId, quantity } = req.body;

    if (!username || !productId || !quantity) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    await client.connect();
    const database = client.db("group_8_db");
    const users = database.collection("users");

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
  } finally {
    await client.close();
  }
});

app.post('/addToSubscription', async (req, res) => {
  try {
    const { username, productId } = req.body;

    if (!username || !productId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    await client.connect();
    const database = client.db("group_8_db");
    const users = database.collection("users");

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
  } finally {
    await client.close();
  }
});

app.post('/addToWishlist', async (req, res) => {
  try {
    const { username, productId } = req.body;

    if (!username || !productId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    await client.connect();
    const database = client.db("group_8_db");
    const users = database.collection("users");

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
  } finally {
    await client.close();
  }
});

app.post('/addToFavorites', async (req, res) => {
  try {
    const { username, productId } = req.body;

    if (!username || !productId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    await client.connect();
    const database = client.db("group_8_db");
    const users = database.collection("users");

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
  } finally {
    await client.close();
  }
});

app.post('/removeFromFavorites', async (req, res) => {
  try {
    const { username, productId } = req.body;

    if (!username || !productId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    await client.connect();
    const database = client.db("group_8_db");
    const users = database.collection("users");

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
  } finally {
    await client.close();
  }
});


app.listen(5001, () => {
  console.log("Server started on port 5001");
});
