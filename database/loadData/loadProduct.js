

console.log("Importing Product into DynamoDB. Please wait.");
exports.LoadProduct = (docClient,fs) => {

    var allProd = JSON.parse(fs.readFileSync('./data/product.json', 'utf8'));
    allProd.forEach(function (Prod) {
        var params = {
            TableName: "Product",
            Item: {
                "Idprod": Prod.Idprod,
                "IdprodC": Prod.IdprodC,
                "ten": Prod.ten,
                "price1": Prod.price1,
                "price": Prod.price,
                "img": Prod.img,
                "mieuta": Prod.mieuta
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add movie", Prod.ten, ". Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("PutItem succeeded:", Prod.ten);
            }

        });
    });
}
