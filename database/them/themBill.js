var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
AWS.config.accessKeyId = "aaaa";
AWS.config.secretAccessKey = "uuuu";

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Bill";

var IdBill = "P5";
var IdUser = "PC1";
var address = "Com Chien Trung";
var phoneNumber= "20000";
var dateBuy = "10000";

var params = {
    TableName: table,
    Item: {
        "IdBill": IdBill,
        "IdUser": IdUser,
        "address": address,
        "phoneNumber": phoneNumber,
        "dateBuy": dateBuy
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