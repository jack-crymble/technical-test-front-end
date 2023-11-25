export default function Card({ children, className = "", onClick = () => {} }) {
    return (
        <div
            className={`${className} flex-grow rounded-xl bg-secondary`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
