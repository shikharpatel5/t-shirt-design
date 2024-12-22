const express = require('express');
const app = express ();
app.use(express.json());
const cors = require('cors');
let ordersHistory = [];

const PORT =  3001;
app.use(cors());

app.get("/", (request, response) => {
    response.send("node express backend is running");
 });

 app.get("/get-orders", (request, response) => {
    response.status(200).json(ordersHistory);
 });

app.post("/add-order", (request,response) => {
    let order = request.body;
    ordersHistory.push(order);
    console.log(ordersHistory);
    response.status(200).json("order added in backend");
}); 

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });