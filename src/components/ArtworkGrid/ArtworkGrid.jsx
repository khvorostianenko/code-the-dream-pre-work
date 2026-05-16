import ArtworkCard from "../ArtworkCard/ArtworkCard.jsx";

export default function ArtworkGrid({ artworks, iiifBase }) {
    return (
        <div className="grid">
            {artworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} iiifBase={iiifBase} />
            ))}
        </div>
    );
}
