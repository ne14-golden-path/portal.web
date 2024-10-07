export interface PageRequest {
  pageNumber: number;
  pageSize: number;
}

export interface LazyPageResult<T> {
  pageNumber: number;
  pageSize: number;
  data: T[];
} 

export interface BlobMetaData {
  reference: string;
  contentType: string;
  fileName: string;
  fileSize: number;
}