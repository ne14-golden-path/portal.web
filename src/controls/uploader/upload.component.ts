import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
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

  @Input()
  accept: string = '.*';

  @Output()
  selected = new EventEmitter<File[]>();

  @Output()
  invalid = new EventEmitter<string>();

  dragging: boolean = false;

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
    let invalid = 0;
    const valid = Array.from(files || []).filter(f => {
      const parts = f.name.split('.');
      const ext = '.' + parts[parts.length - 1];
      const validFile = exts.includes(ext);
      if (!validFile) invalid++;
      return validFile;
    });
    if (valid.length) {
      this.selected.emit(valid);
      this.ctrl.nativeElement.value = '';
    }
    if (invalid > 0) {
      this.invalid.emit(`${invalid} file(s) could not be uploaded. Only ${this.accept} files are supported for conversion.`);
    }
  }
}