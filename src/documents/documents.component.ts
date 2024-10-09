import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { BlobMetaData, LazyPageResult, PageRequest } from "./models/blob-listing.model";
import { UploadComponent } from "../controls/uploader/upload.component";
import { AppState } from "../store/app.state";
import { appSelectors } from "../store/app.selectors";
import { appActions } from "../store/app.actions";

@Component({
    selector: 'app-documents',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      UploadComponent,
    ],
    templateUrl: './documents.component.html',
    styleUrl: './documents.component.scss'
})
export class DocumentsComponent {

  blobsRequest: PageRequest = { pageNumber: 1, pageSize: 10 };
  blobsResponse$: Observable<LazyPageResult<BlobMetaData>>;

  constructor(private store: Store<AppState>) {
    this.blobsResponse$ = this.store.select(appSelectors.getBlobs);
    this.requestCurrentPage();
  }

  download(blobReference: string) {
    this.store.dispatch(appActions.downloadBlob({ ref: blobReference }));
  }

  deleteBlob(blobReference: string) {
    this.store.dispatch(appActions.deleteBlob({ ref: blobReference }));
  }

  onUploadSelected(files: File[]) {
    files.forEach(f => {
      this.store.dispatch(appActions.startPdfConversion({ file: f }));
    });
  }

  requestCurrentPage() {
    this.store.dispatch(appActions.listBlobs({ request: this.blobsRequest }));
  }
}