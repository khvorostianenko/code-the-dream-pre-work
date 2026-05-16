export default function ErrorMessage({ error, onRetry }) {
    return (
        <div>
            <h2>Something went wrong</h2>
            <p>{error.message}</p>
            {onRetry && (
                <button type="button" onClick={onRetry}>
                    Try again
                </button>
            )}
        </div>
    );
}
