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
        if (!this.hasMore()) {
            throw new Error("Empty queue, cannot peek.")
        }
        return this.arr[0];
    }

    consume() {
        if (!this.hasMore()) {
            throw new Error("Empty queue, cannot consume.")
        }
        return this.arr.shift();
    }
}

module.exports = Queue;