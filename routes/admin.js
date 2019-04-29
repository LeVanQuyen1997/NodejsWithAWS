var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var AWS = require("aws-sdk");

var productDao = require('../models/ProductDao');
var userDao=require('../models/userDao');
var billDao = require('../models/BillDao');
var app = express();
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
AWS.config.update({
    region: "us-west-2",
    endpoint: "http://s3-us-west-2.amazonaws.com"
});
AWS.config.accessKeyId = "AKIAID7V3NGIR6Z7A6FQ";
AWS.config.secretAccessKey = "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";
var s3 = new AWS.S3({ params: { Bucket: 'vanquyen' } });
var sess;


//View Trang Admin
exports.TrangAdmin=(req,res)=>{
    sess=req.session
    if(sess.level=="2"){
        productDao.getAllProduct(data => {
            res.render('Admin/index', {
                admin:sess.user,
                data: data,
                ma: "",
                ten: "",
                price: "",
                loai: "",
                mota: "",
                img: ""
    
            });
        });
    }else{
        res.redirect('/');
    }
}
//View User in Trang Admin
exports.Users=(req,res)=>{
    sess=req.session
    if(sess.level=="2"){
        userDao.getAllUser(data => {
            res.render('Admin/user', {
                admin:sess.user,
                data: data,
                ma: "",
                ten: "",
                price: "",
                loai: "",
                mota: "",
                img: ""
    
            });
            
        });
    }else{
        res.redirect('/');
    }
}
//View Bill in Trang Admin
exports.Bill=(req,res)=>{
    sess=req.session
    if(sess.level=="2"){
        billDao.getAllBill(bill=>{
            billDao.getAllBillinfo(billinfo=>{
                res.end(JSON.stringify(billinfo));
                res.render('Admin/bill', {
                    data:billinfo,
                    ma: "",
                    ten: "",
                    price: "",
                    loai: "",
                    mota: "",
                    img: ""
        
                });
            });
        })
    }else{
        res.redirect('/');
    }
}
exports.Them=(req,res)=>{
    productDao.getAllProduct(data1 => {
        res.render('Admin/index', {
            data: data1,
            ma: "1",
            ten: "",
            price: "",
            loai: "",
            mota: "",
            img: ""
        })
    });
}
exports.themsanpham = (req, res) => {
    var Idprod = req.body.ma;
    var IdprodC = req.body.loai;
    var ten = req.body.ten;
    var price = req.body.gia;
    var mota = req.body.mota;
    var file = req.files.upload;
    var name = file.name;
    var data = file.data;
    var type = file.mimetype;
    var uploadpath = './uploads/' + name;
    var urlne = "https://s3-us-west-2.amazonaws.com/vanquyen/";
    file.mv(uploadpath, err => {
        if (err) {
            console.log("loi roi");
        }
        else {
            let uploadFile = {
                Key: name,
                Body: data,
                ContentType: req.files.upload.mimetype,
                ACL: 'public-read'
            }
            s3.putObject(uploadFile, function (err, data) {
                if (err) {
                    console.log('Error uploading data: ', data);
                }
                else {
                    console.log('succesfully uploaded the image!');
                }
            });
            // var img=urlne+name;
            var urlParams = { Bucket: 'vanquyen', Key: name };
            s3.getSignedUrl('getObject', urlParams, function (err, url) {
                console.log('the url of the image is', url);
                var url1 = urlne + name;
                productDao.getAllProductByid(Idprod,dataprod=>{
                    if(dataprod.Count==0){
                        productDao.themsanpham(Idprod, IdprodC, ten, price, url1, mota);
                            productDao.getAllProduct(data1 => {
                                res.render('Admin/index', {
                                    data: data1,
                                    ma: "",
                                    ten: "",
                                    price: "",
                                    loai: "",
                                    mota: "",
                                    img: ""
                                })
                            });
                    }else{
                        sess=req.session;
                        res.end(`<script>alert("ahihi..Trung Ma San Pham");window.location.href = '/admin';</script>`);
                    }
                   
                    
                });
               
            });

        }
    });

}
exports.xoasanpham = (req, res) => {
    var id = req.params.id;
    var id1 = req.params.id1;
    productDao.xoasanpham(id, id1);
    productDao.getAllProduct(data => {
        res.render('Admin/index', {
            data: data,
            ma: "",
            ten: "",
            price: "",
            loai: "",
            mota: "",
            img: ""
        })
    });
}
exports.dispalyproFix = (req, res) => {
    var id = req.params.id;
    var id1 = req.params.id1;
    productDao.suasanpham(id, id1, data1 => {

        var img = data1.Item.img + "";
        var hinh = img.substring(44, 57);
        productDao.getAllProduct(data => {
            res.render('Admin/index', {
                data: data,
                ma: data1.Item.Idprod,
                ten: data1.Item.ten,
                price: data1.Item.price,
                loai: data1.Item.IdprodC,
                mota: data1.Item.mota,
                img: hinh
            })
        })
    })
}
//sua san pham
exports.suasanpham = (req, res) => {
    var Idprod = req.body.ma;
    var IdprodC = req.body.loai;
    var ten = req.body.ten;
    var price = req.body.gia;
    productDao.suasanphamComplete(Idprod, IdprodC, ten, price, data => {
        res.render('Admin/product', {
            data: data,
            ma: "",
            ten: "",
            price: "",
            loai: ""
        })
    });
}
exports.huybo = (req, res) => {

    productDao.getAllProduct(data => {
        res.render('Admin/index', {
            data: data,
            ma: "",
            ten: "",
            price: "",
            loai: "",
            img:"",
            mota:""
        })
    })
}
//Tìm Sản Phẩm
exports.TimSanPham = (req, res) => {
    var key = req.body.key;
    productDao.getAllProduct(data => {
        var data2 = [];
        data2.Items = data.Items.filter(item => {
            return item.ten.toLowerCase().indexOf(key) !== -1;
        });
        res.render('Admin/index', {
            data: data2,
            ma: "",
            ten: "",
            price: "",
            loai: "",
            img:"",
            mota:""
        })
    });


}
//Tim San Pham Index
exports.TimSPindex = (req, res) => {
    var key = req.body.key;
    productDao.getAllProductCategory(data3 => {
        productDao.getAllProduct(data => {
            var data2 = [];
            data2.Items = data.Items.filter(item => {
                return item.ten.toLowerCase().indexOf(key) !== -1;
            });
            var user = "";
            res.render('Homepage/index', {
                data1: data2,
                username: user,
                soluong: false,
                data: data3
            })
        });
    });
}
//Xep A->Z
exports.xepAZ = (req, res) => {
    productDao.getAllProduct(data => {
        var data2 = [];
        data2.Items = data.Items.sort((a, b) => {
            if (a.ten > b.ten) return 1;
            else if (a.ten < b.ten) return -1;
            else return 0;
        });
        res.render('Admin/index', {
            data: data2,
            ma: "",
            ten: "",
            price: "",
            loai: "",
            img:"",
            mota:""
        })

    });
}
//Xep Z->A
exports.xepZA = (req, res) => {
    productDao.getAllProduct(data => {
        var data2 = [];
        data2.Items = data.Items.sort((a, b) => {
            if (a.ten > b.ten) return -1;
            else if (a.ten < b.ten) return 1;
            else return 0;
        });
        res.render('Admin/index', {
            data: data2,
            ma: "",
            ten: "",
            price: "",
            loai: "",
            img:"",
            mota:""
        })
    })
}



