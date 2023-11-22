export default function TableHeader({ headers = [] }) {
    return (
        <thead>
            <tr>
                {headers.map((header, index) => (
                    <th className="pb-4" key={index}>
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
