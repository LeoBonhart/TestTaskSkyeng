import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SameWordService {

  arr = ['kot', 'tok', 'okt'];
  arr1 = ['kot', 'tok', 'ott'];

  str = '(({}){()}[][])';

  constructor() { }

  sameWord(arr: Array<string>): boolean {
    for (let index = 0; index < arr.length - 1; index++) {
      const word = arr[index];
      const nextWord = arr[index + 1];
      if (nextWord.length !== word.length || this.getWordSize(word) !== this.getWordSize(nextWord)) {
        return false;
      }
    }
    return true;
  }

  getWordSize(word: string): number {
    return word.split('').reduce((reducer, char) => reducer += char.charCodeAt(0), 0);
  }

  isClosed(str: string) {
    while (str.length > 0) {
      switch (str[0]) {
        case '(':
          if (this.closeChar(')', str, x => str = x)) {
            return false;
          }
          break;
        case '{':
          if (this.closeChar('}', str, x => str = x)) {
            return false;
          }
          break;
        case '[':
          if (this.closeChar(']', str, x => str = x)) {
            return false;
          }
          break;
        default:
          return false;
      }
    }
    return true;
  }

  closeChar(end: string, str: string, has: (str: string) => void): boolean {
    if (str.indexOf(end) !== -1) {
      has(str.slice(1).replace(end, ''));
      return false;
    } else {
      return true;
    }
  }
}
