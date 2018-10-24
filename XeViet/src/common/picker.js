
//load hinh
var ImagePicker = require('react-native-image-picker');
var options = {
  title: '',
  cancelButtonTitle: 'Hủy',
  takePhotoButtonTitle: 'Chụp ảnh',
  chooseFromLibraryButtonTitle: 'Chọn ảnh có sẵn',
  mediaType: 'photo',
  quality: 0.3,
  allowsEditing: false,
  maxWidth: 667,
  maxHeight: 667,
  // noData: true,
  // customButtons: [
  //   {name: 'fb', title: 'Chọn  hình từ Facebook'},
  // ],
  storageOptions: {
    skipBackup: false,
    path: 'images'
  }
};
let pick = (cb) => {
  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      let source = { uri: response.uri };
    //  cb(source, response.fileName, response.data, response.type, response.fileSize, response.path);
       cb(source, response.fileName, response.data, response.type);
    }
  });
}

module.exports = pick;
