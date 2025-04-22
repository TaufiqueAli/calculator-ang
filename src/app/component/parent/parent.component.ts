import { Component, EventEmitter } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { Subscribable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {
  private event = new EventEmitter<any[]>();

  handleChildEvent(message: string) {
    console.log('Parent Click Message :: ', message);
  }
}
