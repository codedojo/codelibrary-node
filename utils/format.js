function split(value) {
    if (typeof value !== 'string') {
        return value;
    } else {
        return value.split(',').map(value => value.trim());
    }
}