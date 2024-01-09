// API地址
const API = 'https://example.com';

let api = API;
if (api.endsWith('/')) api = api.substring(0, api.length - 1);

async function handleRequest(request, pathname, searchParams) {
  if (pathname.startsWith("/")) pathname = pathname.substring(1);

  if (pathname.startsWith("s/")) {
    let code = pathname.substring(2);
    let response = await getShareDetails(request, searchParams, code);
    let json = await response.json();
    if (json.code == 0) {
      return Response.redirect(api + json.data, 302);
    } else {
      return new Response(null, {status: 404});
    }
  }

  if (pathname.startsWith("url/")) {
    let code = pathname.substring(4);
    return await getShareDetails(request, searchParams, code);
  }

  return new Response("{}");
}

async function getShareDetails(request, searchParams, code) {
  const apiUrl = new URL(api);
  apiUrl.pathname = "api/v3/share/download/" + code;

  for (const [key, value] of searchParams) {
    apiUrl.searchParams.append(key, value);
  }
  if (!apiUrl.searchParams.has("path")) {
    apiUrl.searchParams.append("path", "undefined/undefined")
  }
  request = new Request(apiUrl, request);
  request.headers.set('Origin', api);
  request.headers.set('Referer', api + 's/' + code);
  request.headers.set('Accept', 'application/json, text/plain, */*');
  return await fetch(request, { method: 'PUT' });
}
 
addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  const pathname = url.pathname;
  const searchParams = url.searchParams;
  return event.respondWith(handleRequest(request, pathname, searchParams));
});
