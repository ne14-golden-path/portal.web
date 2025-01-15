import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Notice } from "../../notices/notice.model";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-toast',
    imports: [CommonModule],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnChanges {
  
  @Input()
  notices: Record<string, Notice> = {};
  
  @Output()
  close = new EventEmitter<string>();

  noticeList: { key: string, notice: Notice }[] = [];
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['notices']) {
      this.noticeList = Object.keys(this.notices).map(key => ({ key, notice: this.notices[key] }));
    }
  }

  emitClose(key: string) {
    this.close.emit(key);
  }
}