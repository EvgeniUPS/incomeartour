const html = document.querySelector('html')

const preloader = document.querySelector('.preloader')
const body = document.querySelector('body')
document.addEventListener('DOMContentLoaded', () => {
  // body.classList.remove('_lock')
  preloader.remove()
})

const changeViewButton = document.querySelector('#changeViewButton')
const itemTour = document.querySelectorAll('.item-tour')
const itemList = document.querySelector('.tour-list')
const changeViewHandler = e => {
  itemList.classList.toggle('tour-list_list')
  itemList.classList.toggle('tour-list_grid')

  itemTour.forEach(item => {
    item.classList.toggle('item-tour_list')
    item.classList.toggle('item-tour_grid')
  })

  if (changeViewButton.classList.contains('icon-grid-handler')) {
    changeViewButton.classList.remove('icon-grid-handler')
    changeViewButton.classList.add('icon-list-handler')
  } else {
    changeViewButton.classList.remove('icon-list-handler')
    changeViewButton.classList.add('icon-grid-handler')
  }
}
// if (changeViewButton) {
//   changeViewButton.addEventListener('click', changeViewHandler)
// }

tippy('.tooltip-link', {
  duration: 0,
  animation: 'fade',
})
tippy('.tooltip-link-click', {
  duration: 0,
  animation: 'fade',
  trigger: 'click',
  theme: 'tippyBlue',
})

// Scroll to top
let scrollTopBtn = document.querySelector('.scroll-top')
//
function showBtn() {
  if (window.pageYOffset > 200) {
    scrollTopBtn.style.opacity = '1'
  } else {
    scrollTopBtn.style.opacity = '0'
  }
}
//
scrollTopBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // плавно
  })
}
// When scrolling, we run the function
window.onscroll = showBtn

/* **************************************** */

const searchBtn = document.querySelector('.search-form__button button')
const searchForm = function (params) {
  const searchInput = document.querySelector('.search-form__direction select')
}

const searchFormDirection = document.querySelector('.search-form__direction select')

// searchFormDirection.addEventListener('change', e => {})

// searchBtn.addEventListener('click', searchForm)

const subMenuLink = document.querySelectorAll('.has-submenu')

/* ******************** */
// const  acc = document.getElementsByClassName('accordion')
const acc = document.querySelectorAll('.has-submenu .menu__link')
var i

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('_active')
    const panel = this.nextElementSibling

    if (panel.style.display === 'block') {
      panel.style.display = 'none'
    } else {
      panel.style.display = 'block'
    }
  })
}

function inspectHtml() {
  document.addEventListener('click', function (e) {
    e.stopPropagation()

    let classes = e.target.className

    const textToCopy = classes
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        if (textToCopy) {
          console.info(textToCopy)
        } else {
          console.warn('No className')
        }
      })
      .catch(error => {
        alert(`Copy failed! ${error}`)
      })
  })
}
// inspectHtml()

Fancybox.bind('[data-fancybox]', {
  // infinite: false,
  // animated: false,
  l10n: {
    CLOSE: 'Закрыть',
    NEXT: 'Вперед',
    PREV: 'Назад',
    IFRAME_ERROR: 'Error Loading Page',
  },
})

if (document.querySelector('.slider-add-exc')) {
  const sliderAddExc = document.querySelector('.slider-add-exc')

  sliderAddExc.addEventListener('click', function (e) {
    let targetItem = e.target

    if (targetItem.closest('.slider-add-exc__more')) {
      // console.log(targetItem.nextElementSibling)
      targetItem.nextElementSibling.classList.add('_active')
      targetItem.parentNode.childNodes[3].classList.add('_active')
      targetItem.parentNode.childNodes[5].classList.add('_active')
      // targetItem.closest('.slider-add-exc__descr').classList.toggle('_active')
      // console.log(sliderAddExc.closest('.descr-add-exc'))
    }
    if (targetItem.closest('._close')) {
      let parentContainer = targetItem.parentNode.parentNode
      targetItem.parentNode.classList.remove('_active')

      // console.log(parentContainer.childNodes['slider-add-exc__label'])

      parentContainer.childNodes[3].classList.remove('_active')
      parentContainer.childNodes[5].classList.remove('_active')
    }
  })
}

const headerColorPicker = document.querySelector('.header-color-picker')
const topHeader = document.querySelector('.top-header')
if (headerColorPicker) {
  headerColorPicker.addEventListener('change', function (e) {
    console.log(e.target.value)
    console.log(`topHeader`, topHeader)
    topHeader.setAttribute('style', `background-color: ${e.target.value}`)
  })
}

if (document.querySelector('.simple-rating')) {
  const simpleRatingWrapper = document.querySelector('.simple-rating')
  const simpleRatingBottom = document.querySelector('.simple-rating__bottom')

  simpleRatingWrapper.addEventListener('click', function (e) {
    simpleRatingBottom.querySelector('span').innerHTML = e.target.value
    simpleRatingBottom.style.opacity = '1'
  })
}

//

// Переключатель языка
function langHandler() {
  const langSwitcherBtn = document.querySelector('.lang-switcher-btn')
  const langTopList = document.querySelector('.lang-top__list')

  langSwitcherBtn.addEventListener('click', function (e) {
    langSwitcherBtn.classList.toggle('_active')
    langTopList.classList.toggle('_active')
  })
  langTopList.addEventListener('click', e => {
    langSwitcherBtn.innerHTML = e.target.innerHTML
    html.setAttribute('lang', e.target.dataset.language)
    langSwitcherBtn.classList.toggle('_active')
    langTopList.classList.toggle('_active')
  })
}

window.addEventListener('DOMContentLoaded', () => {
  currentLanguage = html.getAttribute('lang')
  langHandler()
})

function renderMap() {
  const points = document.querySelectorAll('.map__point')
  const pointsArr = []
  points.forEach(el => {
    let item = { label: el.innerHTML, coord: el.dataset.coordinates }
    pointsArr.push(item)
  })

  var myIcon = L.icon({
    iconUrl: './../img/icons/map-point.png',
    iconSize: [25, 40],
    iconAnchor: [12, 48],
    popupAnchor: [0, -50],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  })

  const customMap = L.map('customMap').setView([48.4775, 30.7326], 6)

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '<a href="#!">IncTour</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXZlZ2VuaXVwcyIsImEiOiJja3dnODd6MnYwbTExMm9xdm4wMm9lNWhlIn0.8OWrlQuBVEd3qzfDwv99Uw',
  }).addTo(customMap)

  pointsArr.forEach(({ label, coord }, index) => {
    let newCoord = coord.split(',')
    L.marker([newCoord[0], newCoord[1]], { icon: myIcon }).addTo(customMap).bindPopup(label).openPopup()
  })

  // let nicolaev = L.marker([46.9659, 31.9974]).addTo(customMap)
  // nicolaev.bindPopup('Nico').openPopup()
}
//
if (document.querySelector('#customMap')) {
  renderMap()
}
