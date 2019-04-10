class TokenBuffer {
    constructor(onTokenReady) {
        this.tokens = [];
        this.current = "";
        this.onTokenReady = onTokenReady;
    }

    pushChar(c) {
        this.current += c;
    }

    pushToken(token) {
        this.endCurrentToken();
        this.tokens.push(token);
    }

    endCurrentToken() {
        if (this.current.length > 0) {
            this.tokens.push(this.onTokenReady(this.current));
            this.current = "";
        }
    }
}