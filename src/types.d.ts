declare global {
  export interface Window {
    kakao: any;
  }
}

declare interface CourseType {
  id: string;
  title: string;
  travelStatus: boolean;
  location: string[];
  hashtags: string[];
  courseList: string;
  coverImg: string;
  userID: string;
  nickname: string;
  createdAt: date;
  likes: number;
  likesID: any[];
}

declare interface optionType {
  value: string;
  label: string;
}

declare interface CourseListType {
  memo?: string;
  name: string;
  address: string;
  road: string;
  phone: string;
  id: string;
  bounds: any;
  position: any;
}
