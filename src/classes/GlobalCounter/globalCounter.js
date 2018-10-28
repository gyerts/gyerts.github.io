class GlobalCounter {
  counter = 0;

  reset = () => {
    this.counter = 0;
  };

  getNext() {
    return this.counter++;
  }
}

export const counter = new GlobalCounter();
