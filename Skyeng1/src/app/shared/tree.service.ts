import { Injectable } from '@angular/core';

interface ITree {
  valueNode: number;
  next: Array<ITree>;
}

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  tree: ITree = {
    valueNode: 3,
    next: [
      {
        valueNode: 1,
        next: null
      },
      {
        valueNode: 3,
        next: null
      },
      {
        valueNode: 2,
        next: null
      },
      {
        valueNode: 2,
        next: [
          {
            valueNode: 1,
            next: null
          },
          {
            valueNode: 5,
            next: null
          }
        ]
      }
    ]
  };

  constructor() { }

  getSum(tree: ITree) {
    let summ = 0;
    summ += tree.valueNode;
    if (tree.next && tree.next.length > 0) {
      for (const next of tree.next) {
        summ += this.getSum(next);
      }
    }
    return summ;
  }

  getSum2(tree: ITree) {
    const arr = [tree];
    let sum = 0;
    let current: ITree;
    while (arr.length > 0) {
      current = arr.shift();
      sum += current.valueNode;

      if (current.next != null) {
        for (const next of current.next) {
          arr.push(next);
        }
      }
    }
    return sum;
  }

}
