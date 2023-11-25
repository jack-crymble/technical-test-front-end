export default function Dropdown({ label, options = [], onChange = () => {} }) {
    return (
        <>
            <label htmlFor="dropdown">{label}</label>

            <select
                className=" p-2 rounded-lg text-center bg-primary text-secondary"
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
