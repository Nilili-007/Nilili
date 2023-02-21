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
  travelStatus: boolean;
  location: string[];
  hashtags: string[];
  courseList: string[];
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
