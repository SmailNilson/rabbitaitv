import { getImageProps } from "next/image";
import imageManifest from "@/data/imageManifest.json";

const manifest: Record<string, { width: number; height: number; blur: string } | undefined> = imageManifest;

const ARTICLE_IMAGE_SIZES = "(max-width: 820px) 100vw, 760px";

const escapeAttribute = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

// Props for <Image>: shows a blurred preview until the real file arrives.
export function blurPlaceholder(src: string) {
    const entry = manifest[src];
    return entry ? { placeholder: "blur" as const, blurDataURL: entry.blur } : {};
}

// HTML for an image inside an article's Markdown. Article bodies are injected as
// raw HTML, so this goes through the image optimizer by hand: the original files
// are up to 8 times heavier. Width and height reserve the space, so the text
// does not jump when the image arrives.
export function articleImageHtml(src: string, alt: string): string {
    const entry = manifest[src];
    if (!entry) {
        return `<img src="${src}" alt="${escapeAttribute(alt)}" class="content-image" loading="lazy" />`;
    }
    const { props } = getImageProps({ src, alt, width: entry.width, height: entry.height, sizes: ARTICLE_IMAGE_SIZES });
    return `<img src="${escapeAttribute(props.src)}" srcset="${escapeAttribute(props.srcSet ?? "")}" sizes="${ARTICLE_IMAGE_SIZES}" width="${entry.width}" height="${entry.height}" alt="${escapeAttribute(alt)}" class="content-image" loading="lazy" decoding="async" style="background: center / cover url(${entry.blur})" />`;
}
