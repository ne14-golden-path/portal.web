export enum NoticeLevel {
  Neutral,
  Success,
  Failure,
  SystemError,
}

export interface Notice {
  level: NoticeLevel;
  title: string;
  text: string;
  data?: any;
}