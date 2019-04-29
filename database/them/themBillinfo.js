var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
AWS.config.accessKeyId = "aaaa";
AWS.config.secretAccessKey = "uuuu";

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Billinfo";

var idBillinfo = "BI2";
var idBill = "B1";
var idprod = "P2";
var quantity = "1";
var tongtien = "10000";

var params = {
    TableName: table,
    Item: {
        "IdBillinfo": idBillinfo,
        "IdBill": idBill,
        "Idprod": idprod,
        "quantity": quantity,
        "tongtien": tongtien
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