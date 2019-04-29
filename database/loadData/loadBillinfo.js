

console.log("Importing Billinfo into DynamoDB. Please wait.");

var allBill = JSON.parse(fs.readFileSync('./../data/billinfo.json', 'utf8'));
allBill.forEach(function (bill) {
    var params = {
        TableName: "Billinfo",
        Item: {
            "IdBillinfo": bill.idBillinfo,
            "IdBill":bill.idBill,
            "Idprod": bill.idprod,
            "quantity":bill.quantity,
            "tongtien": bill.tongtien
            
        }
    };

    docClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add movie", bill.idBillinfo, ". Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PutItem succeeded:", bill.idBillinfo);
        }

    });
});
