var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

AWS.config.accessKeyId = "aaaa";
AWS.config.secretAccessKey = "uuuu";

var docClient = new AWS.DynamoDB.DocumentClient();
exports.getAllProduct=(callback)=>{
    var params = {
        TableName: "Product",
        ProjectionExpression: "#yr,IdprodC,ten,price1,price,mieuta,img",
        FilterExpression: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "Idprod",
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
            callback(data);
        }
    }
}
exports.getAllProductCategory=(callback)=>{
    var params = {
        TableName: "ProductCategory",
        ProjectionExpression: "#yr,IdprodC",
        FilterExpression: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "ten",
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
            callback(data);
        }
    }
}
exports.getAllProductCategoryByid=(id,callback)=>{
    var params = {
        TableName: "Product",
        ProjectionExpression: "#yr,ten,Idprod,price1,price,img,mieuta",
        FilterExpression: "#yr =:yyyy ",
        ExpressionAttributeNames: {
            "#yr": "IdprodC",
        },
        ExpressionAttributeValues: {
            ":yyyy":id
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
exports.getAllProductByid=(id,callback)=>{
    var params = {
        TableName: "Product",
        ProjectionExpression: "#yr,ten,IdprodC,price1,price,img,mieuta",
        FilterExpression: "#yr =:yyyy ",
        ExpressionAttributeNames: {
            "#yr": "Idprod",
        },
        ExpressionAttributeValues: {
            ":yyyy":id
        }
    };
    docClient.scan(params, onScan);
    function onScan(err, data) {
        if (err) {
            console.error("loi khong tim thay", JSON.stringify(err, null, 2));
        } else {
            callback(data);
        }
    }
}
//them san pham

exports.themsanpham=(Idprod,IdprodC,ten,price,img,mota)=>{
   
    var params = {
        TableName: "Product",
        Item: {
            "Idprod": Idprod,
            "IdprodC": IdprodC,
            "ten": ten,
            "price1": "30000",
            "price": price,
            "img":img,
            "mieuta":mota
        }
    };
    
    console.log("Adding a new item...");
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            console.log("them thanh cong");
        }
    });
}
exports.xoasanpham=(Idprod,IdprodC)=>{
    var params = {
        TableName:"Product",
        Key:{
            "Idprod": Idprod,
            "IdprodC": IdprodC
        }
    };
    
    console.log("Attempting a conditional delete...");
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }
    });
}
exports.suasanpham=(Idprod,IdprodC,callback)=>{
    var params = {
        TableName: "Product",
        Key:{
            "Idprod": Idprod,
            "IdprodC": IdprodC
        }
    };
    
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            callback(data);
        }
    });
}
// sua san pham thanh cong
exports.suasanphamComplete=(ma,loai,ten,price,callback)=>{
    var params = {
        TableName:"Product",
        Key:{
            "Idprod": ma.trim(),
            "IdprodC": loai.trim()
        },
        UpdateExpression: "set ten = :n, price=:p",
        ExpressionAttributeValues:{
            ":n":ten,
            ":p":price,
        },
        ReturnValues:"UPDATED_NEW"
    };
    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            console.log("sua thanh cong");
            var params = {
                TableName: "Product",
                ProjectionExpression: "#yr,IdprodC,ten,price1,price",
                FilterExpression: "#yr between :start_yr and :end_yr",
                ExpressionAttributeNames: {
                    "#yr": "Idprod",
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
                    callback(data);
                }
            }

            
        }
    });
}