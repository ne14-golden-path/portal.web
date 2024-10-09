import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { BlobsService } from '../documents/services/blobs.service';
import { appActions } from './app.actions';
import { appSelectors } from './app.selectors';

@Injectable()
export class AppEffects {

  private actions$ = inject(Actions);
  private store = inject(Store);

  constructor(
    private blobsService: BlobsService) {}

  listBlobs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.listBlobs),
      withLatestFrom(this.store.select(appSelectors.getBlobs)),
      switchMap(([action, currentPaging]) =>
        this.blobsService.listBlobs(action.request ?? currentPaging).pipe(
          map(result => appActions.listBlobsSuccess({ result })),
          catchError((error: any) => of(appActions.listBlobsFailure({ error }))),
        )
      )
    );
  });

  startPdfConversion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.startPdfConversion),
      switchMap(action =>
        this.blobsService.convertToPdf(action.file).pipe(
          map(ref => appActions.startPdfConversionSuccess({ ref })),
          catchError((error: any) => of(appActions.startPdfConversionFailure({ error }))),
        )
      )
    );
  });

  downloadBlob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.downloadBlob),
      switchMap(action =>
        this.blobsService.download(action.ref).pipe(
          map(response => {
            const rawDisposition = response.headers.get('Content-Disposition') || '';
            const name = (rawDisposition.match(/\bfilename="?([^";]*)"?;/) || ['','']) [1];
            const objectUrl = window.URL.createObjectURL(response.body!);
            return appActions.downloadBlobSuccess({ name, objectUrl });
          }),
          catchError((error: any) => of(appActions.downloadBlobFailure({ error }))),
        )
      )
    );
  });

  downloadBlobSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.downloadBlobSuccess),
      tap(action => {
        const link = document.createElement('a');
        link.href = action.objectUrl;
        link.download = action.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
    )
  }, { dispatch: false });

  deleteBlob$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appActions.deleteBlob),
      switchMap(action =>
        this.blobsService.delete(action.ref).pipe(
          map(_ => appActions.deleteBlobSuccess()),
          catchError((error: any) => of(appActions.deleteBlobFailure({ error }))),
        )
      )
    );
  });
}