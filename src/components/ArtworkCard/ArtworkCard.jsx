import { Link } from "react-router-dom";
import { ImageSize, PLACEHOLDER_IMAGE, buildImageUrl } from "../../api/iiif.js";

export default function ArtworkCard({ artwork, iiifBase }) {
    const imageUrl = artwork.image_id
        ? buildImageUrl(artwork.image_id, ImageSize.Card, iiifBase)
        : PLACEHOLDER_IMAGE;
    const altText = artwork.thumbnail ? artwork.thumbnail.alt_text : artwork.title;
    console.log(artwork);
    return (
        <div className="card">
            <Link to={`/artworks/${artwork.id}`}>
                <div>
                    <img
                        src={imageUrl}
                        alt={altText}
                    />
                </div>
            </Link>
            <div>
                <h3 >
                    <Link to={`/artworks/${artwork.id}`} >
                        {artwork.title}
                    </Link>
                </h3>
                {artwork.artist_title ? (
                    artwork.artist_id ? (
                        <Link
                            to={`/artists/${artwork.artist_id}`}

                        >
                            {artwork.artist_title}
                        </Link>
                    ) : (
                        <p>{artwork.artist_title}</p>
                    )
                ) : null}
                {artwork.date_display ? (
                    <p>{artwork.date_display}</p>
                ) : null}
            </div>
        </div>
    );
}