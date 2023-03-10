declare global {
  export interface Window {
    kakao: any;
  }
}

declare interface CourseType {
  id: string;
  location: string[];
  hashtags: string[];
  title: string | undefined;
  cover: string | undefined;
  createdAt: date;
  likes: number;
  likesID: any[];
  userID: string;
  nickname: string;
  travelStatus: boolean;
  courseList: any;
  profileImage: string;
}
declare interface optionType {
  value: string;
  label: string;
}

declare interface CourseListType {
  memo: string;
  name: string;
  address: string;
  road: string;
  phone: string;
  id: string;
  position: PositionType;
}

declare interface PositionType {
  lat: number;
  lng: number;
}

declare interface SearchListType {
  place_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  id: string;
  position: object;
  x: string;
  y: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  place_url: string;
}
