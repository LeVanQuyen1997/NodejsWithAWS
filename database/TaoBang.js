var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
AWS.config.accessKeyId = "aaaa";
AWS.config.secretAccessKey = "uuuu";

var dynamodb = new AWS.DynamoDB();

var User=require("./taoBang/User");
var Product=require("./taoBang/Product");
var ProductCategory=require("./taoBang/ProductCategory");
var Billinfo=require("./taoBang/Billinfo");
var Bill=require("./taoBang/Bill");

User.User(dynamodb);
Product.Product(dynamodb);
ProductCategory.ProductCategory(dynamodb);
Billinfo.Billinfo(dynamodb);
Bill.Bill(dynamodb);