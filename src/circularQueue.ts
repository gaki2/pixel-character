export default class CircularQueue<Type> {
  list: Type[];
  nowIdx: number;
  lastIdx: number;

  constructor(list: Type[]) {
    this.list = list;
    this.nowIdx = 0;
  }

  now() {
    return this.list[this.nowIdx];
  }

  next() {
    if (this.list.length === 0) {
      return undefined;
    }
    if (this.nowIdx === this.list.length - 1) {
      this.nowIdx = 0;
    } else {
      this.nowIdx += 1;
    }
    return this.list[this.nowIdx];
  }
}
