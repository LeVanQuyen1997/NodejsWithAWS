var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});
AWS.config.accessKeyId="aaaa";
AWS.config.secretAccessKey="uuuu";

var dynamodb = new AWS.DynamoDB();

var DeleteUser=require("./deleteTable/deleteTable");

DeleteUser.DeleteTable("User");
DeleteUser.DeleteTable("Admin");
DeleteUser.DeleteTable("Product");
DeleteUser.DeleteTable("ProductCategory");
DeleteUser.DeleteTable("Billinfo");
DeleteUser.DeleteTable("Bill");
