export type YesOrNo = "y" | "n";
export type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";
export enum DayOfTheWeek {
  "월",
  "화",
  "수",
  "목",
  "금",
  "토",
  "일",
}

export type Name = string;
export type Email = string;
export type FooFunction = () => string;

let xPosition: number = 10;

export interface IUser {
  readonly id: number;
  readonly name: string;
  email: string;
  receiveInfo: boolean;
  active: YesOrNo;
}

export interface IUser {
  address?: string;
}

export type TUser = {
  readonly id: number;
  readonly name: string;
  email: Email;
  receiveInfo: boolean;
  active: YesOrNo;
};

export type TUser = {
  address?: string;
};

export interface IUserProfile extends IUser {
  profileImage: string;
  github?: string;
}
