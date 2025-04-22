import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-utility',
  standalone:true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, FormsModule],
  templateUrl: './text-utility.component.html',
  styleUrl: './text-utility.component.css'
})
export class TextUtilityComponent {
  public textCollection:string =''

}
