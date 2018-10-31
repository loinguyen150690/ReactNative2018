const URL = "http://api.emdiu.com";
/*
int tinhthanhid = 0,
string userName = "",
int xeid = 0,
int pagenum = 1,
int pagesize = 100,
string LoaiXeCode= "",
string MauXe = "",
int SoChoNgoi = 0,
string LoaiDongCoCode ="",
string TuNgay = "",
string DenNgay ="",
int GiaTu = 0,
int GiaDen = 0
*/
export default {
   Xe:{
     DanhSach:URL + "/api/XeGetAll?UserName=",
     ChiTiet: URL + "/api/XeGet_ByID?id=",
     CapNhat: URL + "/api/XeCreateUpdate",
     Xoa:URL + "/api/XeDel?xeid="
   },
   LichXe:{
     DanhSach: URL + "/api/LichXeGetAll",
     CapNhat: URL + "/api/LichXeChange"
   },
   Image:{
     URLXe: URL + "/images/Xe/"
   },
   LoaiXe:{
     DanhSach:URL + "/api/DanhMucGetAll?TenDanhMuc=DM_LoaiXe"
   },
   LoaiDongCo:{
     DanhSach:URL + "/api/DanhMucGetAll?TenDanhMuc=DM_DongCo"
   },
   TrangThai:{
     DanhSach:URL + "/api/DanhMucTrangThai?UserName="
   },
   NguoiDung:{
     DanhSach:URL + "/api/UserGetAll",
     DangNhap:URL + "/api/UserLogin",
     DangKy:URL + "/api/UserCreateUpdate"
   }
}
