var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
});

AWS.config.accessKeyId = "aaaa";
AWS.config.secretAccessKey = "uuuu";

var docClient = new AWS.DynamoDB.DocumentClient();

//Xử lý phần Bill của khách hàng

//Lấy tất cả các Bill của Khách hàng
exports.getAllBill = (callback) => {
    var params = {
        TableName: "Bill",
        ProjectionExpression: "#yr,IdBill,address,phoneNumber,dateBuy",
        FilterExpression: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "IdUser",
        },
        ExpressionAttributeValues: {
            ":start_yr": "A",
            ":end_yr": "Z"
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
//Láy Bill theo id
exports.getBillByid = (id, callback) => {
    var params = {
        TableName: "Bill",
        ProjectionExpression: "#yr,IdUser,address,phoneNumber,dateBuy",
        FilterExpression: "#yr =:yyyy ",
        ExpressionAttributeNames: {
            "#yr": "IdBill",
        },
        ExpressionAttributeValues: {
            ":yyyy": id
        }
    };
    docClient.scan(params, onScan);
    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Tim thanh cong : so luong :", data.Items.length);
            callback(data);
        }
    }
}
//Thêm Bill cho khách hàng
exports.ThemBill = (IdBill, IdUser, address, phoneNumber, dateBuy) => {
    var params = {
        TableName: "Bill",
        Item: {
            "IdBill": IdBill,
            "IdUser": IdUser,
            "address": address,
            "phoneNumber": phoneNumber,
            "dateBuy": dateBuy
        }
    };

    console.log("Adding a new item...");
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Them Bill Thanh Cong:", JSON.stringify(data, null, 2));
        }
    });
}
//Update Bill cho khach hang
exports.UpdateBill = (key1,key2,address,phoneNumber,dateBuy,callback) => {
    var params = {
        TableName: "Bill",
        Key: {
            "IdBill": key1,
            "IdUser": key2
        },
        UpdateExpression: "set address = :a,phoneNumber = :b,dateBuy = :c",
        ExpressionAttributeValues: {
            ":a": address,
            ":b":phoneNumber,
            ":c":dateBuy

        },
        ReturnValues: "UPDATED_NEW"
    };
    console.log("Updating the item...");

    docClient.update(params, function (err, data) {
        console.log("bat dau update");
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Updata Thanh Cong :", JSON.stringify(data, null, 2));
            callback(data);
        }
    });
}
// DeleteBill cua khach hang
exports.DeleteBill=(key1,key2)=>{
    var params = {
        TableName:"Bill",
        Key:{
            "IdBill": key1,
            "IdUser": key2
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
//Lấy tất cả các bill info
exports.getAllBillinfo = (callback) => {
    var params = {
        TableName: "Billinfo",
        ProjectionExpression: "#yr,IdBill,Idprod,tongtien,quantity",
        FilterExpression: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "IdBillinfo",
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
//Lay BillInfo bang id
exports.getBillinfoByid = (id, callback) => {
    var params = {
        TableName: "Billinfo",
        ProjectionExpression: "#yr,IdBill,Idprod,quantity,tongtien",
        FilterExpression: "#yr =:yyyy ",
        ExpressionAttributeNames: {
            "#yr": "IdBillinfo",
        },
        ExpressionAttributeValues: {
            ":yyyy": id
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
//Lay Billinfo By idprod
exports.getBillinfoByidprod = (id, callback) => {
    var params = {
        TableName: "Billinfo",
        ProjectionExpression: "#yr,IdBill,IdBillinfo,quantity,tongtien",
        FilterExpression: "#yr =:yyyy ",
        ExpressionAttributeNames: {
            "#yr": "Idprod",
        },
        ExpressionAttributeValues: {
            ":yyyy": id
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
//Them Billinfo
exports.ThemBillInfo = (idBillinfo, idBill, idprod, quantity, tongtien,callback) => {
    var params = {
        TableName: "Billinfo",
        Item: {
            "IdBillinfo": idBillinfo,
            "IdBill": idBill,
            "Idprod": idprod,
            "quantity": quantity,
            "tongtien": tongtien
        }
    };

    console.log("Adding a new item...");
    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            console.log("Them Billinfo Thanh Cong");
            var params = {
                TableName: "Billinfo",
                ProjectionExpression: "#yr,IdBill,Idprod,tongtien,quantity",
                FilterExpression: "#yr between :start_yr and :end_yr",
                ExpressionAttributeNames: {
                    "#yr": "IdBillinfo",
                },
                ExpressionAttributeValues: {
                    ":start_yr": "A",
                    ":end_yr": "Z"
                }
            };
            docClient.scan(params, onScan);
            function onScan(err, data1) {
                if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    
                    console.log("Them Thanh Cong :",data1.Items.length);
                }
            }
           
        }
    });
}
// Update so luong
exports.UpdateQuantity = (key1, key2, soluong, callback) => {
    var params = {
        TableName: "Billinfo",
        Key: {
            "IdBillinfo": key1,
            "IdBill": key2
        },
        UpdateExpression: "set quantity = :n ",
        ExpressionAttributeValues: {
            ":n": soluong

        },
        ReturnValues: "UPDATED_NEW"
    };
    console.log("Updating the item...");

    docClient.update(params, function (err, data) {
        console.log("bat dau update");
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Updata Thanh Cong :", JSON.stringify(data, null, 2));
            callback(data);
        }
    });
}
// DeleteBillinfo
exports.DeleteBillinfo=(key1,key2)=>{
    var params = {
        TableName:"Billinfo",
        Key:{
            "IdBillinfo": key1,
            "IdBill": key2
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