module.exports = {
    splitBy: symbol => value => {
        if (typeof value !== 'string') {
            return value;
        } else {
            return value.split(symbol).map(value => value.trim());
        }
    }
};