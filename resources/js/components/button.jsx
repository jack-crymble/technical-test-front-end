export default function Button({
    children,
    className = "",
    onClick = () => {},
}) {
    return (
        <button
            className={`${className}  px-8 py-2 rounded-xl border-2 text-primary hover:text-background hover:bg-primary border-primary`}
            onClick={onClick}
            type="button"
        >
            {children}
        </button>
    );
}
