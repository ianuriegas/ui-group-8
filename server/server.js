const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const uri = "mongodb+srv://temp:temp1234@ui-group-8.migbrji.mongodb.net/";

const client = new MongoClient(uri);

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

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
