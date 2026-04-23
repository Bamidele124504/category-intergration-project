import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input
      type="text"
      [(ngModel)]="searchValue"
      (input)="onInputChange()"
      placeholder="Search products..."
      style="padding:5px"
    />
  `
})
export class SearchInputComponent {
  searchValue = '';
  @Output() searchChange = new EventEmitter<string>();

  onInputChange() {
    this.searchChange.emit(this.searchValue);
  }
}
