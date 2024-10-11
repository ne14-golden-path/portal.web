import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, Observable, of } from "rxjs";

import { AppState } from "../store/app.state";
import { appActions } from "../store/app.actions";
import { NoticeLevel } from "./notice.model";

export function httpNoticeInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const stateStore = inject(Store<AppState>);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const key = `error_${err.status}`;
      const sysError = err.status >= 500;
      const level = sysError ? NoticeLevel.SystemError : NoticeLevel.Failure;
      const title = sysError ? 'System Error' : 'Invalid Request';
      const text = sysError ? 'Service unavailable. Please try again later.' : (err.error?.message || 'Unable to process your request.');
      stateStore.dispatch(appActions.addNotice( { key, notice: { level, title, text } }));
      throw err;
    }),
  );
}