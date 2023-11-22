import TableRow from "./table-row";

export default function TableBody({ rows = [] }) {
    return (
        <tbody>
            {rows.map((row, index) => (
                <TableRow key={index} cells={row} />
            ))}
        </tbody>
    );
}
