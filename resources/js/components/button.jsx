export default function Button({
    children,
    className = "",
    onClick = () => {},
}) {
    return (
        <button
            className={`${className}  text-primary px-8 py-2 rounded-2xl hover:text-background hover:bg-primary border-primary border-2`}
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    );
}
