var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

AWS.config.accessKeyId = "aaaa";
AWS.config.secretAccessKey = "uuuu";
var docClient = new AWS.DynamoDB.DocumentClient();
var User=require("./loadData/loadUser");
var Product=require("./loadData/loadProduct");
var ProductCategory=require("./loadData/loadProdCategory");
// var Billinfo=require("./loadData/loadBillinfo");
// var Bill=require("./loadData/loadBill");
// load Dữ liệu
User.LoadUser(docClient ,fs);
Product.LoadProduct(docClient,fs );
ProductCategory.LoadProductCategory(docClient,fs );