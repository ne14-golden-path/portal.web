import { createAction, props } from "@ngrx/store"
import { BlobMetaData, LazyPageResult, PageRequest } from "../documents/models/blob-listing.model"

export const appActions = {
  listBlobs: createAction('[App] List Blobs', props<{ request?: PageRequest }>()),
  listBlobsSuccess: createAction('[App] List Blobs - Success', props<{ result: LazyPageResult<BlobMetaData>}>()),
  listBlobsFailure: createAction('[App] List Blobs - Failure', props<{ error: any }>()),

  startPdfConversion: createAction('[App] Start Pdf Conversion', props<{ file: File }>()),
  startPdfConversionSuccess: createAction('[App] Start Pdf Conversion - Success', props<{ ref: string }>()),
  startPdfConversionFailure: createAction('[App] Start Pdf Conversion - Failure', props<{ error: any }>()),

  downloadBlob: createAction('[App] Download Blob', props<{ ref: string }>()),
  downloadBlobSuccess: createAction('[App] Download Blob - Success', props<{ name: string, objectUrl: string }>()),
  downloadBlobFailure: createAction('[App] Download Blob - Failure', props<{ error: any }>()),

  deleteBlob: createAction('[App] Delete Blob', props<{ ref: string }>()),
  deleteBlobSuccess: createAction('[App] Delete Blob - Success'),
  deleteBlobFailure: createAction('[App] Delete Blob - Failure', props<{ error: any }>()),
}