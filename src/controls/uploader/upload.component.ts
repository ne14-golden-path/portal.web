import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  @ViewChild('ctrl')
  ctrl!: ElementRef<HTMLInputElement>;

  @Output()
  selected = new EventEmitter<FileList>();

  dragging: boolean = false;

  zoneClick() {
    this.ctrl.nativeElement.click();
  }

  inputChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files?.length) {
      this.selected.emit(files);
    }
  }

  startDrag(event: DragEvent) {
    event.preventDefault();
    this.dragging = true;
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  stopDrag = () => this.dragging = false;

  drop(event: DragEvent) {
    event.preventDefault();
    this.stopDrag();
    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.selected.emit(files);
    }
  }
}