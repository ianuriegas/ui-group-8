const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

app.use(express.json());

const uri = "mongodb+srv://temp:temp1234@ui-group-8.migbrji.mongodb.net/";
const client = new MongoClient(uri);

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
    await client.connect();
    const database = client.db("group_8_db");
    const products = database.collection("products");
    
    const productsList = await products.find({}).toArray();
    res.json(productsList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
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
    await client.connect();
    const database = client.db("group_8_db");
    const products = database.collection("discounts");
    const productsList = await products.find({}).toArray();
    res.json(productsList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("group_8_db");
    const products = database.collection("users");
    const productsList = await products.find({}).toArray();
    res.json(productsList);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
});

app.post("/createUser", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("group_8_db");
    const users = database.collection("users");

    // Insert the new user data from request body
    const result = await users.insertOne(req.body);
    res.status(201).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
});

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
