import { Link, useParams } from "react-router-dom";
import { getArtwork } from "../api/artworks.js";
import { useApi } from "../hooks/useApi.js";
import { ImageSize, PLACEHOLDER_IMAGE, buildImageUrl } from "../api/iiif.js";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage.jsx";
import Loader from "../components/Loader/Loader.jsx";

export default function ArtworkDetailPage() {
    const { id } = useParams();
    const { data, loading, error, refetch } = useApi(() => getArtwork(id), [id]);

    if (loading) return <Loader label="Loading artwork" />;
    if (error) return <ErrorMessage error={error} onRetry={refetch} />;
    if (!data) return null;

    const artwork = data.data;
    const iiifBase = data.config.iiif_url;
    const imageUrl = artwork.image_id
        ? buildImageUrl(artwork.image_id, ImageSize.Detail, iiifBase)
        : PLACEHOLDER_IMAGE;
    const altText = artwork.thumbnail ? artwork.thumbnail.alt_text : artwork.title;

    return (
        <div>
            <Link to="/">Back to artworks</Link>

            <div>
                <img
                    src={imageUrl}
                    alt={altText}
                />
            </div>

            <div>
                <div>
                    <h1>{artwork.title}</h1>
                    <div>
                        {artwork.artist_id && artwork.artist_title ? (
                            <Link to={`/artists/${artwork.artist_id}`}>
                                {artwork.artist_title}
                            </Link>
                        ) : artwork.artist_title ? (
                            <span>{artwork.artist_title}</span>
                        ) : null}
                        {artwork.date_display ? (
                            <span>· {artwork.date_display}</span>
                        ) : null}
                    </div>
                </div>

                {artwork.is_public_domain ? <span>Public domain</span> : null}

                <div>
                    {artwork.artist_display ? (
                        <div>
                            <strong>Artist:</strong> {artwork.artist_display}
                        </div>
                    ) : null}
                    {artwork.date_display ? (
                        <div>
                            <strong>Date:</strong> {artwork.date_display}
                        </div>
                    ) : null}
                    {artwork.place_of_origin ? (
                        <div>
                            <strong>Origin:</strong> {artwork.place_of_origin}
                        </div>
                    ) : null}
                    {artwork.medium_display ? (
                        <div>
                            <strong>Medium:</strong> {artwork.medium_display}
                        </div>
                    ) : null}
                    {artwork.dimensions ? (
                        <div>
                            <strong>Dimensions:</strong> {artwork.dimensions}
                        </div>
                    ) : null}
                    {artwork.credit_line ? (
                        <div>
                            <strong>Credit line:</strong> {artwork.credit_line}
                        </div>
                    ) : null}
                    {artwork.department_title ? (
                        <div>
                            <strong>Department:</strong> {artwork.department_title}
                        </div>
                    ) : null}
                </div>

                {artwork.description ? (
                    <div dangerouslySetInnerHTML={{ __html: artwork.description }} />
                ) : null}
            </div>
        </div>
    );
}