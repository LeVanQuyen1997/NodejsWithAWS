var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

AWS.config.accessKeyId = "aaaa";
AWS.config.secretAccessKey = "uuuu";

var docClient = new AWS.DynamoDB.DocumentClient();
exports.login = function (user, pass, callback) {
    var params = {
        TableName: "User",
        ProjectionExpression: "#yr, pass,lv",
        KeyConditionExpression: "#yr = :yyyy and pass = :tttt",
        ExpressionAttributeNames: {
            "#yr": "ten",
        },
        ExpressionAttributeValues: {
            ":yyyy": user,
            ":tttt": pass
        }
    };
    docClient.query(params, function (err, data) {
        if (err) {
            console.log("khong tim thay du lieu", JSON.stringify(err, null, 2));
        } else {
            callback(data);
        }
    });

}
exports.getAllUser = (callback) => {
    var params = {
        TableName: "User",
        ProjectionExpression: "#user,pass,email,lv",
        FilterExpression: "#user between :start_user and :end_user",
        ExpressionAttributeNames: {
            "#user": "ten",
        },
        ExpressionAttributeValues: {
            ":start_user": "A",
            ":end_user": "Z"
        }
    };
    docClient.scan(params, onScan);
    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            callback(data);
        }
    }
}
exports.getAllUserByLevel1=(callback)=>{
    var params = {
        TableName: "User",
        ProjectionExpression: "#yr,ten,email,pass",
        FilterExpression: "#yr = :yyyy",
        ExpressionAttributeNames: {
            "#yr": "level",
        },
        ExpressionAttributeValues: {
            ":yyyy":"1"
        }
    };
    docClient.scan(params, onScan);
    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            callback(data);
        }
    }
}
exports.getAllUserByLevel2=(callback)=>{
    var params = {
        TableName: "User",
        ProjectionExpression: "#yr,ten,email,pass",
        FilterExpression: "#yr = :yyyy",
        ExpressionAttributeNames: {
            "#yr": "level",
        },
        ExpressionAttributeValues: {
            ":yyyy":"2"
        }
    };
    docClient.scan(params, onScan);
    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            callback(data);
        }
    }
}
exports.signinUser = (user, pass, email, add, callback) => {
    var params = {
        TableName: "User",
        Item: {
            "ten": user,
            "pass": pass,
            "email": email,
            "address": add
        }
    };
    console.log("Adding a new item...");
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            callback(data1);
        }
    });
}