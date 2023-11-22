export default function Dropdown({ label, options = [], onChange = () => {} }) {
    return (
        <>
            <label htmlFor="dropdown">{label}</label>

            <select
                className=" bg-primary text-secondary p-2 rounded-lg text-center"
                name="dropdown"
                onChange={(event) => onChange(event.target.value)}
            >
                <option value="-1">Show all</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </>
    );
}
