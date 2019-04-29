

console.log("Importing Users into DynamoDB. Please wait.");
exports.LoadUser = (docClient,fs) => {
    var allUsers = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'));
    allUsers.forEach(function (user) {
        var params = {
            TableName: "User",
            Item: {
                "ten": user.ten,
                "lv":user.level,
                "pass": user.pass,
                "email": user.email
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add movie", user.ten, ". Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Danh Sach User", user.ten);
            }
        });
    });
}
