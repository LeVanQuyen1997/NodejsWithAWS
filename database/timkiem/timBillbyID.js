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
    TableName: "Bill",
    ProjectionExpression: "#yr,IdUser,address,phoneNumber,dateBuy",
    FilterExpression: "#yr =:yyyy ",
    ExpressionAttributeNames: {
        "#yr": "IdBill",
    },
    ExpressionAttributeValues: {
        ":yyyy":"B1"
    }
};
docClient.scan(params, onScan);
function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Tim thanh cong : so luong :",data.Items.length);
        console.log(data);
    }
}