var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var url=require('url');
var app = express();

app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var userDao = require('../models/userDao');
var billDao = require('../models/BillDao');
var productDao = require('../models/ProductDao');
var sess;
var giohang = new Array(GioHang);
giohang.pop();
var soluong = 0;
var tongtien = 0;
// Trang Chủ
exports.lol=(req,res)=>{
    res.end('lolollllllllllllldasda');
}
exports.viewHomePage = (req, res) => {
    productDao.getAllProductCategory(data => {
        productDao.getAllProduct(data1 => {
            sess = req.session;
            if(sess.level==2){
                req.session.destroy();
                res.redirect('/');

            }else{
                res.render("Homepage/index", {
                    username:sess.user,
                    soluong: soluong,
                    data: data,
                    data1: data1
                });
            }
        })

    });


}
// Tiến hành đăng nhập
exports.loginUser = (req, res) => {
    var user = req.body.username;
    var pass = req.body.password;
    userDao.login(user, pass, (data) => {
        if (data.Count == 0) {
            var message = "Password or Username incorect ! ";
            res.end(`<script>
                alert( '${message}');
                window.location.href = '/';
                </script>`);
        }
        else {
            data.Items.forEach(function (item) {
                if (item.lv=="2") {
                    sess = req.session;
                    sess.user = user;
                    sess.level = item.lv;
                    res.redirect('/admin');
                } else {
                    sess = req.session;
                    sess.user = user;
                    sess.pass = pass;
                    console.log("session", session);
                    productDao.getAllProductCategory(data => {
                        productDao.getAllProduct(data1 => {
                            return res.render('Homepage/index', {
                                username: user,
                                soluong: false,
                                data: data,
                                data1: data1

                            });
                        })

                    });

                }
            });

        }
    });
}
//Tiến Hành đăng kí
exports.SigninUser = (req, res) => {
    var user = req.body.username;
    var pass = req.body.password;
    var email = req.body.email;
    var add = req.body.address;
    userDao.signinUser(user, pass, email, add, (data) => {

        if (data == "undefined") {
            res.end(`<script>alert("ahihi..loi roi nha");window.location.href = '/';</script>`);
        } else {
            console.log("soluong", JSON.stringify(data));
            res.end(`<script>
                alert(  'Dang Ky Thanh Cong'+'Ten : ${user} ,'+
                        'Pass : ${pass} ,'+
                        'Email : ${email} ,'+
                        'Address : ${add} ');
                window.location.href = '/';
                </script>`);
        }
    });
}
//Thoát 
exports.Thoat = (req, res) => {
    giohang.splice(0, giohang.length);
    Soluong(giohang);
    req.session.destroy();
    productDao.getAllProductCategory(data => {
        productDao.getAllProduct(data1 => {
            var user = "";
            res.render("Homepage/index", {
                username: user,
                soluong: soluong,
                data: data,
                data1: data1
            });
        })

    });
}
// Lấy tất cả User
exports.getAllUser = (req, res) => {
    userDao.getAllUser(data => {
        res.render('Admin/index', {
            data: data
        })
    });
}
// Tìm Sản Phẩm 
exports.TimSanPham = (req, res) => {
    var key = req.body.key;
    console.log("keyword", key);
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
                soluong: soluong,
                data: data3
            })
        });
    });
}

// tìm sản phẩm theo category
exports.SanPham= (req, res) => {
    sess = req.session;
    var id = req.params.id;
    productDao.getAllProductCategory(data => {
        productDao.getAllProductCategoryByid(id, data1 => {
            res.render("Homepage/index", {
                username: sess.user,
                soluong: soluong,
                data: data,
                data1: data1,
            });

        })

    });
}

// Xem Gio Hàng
exports.ViewGioHang = (req, res) => {
    sess = req.session;
    TongTien(giohang);
    Soluong(giohang);
    productDao.getAllProductCategory(data=>{
        res.render('GioHang/index', {
            username: sess.user,
            giohang: giohang,
            soluong: soluong,
            tongtien: tongtien,
            data:data
        });
    })
}
//Thêm Sản Phẩm vào giỏ hàng
exports.AddCart = (req, res) => {
    sess = req.session;
    ThemSanPhamVaoGioHang(req, res);
    productDao.getAllProductCategory(data => {
        productDao.getAllProduct(data1 => {
            res.render("Homepage/index", {
                username: sess.user,
                soluong: soluong,
                data: data,
                data1: data1
            });
        })

    });
}
function GioHang(tensp, giasp, soluong, tien, id, img) {
    this.tensp = tensp;
    this.giasp = giasp;
    this.soluong = soluong;
    this.tien = tien;
    this.id = id;
    this.img = img;
}
function ThemSanPhamVaoGioHang(req, res) {
    var id = req.params.id;
    var tensp, giasp, soluong, tien, id, img;
    if (giohang.length == 0) {
        productDao.getAllProductByid(id, prod => {
            prod.Items.forEach(itemprod => {
                tensp = itemprod.ten;
                giasp = itemprod.price;
                soluong = 1;
                tien = soluong * giasp;
                id = itemprod.Idprod;
                img = itemprod.img;
                var x = new GioHang(tensp, giasp, soluong, tien, id, img);
                giohang.push(x);
                Soluong(giohang);

            });
        });

    }
    if (giohang.length >= 1) {
        var dem = [];
        for (var i = 0; i < giohang.length; i++) {
            if (id === giohang[i].id) {
                dem.push(1);
            }
        }
        if (dem.length == 0) {
            productDao.getAllProductByid(id, prod => {
                prod.Items.forEach(itemprod => {
                    tensp = itemprod.ten;
                    giasp = itemprod.price;
                    soluong = 1;
                    tien = soluong * giasp;
                    id = itemprod.Idprod;
                    img = itemprod.img;
                    var x = new GioHang(tensp, giasp, soluong, tien, id, img);
                    giohang.push(x);
                    Soluong(giohang);
                });
            });
        }
        if (dem.length == 1) {
            for (var i = 0; i < giohang.length; i++) {
                if (id=== giohang[i].id) {
                    giohang[i].soluong += 1;
                    giohang[i].tien = giohang[i].soluong * giohang[i].giasp;
                    Soluong(giohang);
                }
            }
        }
    }


}
// thêm sản phẩm khi đã có trong giỏ hàng
exports.ThemSoLuong = (req, res) => {
    var id = req.params.id;
    for (var i = 0; i < giohang.length; i++) {
        if (giohang[i].id == id) {
            giohang[i].soluong += 1;
            giohang[i].tien = giohang[i].soluong * giohang[i].giasp;
        }
    }
    sess = req.session;
    TongTien(giohang);
    Soluong(giohang);
    res.render('GioHang/index', {
        username: sess.user,
        giohang: giohang,
        soluong: soluong,
        tongtien: tongtien
    });

}
// giảm số lượng trong giỏ hàng
exports.GiamSoLuong = (req, res) => {
    var id = req.params.id;

    for (var i = 0; i < giohang.length; i++) {
        if (giohang[i].id == id) {
            if(giohang[i].soluong>1){
                giohang[i].soluong -= 1;
                giohang[i].tien = giohang[i].soluong * giohang[i].giasp;
            }

        }
    }

    sess = req.session;
    TongTien(giohang);
    Soluong(giohang);
    res.render('GioHang/index', {
        username: sess.user,
        giohang: giohang,
        soluong: soluong,
        tongtien: tongtien
    });
}
// tong tien gio hang
function TongTien(giohang) {
    tongtien = 0;
    for (var i = 0; i < giohang.length; i++) {
        tongtien += giohang[i].tien;
    }
}
//so luong gio hang
function Soluong(giohang) {
    soluong = 0;
    for (var i = 0; i < giohang.length; i++) {
        soluong += giohang[i].soluong;
    }
}
//xóa sản phẩm trong giỏ hàng
exports.XoaSanPhamGioHang = (req, res) => {
    var id = req.params.id;
    for (var i = 0; i < giohang.length; i++) {
        if (giohang[i].id == id) {
            giohang.splice(i, 1);
            // luc nay i se ve -1 va tiep theo no se cong le 1 =0 tiep tuc duyet
        }
    }
    TongTien(giohang);
    Soluong(giohang);
    res.render('GioHang/index', {
        username: sess.user,
        giohang: giohang,
        soluong: soluong,
        tongtien: tongtien
    });

}
// Xác nhận mua hàng
exports.XaNhanMuaHang = (req, res) => {
    sess = req.session;
    var ten = req.params.ten;
    var diachi = req.body.diachi;
    var sodt = req.body.sodt;
    for (var i = 0; i < giohang.length; i++) {
        var idBillinfo = sess.user + "Billinfo" + giohang[i].id;
        var idBill = sess.user + "Bill";
        var idprod = giohang[i].id;
        var quantity = giohang[i].soluong;
        var tongtien = giohang[i].tien;
        billDao.ThemBillInfo(idBillinfo, idBill, idprod, quantity, tongtien);
    }
    billDao.getAllBillinfo(bill => {
        bill.Items.forEach(itembill => {
            if (itembill.IdBill == sess.user + "Bill") {
                billDao.ThemBill(itembill.IdBill, sess.user, diachi, sodt, "97");
            }
        });
    });

}





