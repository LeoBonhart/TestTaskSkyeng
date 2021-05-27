import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PalindromService {

  constructor() { }

  isPalindrom(str: string) {
    return str.toLowerCase().replace(/[^а-яА-ЯёЁ]/g, '') === str.toLowerCase().replace(/[^а-яА-ЯёЁ]/g, '').split('').reverse().join('');
  }

  isPalindro2(str: string) {
    str = str.toLowerCase();
    const lim = str.length - 1;
    let i = 0;
    let j = str.length - 1;

    while (i <= lim) {
        if (/[^а-яА-ЯёЁ]/.test(str[i])) {
            i += 1;
        }
        if (/[^а-яА-ЯёЁ]/.test(str[j])) {
            j -= 1;
        }
        if (str[i] !== str[j]) {
            return false;
        }
        i += 1;
        j -= 1;
    }
    return true;
  }
}
