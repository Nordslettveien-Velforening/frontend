import { SanityReference } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { cdnClient } from "../../integrations/sanityClient";

const builder = imageUrlBuilder(cdnClient)

export function imgUrl(sanityImgRef: SanityReference) {
    return builder.image(sanityImgRef);
}
