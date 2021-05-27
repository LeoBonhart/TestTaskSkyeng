import { Injectable } from '@angular/core';

interface IDate{
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class SortDateService {

  arr: Array<IDate> = [{date: '10.01.2017'}, {date: '05.11.2016'}, {date: '21.13.2002'}];

  constructor() {
  }

  private setDateUnix(format: string, date: string): number {
    const regDay = new RegExp(format// регулярка для вытягивания дня
            .replace(/mm/, '[0-9]{2}')
            .replace(/m/, '[0-9]{1}')
            .replace(/dd/, '([0-9]{2})')
            .replace(/d/, '([0-9]{1})')
            .replace(/yyyy/, '[0-9]{4}')
            .replace(/yy/, '[0-9]{2}')
        );
    const regMonth = new RegExp(format// регулярка для вытягвания месца
            .replace(/mm/, '([0-9]{2})')
            .replace(/m/, '([0-9]{1})')
            .replace(/dd/, '[0-9]{2}')
            .replace(/d/, '[0-9]{1}')
            .replace(/yyyy/, '[0-9]{4}')
            .replace(/yy/, '[0-9]{2}')
        );
    const regYear = new RegExp(format// регулярка для вытягивания года
            .replace(/mm/, '[0-9]{2}')
            .replace(/m/, '[0-9]{1}')
            .replace(/dd/, '[0-9]{2}')
            .replace(/d/, '[0-9]{1}')
            .replace(/yyyy/, '([0-9]{4})')
            .replace(/yy/, '([0-9]{2})')
        );
    let day: string;
    let month: string;
    let year: string;
    try {
        day = date.match(regDay)[1];
        month = date.match(regMonth)[1];
        year = date.match(regYear)[1];
        year = year.length === 2 ? '20' + year : year;
    } catch (e) {
        return null;
    }
    return new Date(Number(year), Number(month), Number(day)).getTime();
  }

  sortDate(arr: Array<IDate>, format: string = 'dd.mm.yyyy', desc: boolean = true) {
    const getTime = (date: IDate) => {
      const time = this.setDateUnix(format, date.date);
      return desc ? time : -time;
    };
    arr.sort((a, b) => getTime(a) - getTime(b));
  }

}
