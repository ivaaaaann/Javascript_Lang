import * as allTypes from "./type";

const foo: allTypes.FooFunction = function () {
  return "아무 쓸모 없는 함수";
};

const iUser: allTypes.IUser = {
  id: 1,
  name: "빌게이츠",
  email: "bill@ms.com",
  receiveInfo: false,
  active: "y",
};

const iUserProfile: allTypes.IUserProfile = {
  id: 1,
  name: "빌게이츠",
  email: "bill@ms.com",
  receiveInfo: false,
  active: "y",
  profileImage: "https://...",
  github: "okay",
};

const IUserProfiles: allTypes.IUserProfile[] = [];

const iStyle : allTypes.
