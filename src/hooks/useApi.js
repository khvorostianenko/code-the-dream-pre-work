import { useEffect, useState } from "react";

export function useApi(fetcher, deps) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function load() {
        setLoading(true);
        setError(null);
        fetcher()
            .then((res) => {
                setData(res);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }

    useEffect(() => {
        load();
    }, deps);

    return { data, loading, error, refetch: load };
}
