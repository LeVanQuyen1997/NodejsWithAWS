
exports.Billinfo=(dynamodb)=>{
    var params = {
        TableName : "Billinfo",
        KeySchema: [
            { AttributeName: "IdBillinfo", KeyType: "HASH"},  //Partition key
            { AttributeName: "IdBill", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [
            { AttributeName: "IdBillinfo", AttributeType: "S" },
            { AttributeName: "IdBill", AttributeType: "S" }
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