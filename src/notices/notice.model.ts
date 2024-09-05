export enum NoticeLevel {
  Neutral,
  Success,
  Failure,
  SystemError,
}

export interface Notice {
  level: NoticeLevel;
  message: string;
}