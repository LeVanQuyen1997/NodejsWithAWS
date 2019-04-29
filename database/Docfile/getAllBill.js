var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});
AWS.config.accessKeyId = "aaaa";
AWS.config.secretAccessKey = "uuuu";
var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for Bill");

var params = {
    TableName: "Bill",
    ProjectionExpression: "#yr,IdBill,address,phoneNumber,dateBuy",
    FilterExpression: "#yr between :start_yr and :end_yr",
    ExpressionAttributeNames: {
        "#yr": "IdUser",
    },
    ExpressionAttributeValues: {
        ":start_yr": "A",
        ":end_yr":"Z"
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