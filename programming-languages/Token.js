class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }

    is(type, value=false) {
        return (this.type === type && (!value || this.value === value));
    }

    ensure(type, value=false) {
        if ( !this.is(type, value)) {
            let expected = type;
            let actual = this.type;
            if (value) {
                expected += ` with value '${value}'`;
                actual += ` with value '${this.value}'`;
            }
            throw new Error(`Parse error: expected a ${expected} but got a ${actual}.`);
        }
    }
}

module.exports = Token;