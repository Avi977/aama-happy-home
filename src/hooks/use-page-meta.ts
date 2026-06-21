import { useEffect } from 'react';

const ORIGIN = 'https://aamadaycare.com';

interface PageMeta {
  /** Document <title> for this route */
  title: string;
  /** Meta description for this route */
  description: string;
  /** Route path, e.g. '/' or '/schedule' — used for canonical + og:url */
  path?: string;
}

function setAttr(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Set per-page title / description / canonical / OG + Twitter tags.
 * Updates the tags already present in index.html so each route has its own
 * SEO metadata. react-snap captures the result into each prerendered page.
 */
export function usePageMeta({ title, description, path = '/' }: PageMeta) {
  useEffect(() => {
    const url = `${ORIGIN}${path}`;
    document.title = title;
    setAttr('meta[name="description"]', 'content', description);
    setAttr('meta[property="og:title"]', 'content', title);
    setAttr('meta[property="og:description"]', 'content', description);
    setAttr('meta[property="og:url"]', 'content', url);
    setAttr('meta[name="twitter:title"]', 'content', title);
    setAttr('meta[name="twitter:description"]', 'content', description);
    setAttr('link[rel="canonical"]', 'href', url);
  }, [title, description, path]);
}
