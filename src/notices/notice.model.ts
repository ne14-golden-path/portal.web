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

// Use this key to replace any existing generic notices
// with no further correlation expected / required
export const SHARED_CHANNEL_KEY: string = '';
