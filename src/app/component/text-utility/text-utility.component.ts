import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-text-utility',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './text-utility.component.html',
  styleUrls: ['./text-utility.component.css']
})
export class TextUtilityComponent {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  public textCollection = '';
  public wordCount = 0;
  public charCount = 0;
  public sentencesCount = 0;
  public mostOccurenceWord = '';
  public leastOccurenceWord = '';
  public mostTimesOcc = 0;
  public leastTimesOcc = 0;
  public showText = '';
  public safeHtml: SafeHtml = '';
  private selectedFile: File | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {}

  handleInputChange(text: string): void {
    this.textCollection = text;
  }

  private updateWordCount(): void {
    const words = this.textCollection.trim().split(/\s+/).filter(Boolean);
    this.wordCount = words.length;
  }

  private updateCharacterCount(): void {
    this.charCount = this.textCollection.replace(/\s+/g, '').length;
  }

  private updateSentenceCount(): void {
    const abbreviations = [
      "Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Sr.", "Jr.",
      "St.", "vs.", "e.g.", "i.e.", "etc.", "Fig.", "fig.",
      "No.", "nos.", "Jan.", "Feb.", "Mar.", "Apr.", "Jun.", "Jul.", "Aug.", "Sep.", "Sept.", "Oct.", "Nov.", "Dec.",
      "U.S.", "U.K.", "a.m.", "p.m.", "B.C.", "A.D.", "Inc.", "Ltd.", "Co.", "Corp.", "Mt.", "Rd.", "Ave.", "Bros."
    ];

    let tempText = this.textCollection;
    abbreviations.forEach(abbr => {
      const placeholder = abbr.replace('.', '##');
      const regex = new RegExp(abbr.replace('.', '\\.'), 'g');
      tempText = tempText.replace(regex, placeholder);
    });

    const sentences = tempText.split(/(?<=[.!?])\s+(?=[A-Z])/).map(s => s.replace(/##/g, '.')).filter(Boolean);
    this.sentencesCount = sentences.length;
  }

  private updateWordFrequency(): void {
    const words = this.textCollection
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    const freqMap = new Map<string, number>();

    for (const word of words) {
      freqMap.set(word, (freqMap.get(word) || 0) + 1);
    }

    let most = '', least = '';
    let max = 0, min = Infinity;

    freqMap.forEach((count, word) => {
      if (count > max) {
        max = count;
        most = word;
      }
      if (count < min) {
        min = count;
        least = word;
      }
    });

    this.mostOccurenceWord = most;
    this.leastOccurenceWord = least;
    this.mostTimesOcc = max;
    this.leastTimesOcc = min;
  }

  generateReport(): void {
    this.updateWordFrequency();
    this.updateSentenceCount();
    this.updateCharacterCount();
    this.updateWordCount();
    this.showText = this.textCollection;
  }

  letterCaseChange(type: string): void {
    switch (type) {
      case 'capital':
        this.textCollection = this.textCollection.toUpperCase();
        break;
      case 'lower':
        this.textCollection = this.textCollection.toLowerCase();
        break;
      case 'capitalize':
        this.textCollection = this.textCollection
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        break;
    }
    this.showText = this.textCollection;
  }

  removeExtraSpace(): void {
    this.textCollection = this.textCollection.trim().replace(/\s+/g, ' ');
    this.showText = this.textCollection;
  }

  copyText(): void {
    const trimmedText = this.textCollection.trim();
    if (trimmedText) {
      this.clipboard.copy(trimmedText);
      this.snackBar.open('Copied!', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    } else {
      this.snackBar.open('No text to copy.', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }

  exportText(): void {
    const blob = new Blob([this.textCollection], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadableLink = document.createElement('a');
    downloadableLink.href = url;
    downloadableLink.download = 'myFile.txt';
    document.body.appendChild(downloadableLink);
    downloadableLink.click();
    document.body.removeChild(downloadableLink);
    URL.revokeObjectURL(url);
  }

  stripHtml(html: string): string {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || '';
  }

  triggerFileInput(): void {
    this.fileInput?.nativeElement.click();
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          this.textCollection = result;
          this.showText = this.textCollection;
        }
      };
      reader.readAsText(file);
    }
  }

  clearText(): void {
    this.textCollection = '';
    this.charCount = 0;
    this.wordCount = 0;
    this.sentencesCount = 0;
    this.mostOccurenceWord = '';
    this.leastOccurenceWord = '';
    this.mostTimesOcc = 0;
    this.leastTimesOcc = 0;
    this.showText = '';
    this.safeHtml = '';
  }
}
