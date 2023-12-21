const newsArticles = document.querySelector('#news-articles')

async function fetchNews() {
  try {
    const response = await fetch('https://newsdata.io/api/1/news?apikey=pub_34927f12c1b52f2b9034b57ca66ebc53a31a6&q=cryptocurrency&language=en&image=1&full_content=1')
    const data = await response.json()
    const shuffledArray = shuffle(data.results)
  
    renderArticles(shuffledArray.slice(0, 6))
  } catch (error) {
    newsArticles.textContent = 'There are too many requests. Try again later.'
  }
}

function renderArticles(articlesArray) {
  let html = ''

  articlesArray.forEach(article => {
    const { creator, pubDate, image_url, title, description, link, source_id } = article

    const author = creator && creator.length ? creator[0] : 'Unknown'

    const apiDate = new Date(pubDate)
    const year = apiDate.getFullYear()
    const month = apiDate.getMonth() + 1
    const day = apiDate.getDate()

    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`

    html += `
      <article aria-labelledby="${source_id}" class="article news__article">
        <div class="article__info">
          <dl>
            <dt>Author:</dt>
            <dd>${author}</dd>
          </dl>
          <time datetime="${formattedDate}">${formattedDate}</time>
        </div>
        <div class="article__img-wrapper"><img src="${image_url}" alt="${title}" class="article__img"></div>
        <div class="article__content">
          <h2 id="${source_id}" class="article__title">${title}</h2>
          <p class="article__description">
            ${description}
          </p>
          <a href="${link}" data-id="${source_id}" target="_blank" class="article__more">Learn more</a>
        </div>
      </article>`
  })

  newsArticles.innerHTML = html
}

document.querySelector('#reload').addEventListener('click', fetchNews)

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.addEventListener('load', fetchNews)
