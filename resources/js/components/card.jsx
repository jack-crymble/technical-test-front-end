export default function Card({ children, className = "", onClick = () => {} }) {
    return (
        <div
            className={`${className} bg-secondary rounded-2xl flex-grow`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
