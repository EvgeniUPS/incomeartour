const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10'
// const url = 'https://new.eliteukrainerating.com/ajax/get_products/10/'

const getData = async () => {
  let response = await fetch(url)

  if (response.ok) {
    // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.json()

    renderData(json)
  } else {
    alert('Ошибка HTTP: ' + response.status)
  }
}

const renderData = data => {
  const tempQ = document.querySelector('.temp-q')
  data.forEach(element => {
    const html = `  
	<div class="temp-q__item">
    <div class="temp-q__header">${element.title}</div>
    <div class="temp-q__dolgnost">dolgnost</div>
    <div class="temp-q__image">
      <img src="${element.url}" alt="example" />
    </div>
  </div>
`
    tempQ.insertAdjacentHTML('beforeend', html)
  })
}
const testQBtn = document.querySelector('#testQBtn')
// testQBtn.addEventListener('click', getData)
