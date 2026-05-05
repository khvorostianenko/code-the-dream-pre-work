import {useParams} from "react-router-dom";

export default function ArtworkDtailPage() {
    const {id} = useParams();

    return (
        <section>
            <h1>Artwork {id}</h1>
            <p>Details ...</p>
        </section>
    )
}

