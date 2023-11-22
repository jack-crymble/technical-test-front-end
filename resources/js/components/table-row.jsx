export default function TableRow({ cells = [] }) {
    return (
        <tr className=" hover:bg-primary hover:text-background">
            {cells.map((cell, index) => (
                <td className="pb-2" key={index}>
                    {cell}
                </td>
            ))}
        </tr>
    );
}
