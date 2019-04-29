

console.log("Importing ProductCategoty into DynamoDB. Please wait.");
exports.LoadProductCategory = (docClient,fs) => {

    var allProdC = JSON.parse(fs.readFileSync('./data/productCategory.json', 'utf8'));
    allProdC.forEach(function (ProdC) {
        var params = {
            TableName: "ProductCategory",
            Item: {
                "IdprodC": ProdC.IdprodC,
                "ten": ProdC.ten,
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add movie", ProdC.ten, ". Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("PutItem succeeded:", ProdC.ten);
            }

        });
    });
}
