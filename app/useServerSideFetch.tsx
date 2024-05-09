import { useState, useEffect } from 'react';

function useServerSideFetch<T>(): { data: T | null, error: string | null, loading: boolean } {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/connection');
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                const json = await res.json();
                setData(json);
            } catch (e :any) {
                setError(e.toString());
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, ['http://localhost:3000/api/connection']); // Re-fetch if URL changes

    return { data, error, loading };
}

export default useServerSideFetch;
