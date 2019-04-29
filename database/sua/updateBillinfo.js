var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
AWS.config.accessKeyId = "aaaa";
AWS.config.secretAccessKey = "uuuu";

var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName:"Billinfo",
    Key:{
        "IdBillinfo":"BI1",
        "IdBill":"B1"
    },
    UpdateExpression: "set quantity = :n ",
    ExpressionAttributeValues:{
        ":n":"101"
        
    },
    ReturnValues:"UPDATED_NEW"
};
console.log("Updating the item...");
docClient.update(params, function(err, data) {
    if(err){
        console.error("Loi",JSON.stringify(err,null,2));
    }
    else{
        console.log("Sua thanh cong",JSON.stringify(data,null,2));
    }
})