// public const int User_Type_ChuHang = 1;
// public const int User_Type_ChuXe = 2;
// public const int User_Type_Nhanvien = 3;
// public const int User_Type_Quanly = 4;
// public const int User_Type_TaiXe = 5;


const URL = "http://api.shippers.byte.vn/api/";

export default {
  DonHang: {
    DanhSach: URL + "Order/ListOrder",
    ChiTiet: URL + "Order/Detail/",
    DanhSachDHCX: URL + 'Order/ListOrderCarOwner',
    DanhSachDHTX: URL + 'Order/ListOrderDriver',
    KetThuc: URL + 'Order/Complete/',
     LoTrinh: URL + 'Address/GetAddressInfoByOrderId?OrderId='
  },
  ChuyenHang: {
    DanhSach: URL + "Shipment/ListShipment",
    ThemMoi: URL + "Shipment/Insert",
    ChiTiet: URL + "Shipment/Detail/",
    Huy: URL + 'Shipment/Cancel',
    LoTrinh: URL + 'Address/GetAddressInfoByShipmentId?ShipmentId=',
  },
  Xe: {
    DanhSach: URL + "Car/ListCar",
    Xoa: URL+ 'Car/Remove/',
    NhaSanXuat: URL + 'Manufacturer/ListManufacturer',
    LoaiXe: URL + 'CarType/ListCarType',
    ThemMoi: URL + 'Car/Insert',
    ChiTiet: URL + 'Car/Detail/',
    CapNhat: URL + 'Car/Update'
  },
  User: {
    Insert: URL + "user/insert",
    Login: URL + "user/login",
    Update: URL + "user/update",
    ForgotPassword: URL + "user/ForgotPassword",
    CheckOTP: URL + "user/CheckOTP",
    UpdatePassword: URL + "user/UpdatePassword",
    GetUserInfoByPhone: URL + "user/GetUserInfoByPhone?Phone=",
    UpdatePassword: URL + "user/UpdatePassword"
  },
  DichVu: {
    DanhSach: URL + "Service/ListService"
  },
  DongGoi: {
    DanhSach: URL + "Package/ListPackage"
  },
  LoaiHangHoa: {
    DanhSach: URL + "ProductType/ListProductType"
  },
  TinTuc:{
    DanhSach: URL + 'News/ListNews',
    ChiTiet: URL + 'News/Detail/'
  },
  ThongBao:{
    DanhSach: URL + 'News/ListNotification',
    ChiTiet: URL + 'News/Detail/'
  },
  DiaChi:{
    TinhTP:URL + 'Property/ListCity',
    QuanHuyen: URL + 'Property/ListDistrict?CityId=',
  },
  LichTrinh: {
    DanhSach:  URL + 'CarSchedule/ListCarSchedule?', //CarId=1&Page=2
    ChiTiet:  URL +  'CarSchedule/Detail?',
    CapNhat: URL + 'CarSchedule/InsertOrUpdate'
  },
  map:{
    key: 'AIzaSyAwIc4hUs2YuC2yBxJO0qmcPG9DP4bqlf0',
    distance: 'https://maps.googleapis.com/maps/api/distancematrix/json?',
    autoComplete: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?',
    placeDetail: 'https://maps.googleapis.com/maps/api/place/details/json?'
  },
  TaiXe:{
    DanhSach: URL + 'User/ListDriver?UserId=',//id cua chu xe
    DonHang: URL +'Order/ListOrderDriver', //UserId: 5091, StatusId: 0
  }
};
