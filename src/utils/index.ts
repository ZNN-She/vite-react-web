/**
 * json url参数 params.get('name')
 * @param url 默认当前网页地址
 * @returns URLSearchParams
 */
function urlSearchParams(urlStr?: string): URLSearchParams {
  const url = new URL(urlStr || window.location.href);
  const params = new URLSearchParams(url.search);
  return params;
}

export default {
  urlSearchParams,
};
