declare global {
  export interface Window {
    kakao: any;
  }
}

declare interface CourseType {
  id: string;
  location: string[];
  hashtags: string[];
  title: string;
  cover: string | undefined;
  createdAt: date;
  likes: number;
  likesID: any[];
  userID: string;
  nickname: string;
  travelStatus: boolean;
  courseList: any;
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
