const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const data = require("./data.json");

function menu(chon){
    switch (chon){
        case "1":
          Login();
          break;
        case "2":
            Register();
            break;
        case "3":
            console.log(data.users);
            select();
            break;
        case "0":
            select();
            break;
        case "x":
            process.exit();  

          default:
              baoLoi();
              select();
              break;
    }
}
function select(){
    console.log("1.Đăng nhập");
    console.log("2.Đăng ký");
    console.log("3.Xuất danh sách user")
    console.log("Bấm x để thoát chương trình");
    rl.question("Nhập lựa chọn: ",(selection)=>{
        console.clear();
        menu(selection);
    });
}
// function Register(){

//     rl.question("Nhập tài khoản: ",(taiKhoan)=>{
//     rl.question("Nhập mật khẩu: ",(matKhau)=>{
//         for(i = 0 ; i<data.users.length;i++)
//         {
//             if(taiKhoan != data.users[i].user){
//                 data.users.push({user:taiKhoan,password:matKhau});

//                 rl.question("Đăng ký thành công. Nhập 0 để quay lại: ",(selection)=>{
//                     console.clear();
//                     menu(selection);
//                 });
//                 break;
//             }
//             else
//             {
//                 console.clear();
//                 console.log("Đăng ký thất bại do tài khoản đã sử dụng");
//                Register();
//                continue;
//             }
//         }
//     });
//     });
// }
function Register(){

    rl.question("Nhập tài khoản: ",(taiKhoan)=>{
    rl.question("Nhập mật khẩu: ",(matKhau)=>{
        const userExist = data.users.some(us => us.user === taiKhoan);
        if(userExist)
        {
            console.clear();
            console.log("Tài khoản đã sử dụng");
            select();
        }
        else
        {
            console.clear();
            data.users.push({user:taiKhoan,password:matKhau});
            console.log("Đăng ký thành công");
            select();
        }
    });
    });
}
function Login(){
    rl.question("Nhập tài khoản: ", (taiKhoan)=>{
        rl.question("Nhập mật khẩu: ",(matKhau)=>{
            const userExist = data.users.some(us => us.user === taiKhoan);
            const passExist = data.users.some(pw=> pw.password === matKhau);
            if(userExist && passExist)
            {
                console.clear();
                console.log("Đăng nhập thành công");
                menuLogin();
            }
            else
            {
                console.clear();
                console.log("Sai tài khoản hoặc mật khẩu");
                select();
            }
        })
    })
}
function menuLogin(){
    console.log("1. Khách hàng");
    console.log("2. Phòng ốc");
    console.log("3. Thiết bị");
    console.log("Bấm x để thoát chương trình");
    console.log("Nhập 0 để quay lại: ")
    rl.question("Nhập lựa chọn: ",(selection)=>{
        console.clear();
        menuDangKy(selection);
    });
}

function menuDangKy(chon)
{
    switch(chon){
        case "0":
            select();
            break;
        case "1":
            khacHang();
            break;
        case "2":
            phongOc();
            break;
        case "3":
            thietBi();
            break;

        case "x":
            process.exit();
        default:
            baoLoi();
            menuLogin();
            break;
    }
}
function thietBi(){
    console.log("1.Thêm thiết bị");
    console.log("2.Xóa thiết bị");
    console.log("3.Sửa thiết bị");
    console.log("4.Xem danh sách thiết bị");
    console.log("0.Quay lại");
    console.log("Bấm x để thoát");
    rl.question("Nhập lựa chọn: ",(selection)=>{
        console.clear();
        menuThietBi(selection);
    });
    
}
function menuThietBi(chon){
    switch(chon){
        case "0":
            menuLogin();
            break;
        case "1":
            themThietBi();
            break;
        case "2":
            xoaThietBi();
            break;
        case "3":
            suaThietBi();
            break;
        case "4":
            console.log(data.tools);
            thietBi();
            break;
        case "x":
            process.exit();
        default:
            console.clear()
            baoLoi();
            thietBi();
            break;
    }
}
function themThietBi(){
    rl.question("Nhập mã thiết bị: ",(mTB)=>{
        const tbExist = data.tools.some(tb => tb.maTB === mTB);
        if(tbExist)
        {
            console.clear();
            console.log("Thêm không thành công do trùng mã thiết bị");
            thietBi();
        }
        else
        {
            rl.question("Nhập loại thiết bị: ",(lTB)=>{
                rl.question("Nhập tình trang: ",(tTrang)=>{
                    rl.question("Nhập phòng để thiết bị: ",(pchua)=>{
                        const pchuaExist = data.rooms.some(pc=> pc.maPhong === pchua);
                        if(pchuaExist)
                        {
                            console.clear();
                            data.tools.push({maTB:mTB,loaiTB:lTB,tinhTrang:tTrang,phong:pchua});
                            console.log("Thêm thiết bị thành công");
                            thietBi();
                        }
                        else
                        {
                            console.clear();
                            console.log("Phòng không tồn tại");
                            themThietBi();
                        }
                    })
                })
            })
        }
    })
}
function xoaThietBi(){
    rl.question("Nhập mã thiết bị cần xóa",(ma)=>{
        const tbExist = data.tools.some(tb=> tb.maTB === ma);
        if(tbExist)
        {
            console.clear();
            function isMaTB(tb){
                return tb.maTB === ma;
            }
            var xoa = data.tools.findIndex(isMaTB);
            data.tools.splice(xoa,1);
            console.log("Xóa thành công");
            thietBi();
        }
        else
        {
            console.clear();
            console.log("Không tìm thấy mã thiết bị");
            thietBi();
        }
    })
}
function suaThietBi(){
    rl.question("Nhập mã thiết bị cần sửa: ", (oldMaTB)=>{
        const maTBExist = data.tools.some(tb=> tb.maTB === oldMaTB);
        if(maTBExist)
        {
            rl.question("Nhập mã thiết bị mới: ",(newMaTB)=>{
                rl.question("Nhập loại thiết bị mới: ",(newLoai)=>{
                    rl.question("Nhập tình trạng: ",(newTTrang)=>{
                        rl.question("Nhập phòng chứa thiết bị: ",(newphong)=>{
                            const pchuaExist = data.rooms.some(pc=> pc.maPhong === newphong);
                            if(pchuaExist)
                            {
                                function isMaTB(tb)
                            {
                                return tb.maTB === oldMaTB;
                            }
                            var vitri = data.tools.findIndex(isMaTB);

                            data.tools[vitri].maTB = newMaTB;
                            data.tools[vitri].loai = newLoai;
                            data.tools[vitri].tinhTrang = newTTrang;
                            data.tools[vitri].phong = newphong;
                            console.log("Sửa thông tin thiết bị thành công: ");
                            thietBi()
                            }
                            else
                            {
                                console.clear();
                                console.log("Không tìm thấy phòng chứa thiết bị");
                                suaThietBi();
                            }
                            
                        })
                    })
                })
            })
        }
        else
        {
            console.clear();
            console.log("Không tìm thấy mã thiết bị");
            thietBi();
        }
    })
}
function phongOc(){
    console.log("1.Thêm phòng ốc");
    console.log("2.Xóa phòng ốc");
    console.log("3.Sửa phòng ốc");
    console.log("4.Xem danh sách phòng ốc");
    console.log("0.Quay lại")
    console.log("Bấm x để thoát chương trình");
    rl.question("Nhập lựa chọn: ",(selection)=>{
        console.clear();
        menuPhongOc(selection);
    });
}
function menuPhongOc(chon){
    switch (chon)
    {
        case "1":
            themPhongOc();
            break;
        case "2":
            xoaPhongOc();
            break;
        case "3":
            suaPhongOc();
            break;
        case "4":
            console.log(data.rooms);
            phongOc();
            break;
        case "5":
            dangKyLuuTru();
            break;
        case "0":
            menuLogin();
            break;
        case "x":
            process.exit();
            default:
                baoLoi();
                phongOc();
                break;
    }
}
function themPhongOc(){
    rl.question("Nhập mã phòng: ",(ma)=>{

        const maExist = data.rooms.some(maP=>maP.maPhong === ma);
if(maExist)
{
    console.clear();
    console.log("trùng mã");
    phongOc();
}
else
{
    console.clear();
    rl.question("Nhập loại phòng: ",(loai)=>{
        rl.question("Nhập tình trạng phòng: ",(tTrang)=>{
            rl.question("Nhập ngày đặt: ",(dat)=>{
                rl.question("Nhập ngày trả: ",(tra)=>{
                    var nDat = new Date(dat);
                    var nTra = new Date(tra);
                    if(nDat.getTime()<nTra.getTime())
                    {
                        console.log("thêm thành công");
                        data.rooms.push({maPhong:ma,loaiPhong:loai,tinhTrang:tTrang,ngayDat:dat,ngayTra:tra});
                        phongOc();
                    }
                    else
                    {
                        console.clear();
                        console.log("Ngày đặt phải nhỏ hơn ngày trả");
                    }
                
            });
        });
        });
    });

}
                });

}
function xoaPhongOc(){
    rl.question("Nhập mã phòng muốn xóa: ",(maXoa)=>{
        const phongExist = data.rooms.some(p=> p.maPhong === maXoa); 

        if(phongExist)
        {
            console.clear();
            console.log("Xóa thành công");
            function isMaP(y){
                return y.maPhong === maXoa;
                }
            var x = data.rooms.findIndex(isMaP);
        data.rooms.splice(x,1);
            phongOc();
        }
        else
        {
            console.clear();
            console.log("Xóa thất bại");
            phongOc();
        }
    })
}
function suaPhongOc(){
    rl.question("Nhập mã phòng cần sửa: ",(ma)=>{
        const maExist = data.rooms.some(p=> p.maPhong === ma);
        if(maExist)
        {
            rl.question("Nhập mã phòng mới: ",(newMa)=>{
                rl.question("Nhập loại phòng mới: ",(newLoai)=>{
                    rl.question("Nhập tình trang mới: ", (newTTrang)=>{
                        rl.question("Nhập ngày đặt mới: ",(newDat)=>{
                            rl.question("Nhập ngày trả: ",(newTra) =>{
                                function isPhong(z){
                                    return z.maPhong === ma;
                                    }   
                                    var viTri = data.rooms.findIndex(isPhong);
                                    data.rooms[viTri].maPhong = newMa;
                                    data.rooms[viTri].loaiPhong = newLoai;
                                    data.rooms[viTri].tinhTrang = newTTrang;
                                    data.rooms[viTri].ngayDat = newDat;
                                    data.rooms[viTri].ngayTra = newTra;
                                    console.clear();
                                    console.log("Sửa thành công");
                                    console.log(viTri);
                                    phongOc();
                            })
                        })
                    })
                })
            })
        }
        else
        {
            console.clear();
            console.log("Ko tìm thấy mã phòng! ");
            phongOc();
        }
    });
}
function baoLoi()
{
    console.log("Nhập sai vui lòng nhập lại");
    
}
function khacHang()
{
    console.log("1.Thêm khách hàng");
    console.log("2.Xóa khách hàng");
    console.log("3.Sửa khách hàng");
    console.log("4.Xem danh sách khách hàng");
    console.log("5.Đăng ký lưu trú");
    console.log("6.Xem danh sách lưu trú");
    console.log("7.Tìm kiếm khách hàng");
    console.log("0.Quay lại");
    console.log("Bấm x để thoát chương trình");
    rl.question("Nhập lựa chọn: ",(selection)=>{
        console.clear();
        menuKhachHang(selection);
    });
}
function menuKhachHang(chon){
    switch (chon)
    {
        case "1":
            themKhachHang();
            break;
        case "2":
            xoaKhachHang();
            break;
        case "3":
            suaKhachHang();
            break;
        case "4":
            console.log(data.customers);
            khacHang();
            break;
        case "5":
            dangKyLuuTru();
            break;
        case "6":
            console.log(data.hoaDon);
            khacHang();
            break;
        case "7":
            timKiemKH();
            break;
        case "0":
            menuLogin();
            break;
        case "x":
            process.exit();
            default:
                baoLoi();
                khacHang();
                break;
    }
}
function themKhachHang(){
    rl.question("Nhập tên khách hàng: ",(name)=>{
    rl.question("Nhập CMND khách hàng: ",(cmnd)=>{
    rl.question("Nhập số điện thoại khách hàng: ",(sdt)=>{
        const cmndExist = data.customers.some(cm=> cm.CMND === cmnd); 

        if(cmndExist)
        {
            console.clear();
            console.log("đăng ký thất bại do trùng cmnd");
            khacHang();
        }
        else
        {
            data.customers.push({tenKH:name,CMND : cmnd,SDT:sdt});

            rl.question("Đăng ký khách hàng thành công. Nhập 0 để quay lại: ",(selection)=>{
                console.clear();
                khacHang(selection);
            });

        }
    
});
        });
    });
}
function xoaKhachHang()
{

    rl.question("Nhập CMND khách hàng: ",(cmnd)=>{
        const cmndExist = data.customers.some(cm=> cm.CMND === cmnd); 
        if(cmndExist)
    {
        function isCMND(x){
            return x.CMND === cmnd;
            }
        var xoa = data.customers.findIndex(isCMND);
    data.customers.splice(xoa,1);
            console.log("Xóa khách hàng thành công.");
            khacHang();
    }
    else
    {
        console.clear();
        console.log("Xóa thất bại do không tìm thấy cmnd");
        khacHang();

    }

});
}
function suaKhachHang(){
    rl.question("Nhập CMND cần sửa", (oldCMND)=>{

        const cmndExist = data.customers.some(cm=> cm.CMND === oldCMND);  
        if(cmndExist)
        {
            rl.question("Nhập tên mới: ",(newName)=>{
                rl.question("Nhập CMND mới: ",(newCMND) =>{
                    rl.question("Nhập SDT mới: ",(newSDT)=>{
                        function isCMND(x){
                            return x.CMND === oldCMND;
                            }   
                            var viTri = data.customers.findIndex(isCMND);
                            data.customers[viTri].tenKH = newName;
                            data.customers[viTri].CMND = newCMND;
                            data.customers[viTri].SDT = newSDT;
                            console.clear();
                            console.log("Sửa thành công");
                            khacHang();
                    });
                });
            });
        }  
        else
        {
            console.clear();
            console.log("ko tìm thây cmnd");
            khacHang();
        }
    
});
}
function dangKyLuuTru(){
    rl.question("Nhập cmnd khach hang: ",(cmnd)=>{
        const cmndExist = data.customers.some(cm => cm.CMND === cmnd)
        if(cmndExist)
        {
            rl.question("Nhập mã phòng: ",(maP) =>{
                const maPExist = data.rooms.some(ma=>ma.maPhong === maP);
                if(maPExist)
                {
                    rl.question("Nhập ngày đặt: ",(dat)=>{
                        
                            function isNgayTra(x){
                            return x.maPhong === maP;
                            }
                            var vitriP = data.rooms.findIndex(isNgayTra);
                            var newDat = new Date(dat);
                            
                            var traPhongCu = new Date(data.rooms[vitriP].ngayTra);
                            if(traPhongCu.getTime() < newDat.getTime())
                            {
                                rl.question("Nhập ngày trả: ",(tra)=>{
                                    var newTra = new Date(tra);
                                    function isKhachHang(x){
                                        return x.CMND === cmnd;
                                        }
            
                                var vitriK = data.customers.findIndex(isKhachHang);
                                if(newDat.getTime()<newTra.getTime())
                                {
                                    console.clear();
                                data.hoaDon.push({maPhongDat:maP,loaiPhong:data.rooms[vitriP].loaiPhong,tenKH:data.customers[vitriK].tenKH,CMND:cmnd,SDT:data.customers[vitriK].SDT,ngayDat:dat,ngayTra:tra});
                                data.rooms[vitriP].ngayDat = dat;
                                data.rooms[vitriP].ngayTra = tra;
                                console.log("thêm thành công");
                                khacHang();
                                }
                                else
                                {
                                    console.clear();
                                console.log("Ngày đặt phải nhỏ hơn ngày trả");
                                khacHang();
                                }
                                });
                            }
                            else
                            {
                                console.clear();
                                console.log("Phòng đã có người đặt hoặc nhập sai ngày");
                                khacHang();
                            }
                    })
                }
                else
                {
                    console.clear();
                    console.log("Không tìm thấy mã phòng");
                    khacHang();
                }
                       
        })  
        }
        else
        {
            console.clear();
            console.log("ko tìm thấy cmnd");
            khacHang();
        }
    })
}
function timKiemKH(){
    rl.question("Nhập chứng minh nhân dân cần tìm: ",(cmnd)=>{
        const cmndExist = data.customers.some(cm => cm.CMND === cmnd);
        if (cmndExist)
        {
            console.clear();
            console.log("Tìm thấy thành công");
            function isCMND(x){
                return x.CMND === cmnd;
            }
            var viTriK = data.customers.findIndex(isCMND);
            console.log(data.customers[viTriK]);
            dangKyLuuTru();
        }
        else
        {
            console.clear();
            console.log("Không tìm thấy khách hàng, tiến hành đăng kí");
            themKhachHang();
        }
    });
}
function main(){

    select(menu);
};
main();
