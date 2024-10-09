import { BlobMetaData, LazyPageResult } from "../documents/models/blob-listing.model";
import { Notice } from "../notices/notice.model";

export interface AppState {
  blobs: LazyPageResult<BlobMetaData>;
  notices: Record<string, Notice>;
}

export const initialAppState: AppState = {
  blobs: { pageNumber: 1, pageSize: 10, data: [] },
  notices: {},
}