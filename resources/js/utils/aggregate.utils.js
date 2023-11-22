export function average(values = []) {
    return sum(values) / Math.max(values.length, 1);
}

export function sum(values = []) {
    return values.reduce(
        (previous, current) => parseInt(previous) + parseInt(current),
        0
    );
}
