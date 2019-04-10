function fib(n) {
    let a = 1;
    let b = 1;

    while (n > 0) {
        let temp = a;
        a = a + b;
        b = a;
    }

    return a;
}

fib(10);