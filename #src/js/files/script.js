const html = document.querySelector('html')
const body = document.querySelector('body')

const $ = document.querySelector.bind(document)

const currentLanguage = html.getAttribute('lang')

//<PRELOADER>====================================================================================================
const preloader = document.querySelector('.preloader')
document.addEventListener('DOMContentLoaded', () => {
  // body.classList.remove('_lock')
  preloader.remove()
})
//<PRELOADER>====================================================================================================

//<HOME PAGE VIEW HANDLER>====================================================================================================
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
if (changeViewButton) {
  changeViewButton.addEventListener('click', changeViewHandler)
}
//<HOME PAGE VIEW HANDLER>====================================================================================================

//<Tooltips>====================================================================================================
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

if (document.querySelector('.simple-rating__guide')) {
  const simpleRatingWrapper = document.querySelector('.simple-rating__guide')
  const simpleRatingBottom = document.querySelector('.simple-rating__bottom__guide')

  simpleRatingWrapper.addEventListener('click', function (e) {
    simpleRatingBottom.querySelector('span').innerHTML = e.target.value
    simpleRatingBottom.style.opacity = '1'
  })
}
if (document.querySelector('.simple-rating__tour')) {
  const simpleRatingWrapper = document.querySelector('.simple-rating__tour')
  const simpleRatingBottom = document.querySelector('.simple-rating__bottom__tour')

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

function renderMap(selector) {
  const points = document.querySelectorAll('.map__point')
  const pointsArr = []
  points.forEach(el => {
    let item = { label: el.innerHTML, coord: el.dataset.coordinates }
    pointsArr.push(item)
  })

  var myIcon = L.icon({
    iconUrl: './img/icons/map-point.png',
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
    // TODO: сменить токен
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
  renderMap(customMap)
}

if (document.querySelector('.country-filter__list')) {
  const countryListWrapper = document.querySelector('.country-filter__list')
  const countryList = Array.from(document.querySelectorAll('.item-filter-country'))
  const filterCountryInput = document.querySelector('.filter-form-country__search')

  filterCountryInput.addEventListener('input', filterCountry)

  function filterCountry(e) {
    const inpValue = e.target.value.toLowerCase()
    const filteredCountry = countryList.filter(el => {
      const textAll = el.querySelector('.custom-radio__label').innerHTML
      const index = textAll.indexOf('<span>')
      const text = textAll.slice(0, index).toLowerCase()
      return text.includes(inpValue)
    })
    renderCountryList(filteredCountry)
  }

  function renderCountryList(countryList) {
    if (countryList.length === 0) {
      countryListWrapper.innerHTML = 'Не найдено'
    } else {
      countryListWrapper.innerHTML = ''
    }

    countryList.map(country => {
      countryListWrapper.appendChild(country)
    })
  }
}
// **********************

// <div id="slider"></div>
// var slider = document.que('price-filter__range')

if (document.querySelector('.price-filter__range')) {
  const priceRange = document.querySelector('.price-filter__range')
  const reset = document.querySelector('.price-filter__reset')
  const priceFilterMin = document.querySelector('.price-filter__min')
  const priceFilterMax = document.querySelector('.price-filter__max')
  const rangeFrom = +document.querySelector('.price-filter__range').dataset.from
  const rangeTo = +document.querySelector('.price-filter__range').dataset.to

  const moneyFormat = wNumb({
    thousand: ' ',
    decimals: 0,
    suffix: ' грн.',
  })

  noUiSlider.create(priceRange, {
    start: [rangeFrom, rangeTo],
    ariaFormat: wNumb({
      thousand: ' ',
      decimals: 0,
    }),

    tooltips: [true, true],
    format: wNumb({
      decimals: 0,
      thousand: ' ',
      suffix: ' грн.',
    }),

    connect: true,
    range: {
      min: rangeFrom,
      max: rangeTo,
    },
  })

  priceRange.noUiSlider.on('update', function (values, handle) {
    let value = values[handle]

    if (handle) {
      // inputNumber.value = value
    } else {
      // select.value = Math.round(value)
    }
  })

  priceFilterMin.addEventListener('change', function () {
    priceRange.noUiSlider.set([this.value, null])
  })

  priceFilterMax.addEventListener('change', function () {
    priceRange.noUiSlider.set([null, this.value])
  })

  const observer = new MutationObserver(e => {
    priceFilterMin.value = Math.round(document.querySelector('.noUi-handle-lower').getAttribute('aria-valuenow'))
    priceFilterMax.value = Math.round(document.querySelector('.noUi-handle-upper').getAttribute('aria-valuenow'))
  })
  observer.observe(priceRange, { attributes: true })
}

// Добавление анимаций карточкам тура на главной
if (document.querySelector('.item-tour_list')) {
  const itemsTourEven = document.querySelectorAll('.item-tour_list:nth-child(even)')
  const itemsTourOdd = document.querySelectorAll('.item-tour_list:nth-child(odd)')

  itemsTourEven.forEach(el => {
    el.setAttribute('data-aos', 'fade-right')
    el.setAttribute('data-aos-once', 'true')
  })

  itemsTourOdd.forEach(el => {
    el.setAttribute('data-aos', 'fade-left')
    el.setAttribute('data-aos-once', 'true')
  })

  const gridItem = document.querySelectorAll('.item-tour_grid')

  gridItem.forEach(el => {
    el.classList.remove('aos-init')
  })
}

//<Toggle View on WhereBuy Page>====================================================================================================
if (document.querySelector('.where-buy__toggle')) {
  const whereBuyToggle = document.querySelector('.where-buy__toggle')
  whereBuyToggle.addEventListener('click', function (e) {
    const whereList = document.querySelector('.where-buy__list')
    const itemsWhereBuy = document.querySelectorAll('.item-where-buy')

    if (whereList.classList.contains('where-buy__list_grid')) {
      whereList.classList.remove('where-buy__list_grid')
    } else {
      whereList.classList.add('where-buy__list_grid')
    }
    itemsWhereBuy.forEach(itemWhere => {
      if (itemWhere.classList.contains('item-where-buy_grid')) {
        itemWhere.classList.remove('item-where-buy_grid')
      } else {
        itemWhere.classList.add('item-where-buy_grid')
      }
    })
  })
}
function hideToggleViewWhereBuy() {
  if (document.querySelector('.where-buy__list')) {
    document.querySelector('.where-buy__list').classList.add('where-buy__list_grid')
    document.querySelectorAll('.item-where-buy').forEach(item => item.classList.add('item-where-buy_grid'))
  }
}

//<Toggle View on WhereBuy Page>====================================================================================================

window.addEventListener(
  'resize',
  e => {
    if (window.innerWidth <= 992) {
      if (document.querySelector('#changeViewButton')) {
        const handlerView = document.querySelector('#changeViewButton')
        handlerView.style.display = 'none'
      }

      if (document.querySelector('.tour-list_grid')) {
        const tourList = document.querySelector('.tour-list')
        tourList.classList.remove('tour-list_grid')

        const itemsTourGrid = document.querySelectorAll('.item-tour_grid')
        itemsTourGrid.forEach(el => {
          el.classList.remove('item-tour_grid')
          el.classList.add('item-tour_list')
        })
      }
    }

    if (window.innerWidth > 992) {
      if (document.querySelector('#changeViewButton')) {
        const handlerView = document.querySelector('#changeViewButton')
        handlerView.style.display = 'block'
      }
    }

    if (window.innerWidth <= 768) {
      hideToggleViewWhereBuy
    }
  },
  false,
)

function readMore() {
  if (!document.querySelector('._read-more')) return
  const readMoreBlocks = document.querySelectorAll('._read-more')
  // console.log(`readMoreBlocks`, readMoreBlocks)
  readMoreBlocks.forEach(readMore => {
    const textLimit = readMore.dataset.textLimit
    const textBlock = readMore.querySelector('._read-more__text')

    const text = textBlock.textContent

    if (text.length < textLimit) readMore.querySelector('._read-more__btn').style.display = 'none'
    const smallText = text.slice(0, textLimit)

    textBlock.textContent = smallText

    readMore.addEventListener('click', e => {
      if (!e.target.classList.contains('_read-more__btn')) return
      readMore.querySelector('._read-more__text').textContent = text
      readMore.querySelector('._read-more__btn').style.display = 'none'
    })
  })
}

window.addEventListener('DOMContentLoaded', () => {
  langHandler()
  readMore()
  AOS.init({ duration: 1200, offset: 120 })
})

