import { fetchJson } from "./client.js";

export const VAN_GOGH_ARTIST_ID = 40610;
export const REMBRANDT_ARTIST_ID = 40769;

const LIST_FIELDS = "id,title,image_id,thumbnail,artist_title,date_display,artist_id";

const DETAIL_FIELDS = "id,title,image_id,thumbnail,artist_id,artist_title,artist_display,date_display,medium_display," +
    "dimensions,credit_line,place_of_origin,description,is_public_domain,department_title";

export function getArtwork(id) {
    return fetchJson(`/artworks/${id}`, {
        params: { fields: DETAIL_FIELDS },
    });
}

export function listArtworksByArtist(artistId, limit) {
    return fetchJson("/artworks/search", {
        params: {
            "query[term][artist_id]": artistId,
            limit,
            fields: LIST_FIELDS,
        },
    });
}
