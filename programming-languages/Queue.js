class Queue {
    constructor(input) {
        if (Array.isArray(input)) {
            this.arr = input;
        } else {
            this.arr = input.split("");
        }
    }

    hasMore() {
        return this.arr.length > 0;
    }

    peek() {
        return this.arr[0];
    }

    consume() {
        return this.arr.shift();
    }
}