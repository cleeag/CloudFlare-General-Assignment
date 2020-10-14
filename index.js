const links = [
  {"name":"google", "url":"https://www.google.com/"},
  {"name":"cnn", "url":"https://www.cnn.com/"},
  {"name":"youtube", "url":"https://www.youtube.com/"}
]
const json = JSON.stringify(links);

const socialLinks = [
  {"name":"facebook", "url":"https://www.facebook.com/", "svg":"https://simpleicons.org/icons/facebook.svg"},
  {"name":"slack", "url":"https://www.slack.com/", "svg":"https://simpleicons.org/icons/slack.svg"},
  
]

class LinksTransformer {
  constructor(links) {
    this.links = links
  }
  
  async element(element) {
    const transformedLinks = this.links.map(
        (link) => `<a href=${link.url}>${link.name}</a>`
      )
      .join('')
    element.setInnerContent(transformedLinks, {html:true})
  }
}

class profileTransformer {
  async element(element) {
    element.setAttribute("style", "")
  }
}

class avatarTransformer {
  async element(element) {
    element.setAttribute('src', "http://github.com/cleeag.png")
  }
}

class nameTransformer {
  async element(element) {
    element.setInnerContent("Chin Lee")
  }
}

class socialTransformer {
  constructor(links) {
    this.links = links
  }

  async element(element) {
    element.setAttribute("style", "")
    const transformedLinks = this.links.map(
        (link) => `<a href=${link.url}>${link.name}<img src=${link.svg}></a>`
      )
      .join('')
    element.setInnerContent(transformedLinks, {html:true})
  }
}

class titleTransformer {
  async element(element) {
    element.setInnerContent("Cloudflare Assignment")
  }
}

class bodyTransformer {
  async element(element) {
    element.setAttribute('style', 'background: orange',)
  }
}

const rewriter = new HTMLRewriter()
    .on('div#links', new LinksTransformer(links))
    .on('div#profile', new profileTransformer())
    .on('img#avatar', new avatarTransformer())
    .on('h1#name', new nameTransformer())
    .on('div#social', new socialTransformer(socialLinks))
    .on('title', new titleTransformer())
    .on('body', new bodyTransformer())





async function htmlRewriterHandler(){
  const staticLink = "https://static-links-page.signalnerve.workers.dev";
  const res = await fetch(staticLink);
  return await rewriter.transform(res)
}


async function handleRequest(request) {
  if (request.url.endsWith('/links')){
    return new Response(json, { headers: {  "content-type": "application/json" } })
  } else {
    return await htmlRewriterHandler();
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})