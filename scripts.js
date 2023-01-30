/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"wgtfMHeq3j5rYb3V","label":"reddit","bookmarks":[{"id":"ruxYNfBPBpAzRHtx","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"puWjNZmLqJq8VkeB","label":"r/minecraft","url":"https://www.reddit.com/r/minecraft/"},{"id":"ZAeX8oRhYZDwbrXk","label":"r/roblox","url":"https://www.reddit.com/r/roblox/"}]},{"id":"UZA238pgyFnKrnii","label":"design tools","bookmarks":[{"id":"YQO4ICJlQiKhNTxq","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"Xs06hPp7vY5km3xE","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"t19qcQTUUMOGyEwW","label":"haikei","url":"https://app.haikei.app/"},{"id":"SmUm53M0d5RtjQqC","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"tvEZ2Miq2Q6HQV1B","label":"worth reading","bookmarks":[{"id":"zolyAL2gX9oK05DU","label":"westmanga","url":"https://westmanga.info/"},{"id":"pIplJKiZwkdHr5er","label":"komikcast","url":"https://komikcast.net"},{"id":"yTm5nrgXGLddWeTC","label":"manganato","url":"https://manganato.com/index.php"}]},{"id":"sDZHaFI6siL0mkBr","label":"sources","bookmarks":[{"id":"140OGOenIgV60p1q","label":"discord","url":"https://discord.com/app"},{"id":"YNiulcWv0UFu5vR0","label":"spotify","url":"https://open.spotify.com/"},{"id":"nL8563lLiWkdkjEL","label":"youtube","url":"https://youtube.com"},{"id":"tvmv7OWf5h0U5Svs","label":"youtube music","url":"https://music.youtube.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
