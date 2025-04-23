import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-text-utility',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, FormsModule],
  templateUrl: './text-utility.component.html',
  styleUrls: ['./text-utility.component.css']
})
export class TextUtilityComponent {
  public textCollection: string = '';
  public wordCount: number = 0;
  public charCount: number = 0;
  public sentencesCount: number = 0;
  public mostOccurenceWord: string = '';
  public leastOccurenceWord: string = '';
  public mostTimesOcc: number = 0;
  public leastTimesOcc: number = 0;
  public showText: string = '';
  public safeHtml: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  handleInputChange(event: string) {
    this.textCollection = event;
  }

  getWordCount() {
    this.wordCount = this.textCollection.trim().split(/\s+/).length;
  }

  letterCaseChange(type: string) {
    if (type === 'capital') {
      this.textCollection = this.textCollection.toUpperCase();
    } else if (type === 'lower') {
      this.textCollection = this.textCollection.toLowerCase();
    } else if (type === 'capitalize') {
      this.textCollection = this.textCollection
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
    this.showText = this.textCollection;
  }

  removeExtraSpace() {
    this.textCollection = this.textCollection.trim().replace(/\s+/g, ' ');
    this.showText = this.textCollection;
  }

  charecterCount() {
    this.charCount = this.textCollection.replace(/\s+/g, '').length;
  }

  getSentenceCount() {
    const abbreviations = [
      "Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Sr.", "Jr.",
      "St.", "vs.", "e.g.", "i.e.", "etc.", "Fig.", "fig.",
      "No.", "nos.", "Jan.", "Feb.", "Mar.", "Apr.", "Jun.", "Jul.", "Aug.", "Sep.", "Sept.", "Oct.", "Nov.", "Dec.",
      "U.S.", "U.K.", "a.m.", "p.m.", "B.C.", "A.D.", "Inc.", "Ltd.", "Co.", "Corp.", "Mt.", "Rd.", "Ave.", "Bros."
    ];

    let tempText = this.textCollection;
    abbreviations.forEach(abbr => {
      const placeholder = abbr.replace('.', '##');
      tempText = tempText.replaceAll(abbr, placeholder);
    });

    let sentences = tempText.split(/(?<=[.!?])\s+(?=[A-Z])/);

    this.sentencesCount = sentences.map(sentence => sentence.replace(/##/g, '.')).length;
  }

  findWordFriquency() {
    const words = this.textCollection.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    const freq = new Map<string, number>();

    words.forEach(word => {
      freq.set(word, (freq.get(word) || 0) + 1);
    });

    let most = '', least = '';
    let max = 0, min = Infinity;

    for (const [word, count] of freq) {
      if (count > max) {
        max = count;
        most = word;
      }
      if (count < min) {
        min = count;
        least = word;
      }
    }

    this.mostOccurenceWord = most;
    this.leastOccurenceWord = least;
    this.mostTimesOcc = max;
    this.leastTimesOcc = min;

    return { most, least, freq: Object.fromEntries(freq) };
  }

  generateReport() {
    this.findWordFriquency();
    this.getSentenceCount();
    this.charecterCount();
    this.getWordCount();
    // this.highlightWords(this.textCollection, this.mostOccurenceWord, this.leastOccurenceWord);
  }

  // highlightWords(text: string, most: string, least: string): void {
  //   const regex = new RegExp(`\b(${most}|${least})\b`, 'gi');
  //   this.showText = text.replace(regex, (match) => {
  //     const isMost = match.toLowerCase() === most.toLowerCase();
  //     const color = isMost ? 'yellow' : 'lightblue';
  //     const style = isMost ? 'font-weight: bold;' : '';
  //     return `<span style="background-color: ${color}; ${style}">${match}</span>`;
  //   });
  // }

  stripHtml(html: string): string {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || '';
  }

  clearText() {
    this.textCollection = '';
    this.charCount = 0;
    this.wordCount = 0;
    this.sentencesCount = 0;
    this.showText = '';
    this.safeHtml = '';
  }
}