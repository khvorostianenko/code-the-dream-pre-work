const FALLBACK_IIIF_BASE = "https://www.artic.edu/iiif/2";

export const PLACEHOLDER_IMAGE = "/placeholder.svg";

export const ImageSize = {
    Thumb: 200,
    Card: 400,
    Detail: 843,
};

export function buildImageUrl(imageId, size = ImageSize.Card, iiifBase) {
    if (!imageId) return PLACEHOLDER_IMAGE;
    const base = iiifBase ?? FALLBACK_IIIF_BASE;
    return `${base}/${imageId}/full/${size},/0/default.jpg`;
}