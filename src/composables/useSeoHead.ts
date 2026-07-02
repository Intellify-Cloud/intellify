interface SeoHeadOptions {
  title?: string;
  description?: string;
  path?: string;
}

export function useSeoHead({ title, description, path }: SeoHeadOptions = {}) {
  const siteTitle = "Intellify";
  const siteOrigin = "https://intellify.co.za";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const canonicalUrl = `${siteOrigin}${path || "/"}`;

  document.title = fullTitle;

  const setMeta = (selector: string, value: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      const [attr, val] = selector.replace(/[\[\]']/g, "").split("=");
      el.setAttribute(attr ?? "", val ?? "");
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  };

  setMeta(`[name='description']`, description || "");
  setMeta(`[property='og:title']`, fullTitle);
  setMeta(`[property='og:description']`, description || "");
  setMeta(`[property='og:url']`, canonicalUrl);

  let canonical = document.querySelector(`link[rel='canonical']`);
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", canonicalUrl);
}
