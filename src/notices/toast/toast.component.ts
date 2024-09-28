import { Component, Input } from "@angular/core";
import { Notice } from "../notice.model";

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  
  @Input()
  notice!: Notice;
}