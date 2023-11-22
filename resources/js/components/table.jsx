export default function Table({ className, children }) {
    return (
        <table
            className={`${className} table-fixed mt-8 text-center mx-4 w-[calc(100%-2rem)] text-text`}
        >
            {children}
        </table>
    );
}
