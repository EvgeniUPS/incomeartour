const url = ''
const reqId = ''

const getData = async (typeData = 'country', perPage = '', reqId) => {
  if (reqId) {
    url = `http://localhost:3002/${typeData}/${reqId}`
  } else if (perPage) {
    url = `http://localhost:3002/${typeData}?_limit=${perPage}`
  } else {
    url = `http://localhost:3002/${typeData}`
  }
  // console.log(url)

  let response = await fetch(url)

  if (response.ok) {
    let json = await response.json()
    // renderData(json)
    // renderCountry(json)
    // getValue(json)
    console.log(json)
  } else {
    console.warn('Ошибка HTTP: ' + response.status)
  }
}
// getData('country', 5)

function sendData(
  country_name = 'Украина',
  country_code = 'UA',
  city = 'Одесса',
  flagUrl = 'http://localhost:3000/img/countries/europe/ukraine.svg'
) {
  let _data = {
    id: Date.now(),
    country_name,
    country_code,
    city,
    flagUrl,
  }
  const id = Date.now()
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
// sendData('Украина','UA','Одесса')

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

const coutryPopupTemplate = `          
 <li>
  <a href="#">
    <img src="./img/countries/europe/andorra.svg" alt="" />
    <span>Уругвай</span>
  </a>
 </li>
`

// function renderCountry(data) {
//   const upsTest = document.querySelector('.ups-test')
//   const list = `<ul class="popup-country__list"></ul>`

//   const countryList = document.createElement('ul')
//   countryList.classList.add('popup-country__list')
//   countryList.innerHTML = '1111'
//   console.log(`countryList`, countryList)
//   upsTest.insertAdjacentHTML('afterbegin', countryList)

//   // const temp = data.forEach(element => {
//   //   const coutryPopupTemplate = `
//   //  <li>
//   //   <a href="/country/${element.id}">
//   //     <img src="${element.flagUrl}" alt="" />
//   //     <span>${element.country_name}</span>
//   //   </a>
//   //  </li>
//   // `
//   //   element
//   //   countryList.insertAdjacentHTML('beforeend', coutryPopupTemplate)
//   // })
//   // console.log(`temp`, temp)
// }

// renderCountry()
