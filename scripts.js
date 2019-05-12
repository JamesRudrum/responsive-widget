const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

var request = new XMLHttpRequest()

request.open('GET', 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init', true)

request.onload = function () {
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400){
    data.list.forEach(item => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      item.name = item.name.substring(0, 50)
      const heading = document.createElement('h1').textContent = `${item.name}...`

      const a = document.createElement('a')
      a.href = item.url
      a.innerHTML = "<h1>" + heading + "</h1>"

      const image = document.createElement('img')
      image.src = item.thumbnail[0].url

      const b = document.createElement('a')
      b.href = item.url
      b.innerHTML = "<img src=" + image.src + ">"

      const para1 = document.createElement('p').textContent = item.branding

      const c = document.createElement('a')
      c.href = item.url
      c.innerHTML = "<p>" + para1 + "</p>"

      const para2 = document.createElement('p2')
      para2.textContent = item.categories

      container.appendChild(card)

      card.appendChild(a)
      card.appendChild(b)
      card.appendChild(c)
      card.appendChild(para2)
    })
  } else {
  const errorMessage = document.createElement('h1')
  errorMessage.textContent = 'It is not working'

  app.appendChild(errorMessage)
  }
}

request.send()
