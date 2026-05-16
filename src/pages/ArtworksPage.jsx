import { useMemo } from "react";
import {
    VAN_GOGH_ARTIST_ID,
    REMBRANDT_ARTIST_ID,
    listArtworksByArtist,
} from "../api/artworks.js";
import { useApi } from "../hooks/useApi.js";
import ArtworkGrid from "../components/ArtworkGrid/ArtworkGrid.jsx";
import EmptyState from "../components/EmptyState/EmptyState.jsx";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../components/Loader/Loader.jsx";

const FETCH_LIMIT = 20;


export default function ArtworksPage() {
    const vanGogh = useApi(() => listArtworksByArtist(VAN_GOGH_ARTIST_ID, FETCH_LIMIT), []);
    const rembrandt = useApi(() => listArtworksByArtist(REMBRANDT_ARTIST_ID, FETCH_LIMIT), []);

    const items = useMemo(() => {
        const a = vanGogh.data ? vanGogh.data.data : [];
        const b = rembrandt.data ? rembrandt.data.data : [];
        return [...a, ...b].sort((x, y) => x.id - y.id);
    }, [vanGogh.data, rembrandt.data]);

    const iiifBase = vanGogh.data ? vanGogh.data.config.iiif_url : undefined;
    const loading = vanGogh.loading || rembrandt.loading;
    const error = vanGogh.error || rembrandt.error;
    const refetch = () => {
        vanGogh.refetch();
        rembrandt.refetch();
    };
    return (
        <div>
            <div >
                <h1 >Van Gogh & Rembrandt</h1>
                <p>
                    A mixed gallery of works by Vincent van Gogh and Rembrandt
                </p>
            </div>
            <div >
                {error ? (
                    <ErrorMessage error={error} onRetry={refetch} />
                ) : loading && items.length === 0 ? (
                    <Loader label="Fetching artworks" />
                ) : items.length === 0 ? (
                    <EmptyState
                        title="No artworks to show"
                        message="The collection appears to be empty right now. Please try again later."
                    />
                ) : (
                    <ArtworkGrid artworks={items} iiifBase={iiifBase} />
                )}
            </div>
        </div>
    );
}