import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Notice } from "../notice.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  
  @Input()
  activeNotice?: Notice;

  @Output()
  close = new EventEmitter();

  emitClose() {
    this.close.emit();
  }
}