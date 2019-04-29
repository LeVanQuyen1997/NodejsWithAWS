var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});
AWS.config.accessKeyId = "aaaa";
AWS.config.secretAccessKey = "uuuu";
var docClient = new AWS.DynamoDB.DocumentClient();

var table = "User";

var user = "Huong12";
var pass = "Huong123";
var email="huong@gmail.com";
var add="Duc Minh";
var params = {
    TableName:table,
    Item:{
        "user": user,
        "pass": pass,
        "email": email,
        "address": add
        }
    
}

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("them thanh cong",data)
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});