/* eslint-disable @typescript-eslint/no-var-requires */
const visit = require('unist-util-visit');
const ogs = require('open-graph-scraper');

const { DEFAULT_OPTION } = require('./constants');

const getHTML = (ogData) => {
  const { ogTitle, ogDescription, ogImage, requestUrl } = ogData;
  const ogImageSrc = ogImage.url;
  const ogImageAlt = ogTitle;
  const origin = new URL(requestUrl).origin;
  const faviconSrc = `https://www.google.com/s2/favicons?domain=${origin}&sz=128`;

  return `
    <div class="embed-card-container">
      <a href="${requestUrl}" target="_blank" rel="noopener noreferrer" class="embed-card-link">
        <div class="embed-card-main">
          <div class="embed-card-title">${ogTitle}</div>
          <div class="embed-card-description">${ogDescription}</div>
          <div class="embed-card-meta">
            <img class="embed-card-favicon" src="${faviconSrc}" alt="${ogTitle}"/>
            <div class="embed-card-url">${requestUrl}</div>
          </div>
        </div>
        ${
          !ogImageSrc
            ? ``
            : `
              <div class="embed-card-thumbnail">
                <img class="embed-card-thumbnail-image" alt="${ogImageAlt}" src="${ogImageSrc}" />
              </div>
              `
        }
      </a>
    </div>
  `.trim();
};

const fallbackHTML = (url) => {
  return `
    <a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>
  `.trim();
};

const isValidCondition = (node, delimiter) => {
  if (node.type === 'link' && node.title === null && node.url) {
    return (
      node.children[0] &&
      node.children[0].type === 'text' &&
      node.children[0].value === delimiter
    );
  }
};

const getUrlString = (url) => {
  const urlString = url.startsWith('http') ? url : `https://${url}`;
  return new URL(urlString).toString();
};

module.exports = async ({ cache, markdownAST }, pluginOption) => {
  const options = { ...DEFAULT_OPTION, ...pluginOption };
  const { delimiter, timeout } = options;

  const targets = [];

  visit(markdownAST, 'paragraph', async (paragraphNode) => {
    if (paragraphNode.children.length !== 1) {
      return;
    }

    const [node] = paragraphNode.children;

    if (!isValidCondition(node, delimiter)) {
      return;
    }

    const { url, value = url } = node;
    const urlString = getUrlString(value);

    targets.push(async () => {
      try {
        let html = await cache.get(urlString);

        node.type = `html`;
        node.children = undefined;

        if (!html) {
          const { result } = await ogs({
            url: urlString,
            timeout: timeout,
          });

          if (!result.success) {
            node.value = fallbackHTML(urlString);
            return;
          }
          html = getHTML(result);
          await cache.set(urlString, html);
        }

        node.value = html;
      } catch (err) {
        console.log('error!!');
        node.value = fallbackHTML(urlString);
      }
    });
  });

  await Promise.all(targets.map((t) => t()));
  return markdownAST;
};
