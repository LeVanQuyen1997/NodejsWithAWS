var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
AWS.config.accessKeyId="aaaa";
AWS.config.secretAccessKey="uuuu";

var dynamodb = new AWS.DynamoDB();

exports.User=(dynamodb)=>{
    var params = {
        TableName : "User",
        KeySchema: [
            { AttributeName: "ten", KeyType: "HASH"},  //Partition key
            { AttributeName: "pass", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [
            { AttributeName: "ten", AttributeType: "S" },
            { AttributeName: "pass", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    };
    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}