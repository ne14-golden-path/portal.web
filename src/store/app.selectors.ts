import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AppState } from "./app.state";

const base = createFeatureSelector<AppState>('app');

export const appSelectors = {
  getBlobs: createSelector(base, s => s.blobs),
  getNotices: createSelector(base, s => s.notices),
};