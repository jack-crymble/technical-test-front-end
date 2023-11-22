export default function NumberDisplayAverage({ values = [] }) {
    const average =
        values.reduce(
            (previous, current) => parseInt(previous) + parseInt(current),
            0
        ) / Math.max(values.length, 1);

    return <p className="text-4xl">{average}</p>;
}
