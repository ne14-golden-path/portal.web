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
  selected = new EventEmitter<File[]>();

  dragging: boolean = false;
  accept: string = '.doc,.docx,.html';

  zoneClick() {
    this.ctrl.nativeElement.click();
  }

  inputChange(event: Event) {
    const files = (event.target as HTMLInputElement).files || [];
    this.emitValidFiles(Array.from(files || []));
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
    this.emitValidFiles(Array.from(event.dataTransfer?.files || []));
  }

  private emitValidFiles(files: File[]) {
    const exts = this.accept.split(',');
    const valid = Array.from(files || []).filter(f => {
      const parts = f.name.split('.');
      const ext = '.' + parts[parts.length - 1];
      const validFile = exts.includes(ext);
      if (!validFile) console.log(`Extension not supported: ${ext}`);
      return validFile;
    });
    if (valid.length) {
      this.selected.emit(valid);
    }
  }
}