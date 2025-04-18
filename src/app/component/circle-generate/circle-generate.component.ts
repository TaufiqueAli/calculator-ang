import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-circle-generate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circle-generate.component.html',
  styleUrls: ['./circle-generate.component.css']
})
export class CircleGenerateComponent {
  public firstCircleRadius: number = 0;
  public secondCircleRadius: number = 0;

  public cursorX: number = 0;
  public cursorY: number = 0;
  public secondCursorX: number = 0;
  public secondCursorY: number = 0;

  private count: number = 0;

  onClick(event: MouseEvent): void {
    if (this.count === 2) {
      this.reset();
      return;
    }

    // Set cursor position before increasing count
    this.setCursorPosition(event);
    this.setRandomRadius();
    this.count++;
  }

  private setCursorPosition(event: MouseEvent): void {
    if (this.count === 1) {
      this.cursorX = event.clientX;
      this.cursorY = event.clientY;
    } else if (this.count === 2) {
      this.secondCursorX = event.clientX;
      this.secondCursorY = event.clientY;
    }
  }

  private setRandomRadius(): void {
    const randomNumber = Math.floor(Math.random() * 200) + 20;
    if (this.count === 0) {
      this.firstCircleRadius = randomNumber;
    } else if (this.count === 1) {
      this.secondCircleRadius = randomNumber;
    }
  }

  private reset(): void {
    this.firstCircleRadius = 0;
    this.secondCircleRadius = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.secondCursorX = 0;
    this.secondCursorY = 0;
    this.count = 0;
  }
}
