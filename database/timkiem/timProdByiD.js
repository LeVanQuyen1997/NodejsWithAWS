var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
AWS.config.accessKeyId = "aaaa";
AWS.config.secretAccessKey = "uuuu";
var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for ProductCategory");

var params = {
    TableName: "Product",
    ProjectionExpression: "#yr,ten,Idprod,price1,price,img,mieuta",
    FilterExpression: "#yr =:yyyy ",
    ExpressionAttributeNames: {
        "#yr": "IdprodC",
    },
    ExpressionAttributeValues: {
        ":yyyy":"PC2"
    }
};
docClient.scan(params, onScan);
function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log(data.Items.length);
        console.log(data);
    }
}