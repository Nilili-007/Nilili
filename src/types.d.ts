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
  userId: string;
  nickname: string;
  isDone: boolean;
  places: string[];
}
