export default function EmptyState({ title, message, children }) {
    return (
        <div>
            {title ? <h2>{title}</h2> : null}
            {message ? <p>{message}</p> : null}
            {children}
        </div>
    );
}
