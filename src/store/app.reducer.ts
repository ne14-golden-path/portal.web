import { createReducer, on } from "@ngrx/store";
import { AppState, initialAppState } from "./app.state";
import { appActions } from "./app.actions";

export const appReducer = createReducer<AppState>(
  initialAppState,

  on(appActions.listBlobsSuccess,
    (state, action): AppState => ({ ...state, blobs: action.result })),

  on(appActions.deleteBlob, (state, action): AppState => ({
    ...state,
    blobs: { ...state.blobs, data: state.blobs.data.filter(b => b.reference != action.ref) },
  })),

  on(appActions.addNotice, (state, action): AppState => {
    const notices = { ...state.notices };
    notices[action.key] = action.notice;
    return { ...state, notices };
  }),

  on(appActions.removeNotice, (state, action): AppState => {
    const notices = { ...state.notices };
    delete notices[action.key];
    return { ...state, notices };
  }),
);