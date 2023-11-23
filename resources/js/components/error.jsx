export default function Error({ className }) {
    return (
        <div className={`${className} flex justify-center items-center`}>
            <p>Oops... Something went wrong</p>
        </div>
    );
}
