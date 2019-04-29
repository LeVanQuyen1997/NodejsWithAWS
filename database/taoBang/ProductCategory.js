

exports.ProductCategory=(dynamodb)=>{
    var params = {
        TableName : "ProductCategory",
        KeySchema: [
            { AttributeName: "IdprodC", KeyType: "HASH"},  //Partition key
            { AttributeName: "ten", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [
            { AttributeName: "IdprodC", AttributeType: "S" },
            { AttributeName: "ten", AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    };
    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.log("khong");
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}