
exports.Bill=(dynamodb)=>{
    var params = {
        TableName : "Bill",
        KeySchema: [
            { AttributeName: "IdBill", KeyType: "HASH"},  //Partition key
            { AttributeName: "IdUser", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [
            { AttributeName: "IdBill", AttributeType: "S" },
            { AttributeName: "IdUser", AttributeType: "S" }
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