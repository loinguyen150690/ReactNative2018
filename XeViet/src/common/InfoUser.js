import {AsyncStorage} from "react-native";

let InFoUser = (cb) => {
  AsyncStorage.getItem("@UserInfo").then(token => {
    if (token) {
      cb(JSON.parse(token));
    }
  });
}

module.exports = InFoUser;
