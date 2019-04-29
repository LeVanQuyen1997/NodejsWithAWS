var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
AWS.config.accessKeyId = "aaaa";
AWS.config.secretAccessKey = "uuuu";

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Product";

var Idprod = "P5";
var IdprodC = "PC1";
var ten = "Com Chien Trung";
var price1 = "20000";
var price = "10000";

var params = {
    TableName: table,
    Item: {
        "Idprod": Idprod,
        "IdprodC": IdprodC,
        "ten": ten,
        "price1": price1,
        "price": price
    }
};

console.log("Adding a new item...");
docClient.put(params, function (err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
});