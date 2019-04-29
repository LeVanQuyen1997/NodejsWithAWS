

exports.Product=(dynamodb)=>{
    var params = {
        TableName : "Product",
        KeySchema: [
            { AttributeName: "Idprod", KeyType: "HASH"},  //Partition key
            { AttributeName: "IdprodC", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [
            { AttributeName: "Idprod", AttributeType: "S" },
          
            { AttributeName: "IdprodC", AttributeType: "S" }
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