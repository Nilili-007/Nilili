declare global {
  export interface Window {
    kakao: any;
  }
}

declare interface CourseType {
  id: string;
  location: string;
  hashtags: string[];
  title: string;
  image: string;
  createdAt: date;
  likes: number;
  likesID: any[];
  userID: string;
  nickname: string;
  isDone: boolean;
  places: string[];
}
