import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})

export class ChildComponent {
  @Output() customeEvent = new EventEmitter<string>();
  public message:string='Message for testing';

  constructor(){
    this.customeEvent.subscribe((msg)=>{
      console.log('msg---', msg)
    });
    this.customeEvent.emit(this.message)
  }

  setMessagae(msg:string){
    this.message = msg;
    console.log(msg);
  }

  sendMessage(){
    this.customeEvent.emit(this.message);
    this.customeEvent.subscribe(data=> console.log('data>>>>>',data))
  }

}
