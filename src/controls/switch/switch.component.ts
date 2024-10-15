import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss'
})
export class SwitchComponent implements OnChanges {
  
  @Input()
  on: boolean = false;
  
  @Output()
  change = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['on']) {
      this.change.emit(this.on);
    }
  }

  toggle() {
    this.on = !this.on;
    this.change.emit(this.on);
  }
}