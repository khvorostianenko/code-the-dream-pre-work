import { Link, useParams } from "react-router-dom";
import { getAgent } from "../api/agents.js";
import { listArtworksByArtist } from "../api/artworks.js";
import { useApi } from "../hooks/useApi.js";
import ArtworkGrid from "../components/ArtworkGrid/ArtworkGrid.jsx";
import EmptyState from "../components/EmptyState/EmptyState.jsx";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../components/Loader/Loader.jsx";

export default function ArtistDetailPage() {
    const { id } = useParams();

    const agent = useApi(() => getAgent(id), [id]);
    const works = useApi(() => listArtworksByArtist(id, 8), [id]);

    if (agent.loading) return <Loader label="Loading artist" />;
    if (agent.error)
        return <ErrorMessage error={agent.error} onRetry={agent.refetch} />;
    if (!agent.data) return null;

    const artist = agent.data.data;
    const lifespan = artist.birth_date + " - " + artist.death_date;

    const worksItems = works.data ? works.data.data : [];
    const iiifBase = works.data ? works.data.config.iiif_url : undefined;

    return (
        <div>
            <Link to="/">Back to artworks</Link>

            <div>
                <h1>{artist.title}</h1>
                <p>{lifespan}</p>
                {artist.alt_titles && artist.alt_titles.length > 0 ? (
                    <p>Also known as: {artist.alt_titles.join(", ")}</p>
                ) : null}
            </div>

            {artist.description ? (
                <div dangerouslySetInnerHTML={{ __html: artist.description }} />
            ) : (
                <p>
                    No biography is available for this artist in the public collection.
                </p>
            )}

            <div>
                <div>
                    <h2>Selected works</h2>
                    {works.data ? (
                        <p>
                            Showing {worksItems.length} of{" "}
                            {works.data.pagination.total} matching works
                        </p>
                    ) : null}
                </div>

                {works.loading && worksItems.length === 0 ? (
                    <Loader label="Loading works" />
                ) : works.error ? (
                    <ErrorMessage error={works.error} onRetry={works.refetch} />
                ) : worksItems.length === 0 ? (
                    <EmptyState
                        title="No works to show"
                        message="The collection doesn't have any other works tagged for this artist."
                    />
                ) : (
                    <ArtworkGrid artworks={worksItems} iiifBase={iiifBase} />
                )}
            </div>
        </div>
    );
}
