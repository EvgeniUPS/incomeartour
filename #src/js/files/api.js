const url = ''
const reqId = ''
const perPage = '2'
const typeData = `country`

const getData = async () => {
  if (reqId) {
    url = `http://localhost:3002/${typeData}/${reqId}`
  } else if (perPage) {
    url = `http://localhost:3002/${typeData}?_limit=${perPage}`
  } else {
    url = `http://localhost:3002/${typeData}`
  }
  console.log(url)

  let response = await fetch(url)

  if (response.ok) {
    // если HTTP-статус в диапазоне 200-299
    // получаем тело ответа (см. про этот метод ниже)
    let json = await response.json()
    // renderData(json)
    console.log(json)
  } else {
    console.warn('Ошибка HTTP: ' + response.status)
  }
}
getData()
let _data = {
  id: Date.now(),
  country_name: 'Brazil',
  country_code: 'BR',
  city: 'Corrego Grande',
}

function sendData() {
  fetch('http://localhost:3002/country', {
    method: 'POST',
    body: JSON.stringify(_data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
}
// sendData()

// const renderData = data => {
//   const tempQ = document.querySelector('.temp-q')
//   data.forEach(element => {
//     const html = `
// 	<div class="temp-q__item">
//     <div class="temp-q__header">${element.title}</div>
//     <div class="temp-q__dolgnost">dolgnost</div>
//     <div class="temp-q__image">
//       <img src="${element.url}" alt="example" />
//     </div>
//   </div>
// `
//     tempQ.insertAdjacentHTML('beforeend', html)
//   })
// }
// const testQBtn = document.querySelector('#testQBtn')
// testQBtn.addEventListener('click', getData)
