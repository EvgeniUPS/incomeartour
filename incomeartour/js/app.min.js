function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

// const url = ''
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

// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
var ua = window.navigator.userAgent
var msie = ua.indexOf('MSIE ')
var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
  },
}
function isIE() {
  ua = navigator.userAgent
  var is_ie = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1
  return is_ie
}
if (isIE()) {
  document.querySelector('html').classList.add('ie')
}
if (isMobile.any()) {
  document.querySelector('html').classList.add('_touch')
}

// Получить цифры из строки
//parseInt(itemContactpagePhone.replace(/[^\d]/g, ''))

function testWebP(callback) {
  var webP = new Image()
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2)
  }
  webP.src =
    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
}
testWebP(function (support) {
  if (support === true) {
    document.querySelector('html').classList.add('_webp')
  } else {
    document.querySelector('html').classList.add('_no-webp')
  }
})

function ibg() {
  if (isIE()) {
    let ibg = document.querySelectorAll('._ibg')
    for (var i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
        ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')'
      }
    }
  }
}
ibg()

window.addEventListener('load', function () {
  if (document.querySelector('.wrapper')) {
    setTimeout(function () {
      document.querySelector('.wrapper').classList.add('_loaded')
    }, 0)
  }
})

let unlock = true

//=================
//ActionsOnHash
if (location.hash) {
  const hsh = location.hash.replace('#', '')
  if (document.querySelector('.popup_' + hsh)) {
    popup_open(hsh)
  } else if (document.querySelector('div.' + hsh)) {
    _goto(document.querySelector('.' + hsh), 500, '')
  }
}
//=================
//Menu
let iconMenu = document.querySelector('.icon-menu')
if (iconMenu != null) {
  let delay = 500
  let menuBody = document.querySelector('.menu-burger-body')
  iconMenu.addEventListener('click', function (e) {
    e.stopPropagation()
    if (unlock) {
      // body_lock(delay)
      iconMenu.classList.toggle('_active')
      menuBody.classList.toggle('_active')
    }
  })
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
      menu_close()
    }
  })
  document.addEventListener('click', function (e) {
    e.stopPropagation()
    // console.log(e.target)
    if (
      !e.target.classList.contains('menu__link') &&
      !e.target.classList.contains('icon-menu') &&
      !e.target.classList.contains('lang-switcher-btn')
    ) {
      menu_close()
    }
  })
}
function menu_close() {
  let iconMenu = document.querySelector('.icon-menu')
  let menuBody = document.querySelector('.menu-burger-body')
  iconMenu.classList.remove('_active')
  menuBody.classList.remove('_active')
}
// //=================
// //Menu
// let iconMenu = document.querySelector('.icon-menu')
// if (iconMenu != null) {
//   let delay = 500
//   let menuBody = document.querySelector('.menu__body')
//   iconMenu.addEventListener('click', function (e) {
//     if (unlock) {
//       body_lock(delay)
//       iconMenu.classList.toggle('_active')
//       menuBody.classList.toggle('_active')
//     }
//   })
// }
// function menu_close() {
//   let iconMenu = document.querySelector('.icon-menu')
//   let menuBody = document.querySelector('.menu__body')
//   iconMenu.classList.remove('_active')
//   menuBody.classList.remove('_active')
// }
//=================
//BodyLock
function body_lock(delay) {
  let body = document.querySelector('body')
  if (body.classList.contains('_lock')) {
    body_lock_remove(delay)
  } else {
    body_lock_add(delay)
  }
}
function body_lock_remove(delay) {
  let body = document.querySelector('body')
  if (unlock) {
    let lock_padding = document.querySelectorAll('._lp')
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index]
        el.style.paddingRight = '0px'
      }
      body.style.paddingRight = '0px'
      body.classList.remove('_lock')
    }, delay)

    unlock = false
    setTimeout(function () {
      unlock = true
    }, delay)
  }
}
function body_lock_add(delay) {
  let body = document.querySelector('body')
  if (unlock) {
    let lock_padding = document.querySelectorAll('._lp')
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index]
      el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
    }
    body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
    body.classList.add('_lock')

    unlock = false
    setTimeout(function () {
      unlock = true
    }, delay)
  }
}
//=================
// LettersAnimation
let title = document.querySelectorAll('._letter-animation')
if (title) {
  for (let index = 0; index < title.length; index++) {
    let el = title[index]
    let txt = el.innerHTML
    let txt_words = txt.replace('  ', ' ').split(' ')
    let new_title = ''
    for (let index = 0; index < txt_words.length; index++) {
      let txt_word = txt_words[index]
      let len = txt_word.length
      new_title = new_title + '<p>'
      for (let index = 0; index < len; index++) {
        let it = txt_word.substr(index, 1)
        if (it == ' ') {
          it = '&nbsp;'
        }
        new_title = new_title + '<span>' + it + '</span>'
      }
      el.innerHTML = new_title
      new_title = new_title + '&nbsp;</p>'
    }
  }
}
//=================
//Tabs
let tabs = document.querySelectorAll('._tabs')
for (let index = 0; index < tabs.length; index++) {
  let tab = tabs[index]
  let tabs_items = tab.querySelectorAll('._tabs-item')
  let tabs_blocks = tab.querySelectorAll('._tabs-block')
  for (let index = 0; index < tabs_items.length; index++) {
    let tabs_item = tabs_items[index]
    tabs_item.addEventListener('click', function (e) {
      for (let index = 0; index < tabs_items.length; index++) {
        let tabs_item = tabs_items[index]
        tabs_item.classList.remove('_active')
        tabs_blocks[index].classList.remove('_active')
      }
      tabs_item.classList.add('_active')
      tabs_blocks[index].classList.add('_active')
      e.preventDefault()
    })
  }
}
//=================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например: 
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/

// SPOLLERS
const spollersArray = document.querySelectorAll('[data-spollers]')
if (spollersArray.length > 0) {
  // Получение обычных слойлеров
  const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
    return !item.dataset.spollers.split(',')[0]
  })
  // Инициализация обычных слойлеров
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular)
  }

  // Получение слойлеров с медиа запросами
  const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
    return item.dataset.spollers.split(',')[0]
  })

  // Инициализация слойлеров с медиа запросами
  if (spollersMedia.length > 0) {
    const breakpointsArray = []
    spollersMedia.forEach(item => {
      const params = item.dataset.spollers
      const breakpoint = {}
      const paramsArray = params.split(',')
      breakpoint.value = paramsArray[0]
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
      breakpoint.item = item
      breakpointsArray.push(breakpoint)
    })

    // Получаем уникальные брейкпоинты
    let mediaQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type
    })
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index
    })

    // Работаем с каждым брейкпоинтом
    mediaQueries.forEach(breakpoint => {
      const paramsArray = breakpoint.split(',')
      const mediaBreakpoint = paramsArray[1]
      const mediaType = paramsArray[2]
      const matchMedia = window.matchMedia(paramsArray[0])

      // Объекты с нужными условиями
      const spollersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true
        }
      })
      // Событие
      matchMedia.addListener(function () {
        initSpollers(spollersArray, matchMedia)
      })
      initSpollers(spollersArray, matchMedia)
    })
  }
  // Инициализация
  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach(spollersBlock => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_init')
        initSpollerBody(spollersBlock)
        spollersBlock.addEventListener('click', setSpollerAction)
      } else {
        spollersBlock.classList.remove('_init')
        initSpollerBody(spollersBlock, false)
        spollersBlock.removeEventListener('click', setSpollerAction)
      }
    })
  }
  // Работа с контентом
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]')
    if (spollerTitles.length > 0) {
      spollerTitles.forEach(spollerTitle => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute('tabindex')
          if (!spollerTitle.classList.contains('_active')) {
            spollerTitle.nextElementSibling.hidden = true
          }
        } else {
          spollerTitle.setAttribute('tabindex', '-1')
          spollerTitle.nextElementSibling.hidden = false
        }
      })
    }
  }
  function setSpollerAction(e) {
    const el = e.target
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]')
      const spollersBlock = spollerTitle.closest('[data-spollers]')
      const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false
      if (!spollersBlock.querySelectorAll('._slide').length) {
        if (oneSpoller && !spollerTitle.classList.contains('_active')) {
          hideSpollersBody(spollersBlock)
        }
        spollerTitle.classList.toggle('_active')
        _slideToggle(spollerTitle.nextElementSibling, 500)
      }
      e.preventDefault()
    }
  }
  function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active')
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove('_active')
      _slideUp(spollerActiveTitle.nextElementSibling, 500)
    }
  }
}
//=================
//Gallery
let gallery = document.querySelectorAll('._gallery')
if (gallery) {
  gallery_init()
}
function gallery_init() {
  for (let index = 0; index < gallery.length; index++) {
    const el = gallery[index]
    lightGallery(el, {
      counter: false,
      selector: 'a',
      download: false,
    })
  }
}
//=================
//SearchInList
function search_in_list(input) {
  let ul = input.parentNode.querySelector('ul')
  let li = ul.querySelectorAll('li')
  let filter = input.value.toUpperCase()

  for (i = 0; i < li.length; i++) {
    let el = li[i]
    let item = el
    txtValue = item.textContent || item.innerText
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      el.style.display = ''
    } else {
      el.style.display = 'none'
    }
  }
}
//=================
//DigiFormat
function digi(str) {
  var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
  return r
}
//=================
//DiGiAnimate
function digi_animate(digi_animate) {
  if (digi_animate.length > 0) {
    for (let index = 0; index < digi_animate.length; index++) {
      const el = digi_animate[index]
      const el_to = parseInt(el.innerHTML.replace(' ', ''))
      if (!el.classList.contains('_done')) {
        digi_animate_value(el, 0, el_to, 1500)
      }
    }
  }
}
function digi_animate_value(el, start, end, duration) {
  var obj = el
  var range = end - start
  // no timer shorter than 50ms (not really visible any way)
  var minTimer = 50
  // calc step time to show all interediate values
  var stepTime = Math.abs(Math.floor(duration / range))

  // never go below minTimer
  stepTime = Math.max(stepTime, minTimer)

  // get current time and calculate desired end time
  var startTime = new Date().getTime()
  var endTime = startTime + duration
  var timer

  function run() {
    var now = new Date().getTime()
    var remaining = Math.max((endTime - now) / duration, 0)
    var value = Math.round(end - remaining * range)
    obj.innerHTML = digi(value)
    if (value == end) {
      clearInterval(timer)
    }
  }

  timer = setInterval(run, stepTime)
  run()

  el.classList.add('_done')
}
//=================
//Popups
let popup_link = document.querySelectorAll('._popup-link')
let popups = document.querySelectorAll('.popup')
for (let index = 0; index < popup_link.length; index++) {
  const el = popup_link[index]
  el.addEventListener('click', function (e) {
    if (unlock) {
      let item = el.getAttribute('href').replace('#', '')
      let video = el.getAttribute('data-video')
      popup_open(item, video)
    }
    e.preventDefault()
  })
}
for (let index = 0; index < popups.length; index++) {
  const popup = popups[index]
  popup.addEventListener('click', function (e) {
    if (!e.target.closest('.popup__body')) {
      popup_close(e.target.closest('.popup'))
    }
  })
}
function popup_open(item, video = '') {
  let activePopup = document.querySelectorAll('.popup._active')
  if (activePopup.length > 0) {
    popup_close('', false)
  }
  let curent_popup = document.querySelector('.popup_' + item)
  if (curent_popup && unlock) {
    if (video != '' && video != null) {
      let popup_video = document.querySelector('.popup_video')
      popup_video.querySelector('.popup__video').innerHTML =
        '<iframe src="https://www.youtube.com/embed/' +
        video +
        '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>'
    }
    if (!document.querySelector('.menu-burger-body._active')) {
      body_lock_add(500)
    }
    curent_popup.classList.add('_active')
    history.pushState('', '', '#' + item)
  }
}
function popup_close(item, bodyUnlock = true) {
  if (unlock) {
    if (!item) {
      for (let index = 0; index < popups.length; index++) {
        const popup = popups[index]
        let video = popup.querySelector('.popup__video')
        if (video) {
          video.innerHTML = ''
        }
        popup.classList.remove('_active')
      }
    } else {
      let video = item.querySelector('.popup__video')
      if (video) {
        video.innerHTML = ''
      }
      item.classList.remove('_active')
    }
    if (!document.querySelector('.menu-burger-body._active') && bodyUnlock) {
      body_lock_remove(500)
    }
    history.pushState('', '', window.location.href.split('#')[0])
  }
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close')
if (popup_close_icon) {
  for (let index = 0; index < popup_close_icon.length; index++) {
    const el = popup_close_icon[index]
    el.addEventListener('click', function () {
      popup_close(el.closest('.popup'))
    })
  }
}
document.addEventListener('keydown', function (e) {
  if (e.code === 'Escape') {
    popup_close()
  }
})

//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = target.offsetHeight + 'px'
    target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    window.setTimeout(() => {
      target.hidden = true
      target.style.removeProperty('height')
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
    }, duration)
  }
}
let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide')
    if (target.hidden) {
      target.hidden = false
    }
    let height = target.offsetHeight
    target.style.overflow = 'hidden'
    target.style.height = 0
    target.style.paddingTop = 0
    target.style.paddingBottom = 0
    target.style.marginTop = 0
    target.style.marginBottom = 0
    target.offsetHeight
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = duration + 'ms'
    target.style.height = height + 'px'
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    window.setTimeout(() => {
      target.style.removeProperty('height')
      target.style.removeProperty('overflow')
      target.style.removeProperty('transition-duration')
      target.style.removeProperty('transition-property')
      target.classList.remove('_slide')
    }, duration)
  }
}
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration)
  } else {
    return _slideUp(target, duration)
  }
}
//========================================
//Wrap
function _wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el)
  wrapper.appendChild(el)
}
//========================================
//RemoveClasses
function _removeClasses(el, class_name) {
  for (var i = 0; i < el.length; i++) {
    el[i].classList.remove(class_name)
  }
}
//========================================
//IsHidden
function _is_hidden(el) {
  return el.offsetParent === null
}
// ShowMore Beta ========================
let moreBlocks = document.querySelectorAll('._more-block')
if (moreBlocks.length > 0) {
  let wrapper = document.querySelector('.wrapper')
  for (let index = 0; index < moreBlocks.length; index++) {
    const moreBlock = moreBlocks[index]
    let items = moreBlock.querySelectorAll('._more-item')
    if (items.length > 0) {
      let itemsMore = moreBlock.querySelector('._more-link')
      let itemsContent = moreBlock.querySelector('._more-content')
      let itemsView = itemsContent.getAttribute('data-view')
      if (getComputedStyle(itemsContent).getPropertyValue('transition-duration') === '0s') {
        itemsContent.style.cssText = 'transition-duration: 1ms'
      }
      itemsMore.addEventListener('click', function (e) {
        if (itemsMore.classList.contains('_active')) {
          setSize()
        } else {
          setSize('start')
        }
        itemsMore.classList.toggle('_active')
        e.preventDefault()
      })

      let isScrollStart
      function setSize(type) {
        let resultHeight
        let itemsContentHeight = 0
        let itemsContentStartHeight = 0

        for (let index = 0; index < items.length; index++) {
          if (index < itemsView) {
            itemsContentHeight += items[index].offsetHeight
          }
          console.log(`items[index].offsetHeight`, items[index].offsetHeight)
          itemsContentStartHeight += items[index].offsetHeight
        }
        resultHeight = type === 'start' ? itemsContentStartHeight : itemsContentHeight
        isScrollStart = window.innerWidth - wrapper.offsetWidth
        console.log(`resultHeight`, resultHeight)
        itemsContent.style.height = `${resultHeight}px`
      }

      itemsContent.addEventListener('transitionend', updateSize, false)

      function updateSize() {
        let isScrollEnd = window.innerWidth - wrapper.offsetWidth
        if ((isScrollStart === 0 && isScrollEnd > 0) || (isScrollStart > 0 && isScrollEnd === 0)) {
          if (itemsMore.classList.contains('_active')) {
            setSize('start')
          } else {
            setSize()
          }
        }
      }
      window.addEventListener('resize', function (e) {
        if (!itemsMore.classList.contains('_active')) {
          setSize()
        } else {
          setSize('start')
        }
      })
      setSize()
    }
  }
}
//==RATING======================================
const ratings = document.querySelectorAll('.rating')
if (ratings.length > 0) {
  initRatings()
}
// Основная функция
function initRatings() {
  let ratingActive, ratingValue
  // "Бегаем" по всем рейтингам на странице
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index]
    initRating(rating)
  }

  // Инициализируем конкретный рейтинг
  function initRating(rating) {
    initRatingVars(rating)

    setRatingActiveWidth()

    if (rating.classList.contains('rating_set')) {
      setRating(rating)
    }
  }

  // Инициализайция переменных
  function initRatingVars(rating) {
    ratingActive = rating.querySelector('.rating__active')
    ratingValue = rating.querySelector('.rating__value')
  }
  // Изменяем ширину активных звезд
  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05
    ratingActive.style.width = `${ratingActiveWidth}%`
  }
  // Возможность указать оценку
  function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.rating__item')
    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index]
      ratingItem.addEventListener('mouseenter', function (e) {
        // Обновление переменных
        initRatingVars(rating)
        // Обновление активных звезд
        setRatingActiveWidth(ratingItem.value)
      })
      ratingItem.addEventListener('mouseleave', function (e) {
        // Обновление активных звезд
        setRatingActiveWidth()
      })
      ratingItem.addEventListener('click', function (e) {
        // Обновление переменных
        initRatingVars(rating)

        if (rating.dataset.ajax) {
          // "Отправить" на сервер
          setRatingValue(ratingItem.value, rating)
        } else {
          // Отобразить указанную оцнку
          ratingValue.innerHTML = index + 1
          setRatingActiveWidth()
        }
      })
    }
  }

  async function setRatingValue(value, rating) {
    if (!rating.classList.contains('rating_sending')) {
      rating.classList.add('rating_sending')

      // Отправика данных (value) на сервер
      let response = await fetch('rating.json', {
        method: 'GET',

        //body: JSON.stringify({
        //	userRating: value
        //}),
        //headers: {
        //	'content-type': 'application/json'
        //}
      })
      if (response.ok) {
        const result = await response.json()

        // Получаем новый рейтинг
        const newRating = result.newRating

        // Вывод нового среднего результата
        ratingValue.innerHTML = newRating

        // Обновление активных звезд
        setRatingActiveWidth()

        rating.classList.remove('rating_sending')
      } else {
        alert('Ошибка')

        rating.classList.remove('rating_sending')
      }
    }
  }
}
//========================================
//Animate
function animate({ timing, draw, duration }) {
  let start = performance.now()
  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration
    if (timeFraction > 1) timeFraction = 1

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction)

    draw(progress) // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate)
    }
  })
}
function makeEaseOut(timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction)
  }
}
function makeEaseInOut(timing) {
  return function (timeFraction) {
    if (timeFraction < 0.5) return timing(2 * timeFraction) / 2
    else return (2 - timing(2 * (1 - timeFraction))) / 2
  }
}
function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}
function circ(timeFraction) {
  return 1 - Math.sin(Math.acos(timeFraction))
}
/*
animate({
	duration: 1000,
	timing: makeEaseOut(quad),
	draw(progress) {
		window.scroll(0, start_position + 400 * progress);
	}
});*/

//Полифилы
;(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this
      while (node) {
        if (node.matches(css)) return node
        else node = node.parentElement
      }
      return null
    }
  }
})()
;(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector
  }
})()

//<Disabled Links>====================================================================================================

const disabledLinks = document.querySelectorAll('a.disabled')
disabledLinks.forEach(el => {
  el.addEventListener('click', function (e) {
    e.preventDefault()
  })
})

// //BildSlider
let sliders = document.querySelectorAll('._swiper')
if (sliders) {
  for (let index = 0; index < sliders.length; index++) {
    let slider = sliders[index]
    if (!slider.classList.contains('swiper-bild')) {
      let slider_items = slider.children
      if (slider_items) {
        for (let index = 0; index < slider_items.length; index++) {
          let el = slider_items[index]
          el.classList.add('swiper-slide')
        }
      }
      let slider_content = slider.innerHTML
      let slider_wrapper = document.createElement('div')
      slider_wrapper.classList.add('swiper-wrapper')
      slider_wrapper.innerHTML = slider_content
      slider.innerHTML = ''
      slider.appendChild(slider_wrapper)
      slider.classList.add('swiper-bild')

      if (slider.classList.contains('_swiper_scroll')) {
        let sliderScroll = document.createElement('div')
        sliderScroll.classList.add('swiper-scrollbar')
        slider.appendChild(sliderScroll)
      }
    }
    if (slider.classList.contains('_gallery')) {
      //slider.data('lightGallery').destroy(true);
    }
  }
  sliders_bild_callback()
}

function sliders_bild_callback(params) {}

let sliderScrollItems = document.querySelectorAll('._swiper_scroll')
if (sliderScrollItems.length > 0) {
  for (let index = 0; index < sliderScrollItems.length; index++) {
    const sliderScrollItem = sliderScrollItems[index]
    const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar')
    const sliderScroll = new Swiper(sliderScrollItem, {
      observer: true,
      observeParents: true,
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: sliderScrollBar,
        draggable: true,
        snapOnRelease: false,
      },
      mousewheel: {
        releaseOnEdges: true,
      },
    })
    sliderScroll.scrollbar.updateSize()
  }
}

function sliders_bild_callback(params) {}

let slider_about = new Swiper('.about__slider', {
  /*
	effect: 'fade',
	autoplay: { 
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
  observer: true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween: 0,
  autoHeight: true,
  speed: 800,
  //touchRatio: 0,
  //simulateTouch: false,
  //loop: true,
  //preloadImages: false,
  //lazy: true,
  // Dotts
  //pagination: {
  //	el: '.slider-quality__pagging',
  //	clickable: true,
  //},
  // Arrows
  navigation: {
    nextEl: '.about__more .more__item_next',
    prevEl: '.about__more .more__item_prev',
  },
  /*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
  on: {
    lazyImageReady: function () {
      ibg()
    },
  },
  // And if we need scrollbar
  //scrollbar: {
  //	el: '.swiper-scrollbar',
  //},
})

const mainSlider = new Swiper('.main-slider', {
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.main-slider-btn-next',
    prevEl: '.main-slider-btn-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})

const photoSlider = new Swiper('.photo-slider', {
  // Optional parameters
  // direction: 'vertical',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.photo-slider-button-next',
    prevEl: '.photo-slider-button-prev',
  },
})

const reviewsSlider = new Swiper('.reviews-slider', {
  loop: true,
  slidesPerView: 4.5,
  spaceBetween: 30,
  centeredSlides: true,

  navigation: {
    nextEl: '.reviews-slider-button-next',
    prevEl: '.reviews-slider-button-prev',
  },
  breakpoints: {
    // when window width is >= 320px
    310: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },

    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 3.5,
      spaceBetween: 10,
    },
  },
})

const singleBlockSlider = new Swiper('.single-block-slider ', {
  // Optional parameters
  // direction: 'vertical',
  // loop: true,
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
})
// const singleBlockSliderThumb = new Swiper('.single-block-slider-thumb ', {
//   // loop: true,
//   spaceBetween: 10,
//   slidesPerView: 3,
//   slideToClickedSlide: true,
//   // slidesPerView: 'auto',
//   centeredSlides: true,
//   // freeMode: true,
//   watchSlidesProgress: true,
//   thumbs: {
//     swiper: singleBlockSlider,
//   },
//   navigation: {
//     nextEl: '.single-block-button-next',
//     prevEl: '.single-block-button-prev',
//   },
// })

if (document.querySelector('.slider-add-exc')) {
  const sliderAddExcSlider = new Swiper('.slider-add-exc', {
    // loop: true,
    // slidesPerView: 1,
    // spaceBetween: 10,
    breakpoints: {
      600: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
    },
    navigation: {
      nextEl: '._slider-button_next',
      prevEl: '._slider-button_prev',
    },
  })
}
if (document.querySelector('.thumb-main-single')) {
  const thumbMainSingle = new Swiper('.thumb-main-single', {
    // loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    autoHeight: true,
    watchSlidesProgress: true,
  })

  const sliderMainSingle = new Swiper('.slider-main-single', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1,
    autoHeight: true,
    navigation: {
      nextEl: '.main-single-nav__next',
      prevEl: '.main-single-nav__prev',
    },
    // watchSlidesProgress: true,

    thumbs: {
      swiper: thumbMainSingle,
      slideThumbActiveClass: 'thumb-main-single_active',
    },
  })
}

const promoSingleSlider = new Swiper('.promo-single-slider', {
  loop: true,
  navigation: {
    nextEl: '.promo-single-slider__next',
    prevEl: '.promo-single-slider__prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  slidesPerView: 1,
  breakpoints: {
    992: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
  },
})
const anyNewsSlider = new Swiper('.any-news-slider', {
  loop: true,
  autoHeight: true,
  autoplay: {
    delay: 5000,
  },
  navigation: {
    nextEl: '.any-news-slider__next',
    prevEl: '.any-news-slider__prev',
  },

  slidesPerView: 1,
  breakpoints: {
    992: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  },
})

//let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
let forms = document.querySelectorAll('form')
if (forms.length > 0) {
  for (let index = 0; index < forms.length; index++) {
    const el = forms[index]
    el.addEventListener('submit', form_submit)
  }
}
async function form_submit(e) {
  let btn = e.target
  let form = btn.closest('form')
  let error = form_validate(form)
  if (error == 0) {
    let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#'
    let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET'
    const message = form.getAttribute('data-message')
    const ajax = form.getAttribute('data-ajax')

    //SendForm
    if (ajax) {
      e.preventDefault()
      let formData = new FormData(form)
      form.classList.add('_sending')
      let response = await fetch(formAction, {
        method: formMethod,
        body: formData,
      })
      if (response.ok) {
        let result = await response.json()
        form.classList.remove('_sending')
        if (message) {
          popup_open(message + '-message')
        }
        form_clean(form)
      } else {
        alert('Ошибка')
        form.classList.remove('_sending')
      }
    }
    // If test
    if (form.hasAttribute('data-test')) {
      e.preventDefault()
      if (message) {
        popup_open(message + '-message')
      }
      form_clean(form)
    }
  } else {
    let form_error = form.querySelectorAll('._error')
    if (form_error && form.classList.contains('_goto-error')) {
      _goto(form_error[0], 1000, 50)
    }
    e.preventDefault()
  }
}

function form_validate(form) {
  let error = 0
  let form_req = form.querySelectorAll('._req')
  if (form_req.length > 0) {
    for (let index = 0; index < form_req.length; index++) {
      const el = form_req[index]
      if (!_is_hidden(el)) {
        error += form_validate_input(el)
      }
    }
  }
  return error
}
function form_validate_input(input) {
  let error = 0
  let input_g_value = input.getAttribute('data-value')

  if (input.getAttribute('name') == 'email' || input.classList.contains('_email')) {
    if (input.value != input_g_value) {
      let em = input.value.replace(' ', '')
      input.value = em
    }
    if (email_test(input) || input.value == input_g_value) {
      form_add_error(input)
      error++
    } else {
      form_remove_error(input)
    }
  } else if (input.getAttribute('type') == 'checkbox' && input.checked == false) {
    form_add_error(input)
    error++
  } else {
    if (input.value == '' || input.value == input_g_value) {
      form_add_error(input)
      error++
    } else {
      form_remove_error(input)
    }
  }
  return error
}
function form_add_error(input) {
  input.classList.add('_error')
  input.parentElement.classList.add('_error')

  let input_error = input.parentElement.querySelector('.form__error')
  if (input_error) {
    input.parentElement.removeChild(input_error)
  }
  let input_error_text = input.getAttribute('data-error')
  if (input_error_text && input_error_text != '') {
    input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>')
  }
}
function form_remove_error(input) {
  input.classList.remove('_error')
  input.parentElement.classList.remove('_error')

  let input_error = input.parentElement.querySelector('.form__error')
  if (input_error) {
    input.parentElement.removeChild(input_error)
  }
}
function form_clean(form) {
  let inputs = form.querySelectorAll('input,textarea')
  for (let index = 0; index < inputs.length; index++) {
    const el = inputs[index]
    el.parentElement.classList.remove('_focus')
    el.classList.remove('_focus')
    el.value = el.getAttribute('data-value')
  }
  let checkboxes = form.querySelectorAll('.checkbox__input')
  if (checkboxes.length > 0) {
    for (let index = 0; index < checkboxes.length; index++) {
      const checkbox = checkboxes[index]
      checkbox.checked = false
    }
  }
  let selects = form.querySelectorAll('select')
  if (selects.length > 0) {
    for (let index = 0; index < selects.length; index++) {
      const select = selects[index]
      const select_default_value = select.getAttribute('data-default')
      select.value = select_default_value
      select_item(select)
    }
  }
}

//viewPass
let viewPass = document.querySelectorAll('._viewpass')
for (let index = 0; index < viewPass.length; index++) {
  const element = viewPass[index]
  element.addEventListener('click', function (e) {
    if (element.classList.contains('_active')) {
      element.parentElement.querySelector('input').setAttribute('type', 'password')
    } else {
      element.parentElement.querySelector('input').setAttribute('type', 'text')
    }
    element.classList.toggle('_active')
  })
}

//Select
// let selects = document.getElementsByTagName('select')
// if (selects.length > 0) {
//   selects_init()
// }
// function selects_init() {
//   for (let index = 0; index < selects.length; index++) {
//     const select = selects[index]
//     select_init(select)
//   }
//   //select_callback();
//   document.addEventListener('click', function (e) {
//     selects_close(e)
//   })
//   document.addEventListener('keydown', function (e) {
//     if (e.code === 'Escape') {
//       selects_close(e)
//     }
//   })
// }
// function selects_close(e) {
//   const selects = document.querySelectorAll('.select')
//   if (!e.target.closest('.select') && !e.target.classList.contains('_option')) {
//     for (let index = 0; index < selects.length; index++) {
//       const select = selects[index]
//       const select_body_options = select.querySelector('.select__options')
//       select.classList.remove('_active')
//       _slideUp(select_body_options, 100)
//     }
//   }
// }
// function select_init(select) {
//   const select_parent = select.parentElement
//   const select_modifikator = select.getAttribute('class')
//   const select_selected_option = select.querySelector('option:checked')
//   select.setAttribute('data-default', select_selected_option.value)
//   select.style.display = 'none'

//   select_parent.insertAdjacentHTML(
//     'beforeend',
//     '<div class="select select_' + select_modifikator + '"></div>'
//   )

//   let new_select = select.parentElement.querySelector('.select')
//   new_select.appendChild(select)
//   select_item(select)
// }
// function select_item(select) {
//   const select_parent = select.parentElement
//   const select_items = select_parent.querySelector('.select__item')
//   const select_options = select.querySelectorAll('option')
//   const select_selected_option = select.querySelector('option:checked')
//   const select_selected_text = select_selected_option.text
//   const select_type = select.getAttribute('data-type')

//   if (select_items) {
//     select_items.remove()
//   }

//   let select_type_content = ''
//   if (select_type == 'input') {
//     select_type_content =
//       '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' +
//       select_selected_text +
//       '" data-error="Ошибка" data-value="' +
//       select_selected_text +
//       '" class="select__input"></div>'
//   } else {
//     select_type_content =
//       '<div class="select__value icon-select-arrow"><span>' +
//       select_selected_text +
//       '</span></div>'
//   }

//   select_parent.insertAdjacentHTML(
//     'beforeend',
//     '<div class="select__item">' +
//       '<div class="select__title">' +
//       select_type_content +
//       '</div>' +
//       '<div hidden class="select__options">' +
//       select_get_options(select_options) +
//       '</div>' +
//       '</div></div>'
//   )

//   select_actions(select, select_parent)
// }
// function select_actions(original, select) {
//   const select_item = select.querySelector('.select__item')
//   const selectTitle = select.querySelector('.select__title')
//   const select_body_options = select.querySelector('.select__options')
//   const select_options = select.querySelectorAll('.select__option')
//   const select_type = original.getAttribute('data-type')
//   const select_input = select.querySelector('.select__input')

//   selectTitle.addEventListener('click', function (e) {
//     selectItemActions()
//   })

//   function selectMultiItems() {
//     let selectedOptions = select.querySelectorAll('.select__option')
//     let originalOptions = original.querySelectorAll('option')
//     let selectedOptionsText = []
//     for (let index = 0; index < selectedOptions.length; index++) {
//       const selectedOption = selectedOptions[index]
//       originalOptions[index].removeAttribute('selected')
//       if (selectedOption.classList.contains('_selected')) {
//         const selectOptionText = selectedOption.innerHTML
//         selectedOptionsText.push(selectOptionText)
//         originalOptions[index].setAttribute('selected', 'selected')
//       }
//     }
//     select.querySelector('.select__value').innerHTML =
//       '<span>' + selectedOptionsText + '</span>'
//   }
//   function selectItemActions(type) {
//     if (!type) {
//       let selects = document.querySelectorAll('.select')
//       for (let index = 0; index < selects.length; index++) {
//         const select = selects[index]
//         const select_body_options = select.querySelector('.select__options')
//         if (select != select_item.closest('.select')) {
//           select.classList.remove('_active')
//           _slideUp(select_body_options, 100)
//         }
//       }
//       _slideToggle(select_body_options, 100)
//       select.classList.toggle('_active')
//     }
//   }
//   for (let index = 0; index < select_options.length; index++) {
//     const select_option = select_options[index]
//     const select_option_value = select_option.getAttribute('data-value')
//     const select_option_text = select_option.innerHTML

//     if (select_type == 'input') {
//       select_input.addEventListener('keyup', select_search)
//     } else {
//       if (
//         select_option.getAttribute('data-value') == original.value &&
//         !original.hasAttribute('multiple')
//       ) {
//         select_option.style.display = 'none'
//       }
//     }
//     select_option.addEventListener('click', function () {
//       for (let index = 0; index < select_options.length; index++) {
//         const el = select_options[index]
//         el.style.display = 'block'
//       }
//       if (select_type == 'input') {
//         select_input.value = select_option_text
//         original.value = select_option_value
//       } else {
//         if (original.hasAttribute('multiple')) {
//           select_option.classList.toggle('_selected')
//           selectMultiItems()
//         } else {
//           select.querySelector('.select__value').innerHTML =
//             '<span>' + select_option_text + '</span>'
//           original.value = select_option_value
//           select_option.style.display = 'none'
//         }
//       }
//       let type
//       if (original.hasAttribute('multiple')) {
//         type = 'multiple'
//       }
//       selectItemActions(type)
//     })
//   }
// }
// function select_get_options(select_options) {
//   if (select_options) {
//     let select_options_content = ''
//     for (let index = 0; index < select_options.length; index++) {
//       const select_option = select_options[index]
//       const select_option_value = select_option.value
//       if (select_option_value != '') {
//         const select_option_text = select_option.innerHTML
//         select_options_content =
//           select_options_content +
//           '<div data-value="' +
//           select_option_value +
//           '" class="select__option">' +
//           select_option_text +
//           '</div>'
//       }
//     }
//     return select_options_content
//   }
// }
// function select_search(e) {
//   let select_block = e.target
//     .closest('.select ')
//     .querySelector('.select__options')
//   let select_options = e.target
//     .closest('.select ')
//     .querySelectorAll('.select__option')
//   let select_search_text = e.target.value.toUpperCase()

//   for (let i = 0; i < select_options.length; i++) {
//     let select_option = select_options[i]
//     let select_txt_value = select_option.textContent || select_option.innerText
//     if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
//       select_option.style.display = ''
//     } else {
//       select_option.style.display = 'none'
//     }
//   }
// }
// function selects_update_all() {
//   let selects = document.querySelectorAll('select')
//   if (selects) {
//     for (let index = 0; index < selects.length; index++) {
//       const select = selects[index]
//       select_item(select)
//     }
//   }
// }

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]')
inputs_init(inputs)

function inputs_init(inputs) {
  if (inputs.length > 0) {
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index]
      const input_g_value = input.getAttribute('data-value')
      input_placeholder_add(input)
      if (input.value != '' && input.value != input_g_value) {
        input_focus_add(input)
      }
      input.addEventListener('focus', function (e) {
        if (input.value == input_g_value) {
          input_focus_add(input)
          input.value = ''
        }
        if (input.getAttribute('data-type') === 'pass') {
          if (input.parentElement.querySelector('._viewpass')) {
            if (!input.parentElement.querySelector('._viewpass').classList.contains('_active')) {
              input.setAttribute('type', 'password')
            }
          } else {
            input.setAttribute('type', 'password')
          }
        }
        if (input.classList.contains('_date')) {
          // console.log(11111111111)
          /*
          input.classList.add('_mask');
          Inputmask("99.99.9999", {
          	//"placeholder": '',
          	clearIncomplete: true,
          	clearMaskOnLostFocus: true,
          	onincomplete: function () {
          		input_clear_mask(input, input_g_value);
          	}
          }).mask(input);
          */
        }
        if (input.classList.contains('_phone')) {
          //'+7(999) 999 9999'
          //'+38(999) 999 9999'
          //'+375(99)999-99-99'
          input.classList.add('_mask')
          Inputmask('+375 (99) 9999999', {
            //"placeholder": '',
            clearIncomplete: true,
            clearMaskOnLostFocus: true,
            onincomplete: function () {
              input_clear_mask(input, input_g_value)
            },
          }).mask(input)
        }
        if (input.classList.contains('_digital')) {
          input.classList.add('_mask')
          Inputmask('9{1,}', {
            placeholder: '',
            clearIncomplete: true,
            clearMaskOnLostFocus: true,
            onincomplete: function () {
              input_clear_mask(input, input_g_value)
            },
          }).mask(input)
        }
        form_remove_error(input)
      })
      input.addEventListener('blur', function (e) {
        if (input.value == '') {
          input.value = input_g_value
          input_focus_remove(input)
          if (input.classList.contains('_mask')) {
            input_clear_mask(input, input_g_value)
          }
          if (input.getAttribute('data-type') === 'pass') {
            input.setAttribute('type', 'text')
          }
        }
      })
    }
  }
}

function input_placeholder_add(input) {
  const input_g_value = input.getAttribute('data-value')
  if (input.value == '' && input_g_value != '') {
    input.value = input_g_value
  }
}
function input_focus_add(input) {
  input.classList.add('_focus')
  input.parentElement.classList.add('_focus')
}
function input_focus_remove(input) {
  input.classList.remove('_focus')
  input.parentElement.classList.remove('_focus')
}
function input_clear_mask(input, input_g_value) {
  input.inputmask.remove()
  input.value = input_g_value
  input_focus_remove(input)
}

//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button')
if (quantityButtons.length > 0) {
  for (let index = 0; index < quantityButtons.length; index++) {
    const quantityButton = quantityButtons[index]
    quantityButton.addEventListener('click', function (e) {
      let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value)
      if (quantityButton.classList.contains('quantity__button_plus')) {
        value++
      } else {
        value = value - 1
        if (value < 1) {
          value = 1
        }
      }
      quantityButton.closest('.quantity').querySelector('input').value = value
    })
  }
}

//RANGE
// const priceSlider = document.querySelector('.price-filter__slider1')
// if (priceSlider) {
//   let textFrom = priceSlider.getAttribute('data-from')
//   let textTo = priceSlider.getAttribute('data-to')

//   noUiSlider.create(priceSlider, {
//     start: [0, 200000],
//     connect: true,
//     tooltips: [wNumb({ decimals: 0, prefix: textFrom + ' ' }), wNumb({ decimals: 0, prefix: textTo + ' ' })],
//     range: {
//       min: [0],
//       max: [200000],
//     },
//   })

/*
  const priceStart = document.getElementById('price-start');
  const priceEnd = document.getElementById('price-end');
  priceStart.addEventListener('change', setPriceValues);
  priceEnd.addEventListener('change', setPriceValues);
  */

//   function setPriceValues() {
//     let priceStartValue
//     let priceEndValue
//     if (priceStart.value != '') {
//       priceStartValue = priceStart.value
//     }
//     if (priceEnd.value != '') {
//       priceEndValue = priceEnd.value
//     }
//     priceSlider.noUiSlider.set([priceStartValue, priceEndValue])
//   }
// }

const searchDirection = document.querySelector('#searchDirection')
if (searchDirection) {
  const choices = new Choices(searchDirection, {
    silent: false,
    items: [],
    choices: [],
    renderChoiceLimit: 5,

    maxItemCount: -1,
    addItems: true,
    addItemFilter: null,
    removeItems: true,
    removeItemButton: false,
    editItems: false,
    duplicateItemsAllowed: true,
    delimiter: ',',
    paste: true,
    searchEnabled: true,
    searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 4,
    searchFields: ['label', 'value'],
    position: 'auto',
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    sorter: () => {},
    placeholder: true,
    placeholderValue: null,
    searchPlaceholderValue: null,
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: 'auto',
    loadingText: 'Loading...',
    noResultsText: 'Не найдено',
    noChoicesText: 'No choices to choose from',
    itemSelectText: '',
    addItemText: value => {
      return `Press Enter to add <b>"${value}"</b>`
    },
    maxItemText: maxItemCount => {
      return `Only ${maxItemCount} values can be added`
    },
    valueComparer: (value1, value2) => {
      return value1 === value2
    },
    classNames: {
      containerOuter: 'choices',
      containerInner: 'choices__inner',
      input: 'choices__input',
      inputCloned: 'choices__input--cloned',
      list: 'choices__list',
      listItems: 'choices__list--multiple',
      listSingle: 'choices__list--single',
      listDropdown: 'choices__list--dropdown',
      item: 'choices__item',
      itemSelectable: 'choices__item--selectable',
      itemDisabled: 'choices__item--disabled',
      itemChoice: 'choices__item--choice',
      placeholder: 'choices__placeholder',
      group: 'choices__group',
      groupHeading: 'choices__heading',
      button: 'choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices',
    },

    fuseOptions: {
      include: 'score',
    },
    callbackOnInit: null,
    callbackOnCreateTemplates: null,
  })
}

const searchTransport = document.querySelector('#searchTransport')
if (searchTransport) {
  const choices1 = new Choices(searchTransport, {
    silent: false,
    items: [],
    choices: [],
    renderChoiceLimit: -1,
    maxItemCount: -1,
    addItems: true,
    addItemFilter: null,
    removeItems: true,
    removeItemButton: false,
    editItems: false,
    duplicateItemsAllowed: true,
    delimiter: ',',
    paste: true,
    searchEnabled: false,
    // searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 4,
    searchFields: ['label', 'value'],
    position: 'auto',
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    sorter: () => {},
    placeholderValue: '23432423',
    searchPlaceholderValue: null,
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: 'auto',
    loadingText: 'Загрузка',
    noResultsText: 'Не найдено',
    noChoicesText: 'No choices to choose from',
    itemSelectText: '',
    addItemText: value => {
      return `Press Enter to add <b>"${value}"</b>`
    },
    maxItemText: maxItemCount => {
      return `Only ${maxItemCount} values can be added`
    },
    valueComparer: (value1, value2) => {
      return value1 === value2
    },
    classNames: {
      containerOuter: 'choices',
      containerInner: 'choices__inner',
      input: 'choices__input',
      inputCloned: 'choices__input--cloned',
      list: 'choices__list',
      listItems: 'choices__list--multiple',
      listSingle: 'choices__list--single',
      listDropdown: 'choices__list--dropdown',
      item: 'choices__item',
      itemSelectable: 'choices__item--selectable',
      itemDisabled: 'choices__item--disabled',
      itemChoice: 'choices__item--choice',
      placeholder: 'choices__placeholder',
      group: 'choices__group',
      groupHeading: 'choices__heading',
      button: 'choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices',
    },

    fuseOptions: {
      include: 'score',
    },
    callbackOnInit: null,
    callbackOnCreateTemplates: null,
  })
}

if (document.querySelector('#choiceGuide')) {
  const choiceGuide = document.querySelector('#choiceGuide')
  const choiceGuideItem = new Choices(choiceGuide, {
    silent: false,
    items: [],
    choices: [],
    renderChoiceLimit: -1,
    maxItemCount: -1,
    addItems: true,
    addItemFilter: null,
    removeItems: true,
    removeItemButton: false,
    editItems: false,
    duplicateItemsAllowed: true,
    delimiter: ',',
    paste: true,
    searchEnabled: false,
    // searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 4,
    searchFields: ['label', 'value'],
    position: 'auto',
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    sorter: () => {},
    placeholderValue: '23432423',
    searchPlaceholderValue: null,
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: 'auto',
    loadingText: 'Загрузка',
    noResultsText: 'Не найдено',
    noChoicesText: 'No choices to choose from',
    itemSelectText: '',
    addItemText: value => {
      return `Press Enter to add <b>"${value}"</b>`
    },
    maxItemText: maxItemCount => {
      return `Only ${maxItemCount} values can be added`
    },
    valueComparer: (value1, value2) => {
      return value1 === value2
    },
    classNames: {
      containerOuter: 'choices',
      containerInner: 'choices__inner',
      input: 'choices__input',
      inputCloned: 'choices__input--cloned',
      list: 'choices__list',
      listItems: 'choices__list--multiple',
      listSingle: 'choices__list--single',
      listDropdown: 'choices__list--dropdown',
      item: 'choices__item',
      itemSelectable: 'choices__item--selectable',
      itemDisabled: 'choices__item--disabled',
      itemChoice: 'choices__item--choice',
      placeholder: 'choices__placeholder',
      group: 'choices__group',
      groupHeading: 'choices__heading',
      button: 'choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices',
    },

    fuseOptions: {
      include: 'score',
    },
    callbackOnInit: null,
    callbackOnCreateTemplates: null,
  })
}

if (document.querySelector('#choiceTour')) {
  const choiceTour = document.querySelector('#choiceTour')
  const choiceTourItem = new Choices(choiceTour, {
    silent: false,
    items: [],
    choices: [],
    renderChoiceLimit: -1,
    maxItemCount: -1,
    addItems: true,
    addItemFilter: null,
    removeItems: true,
    removeItemButton: false,
    editItems: false,
    duplicateItemsAllowed: true,
    delimiter: ',',
    paste: true,
    searchEnabled: false,
    // searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 4,
    searchFields: ['label', 'value'],
    position: 'auto',
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    sorter: () => {},
    placeholderValue: '23432423',
    searchPlaceholderValue: null,
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: 'auto',
    loadingText: 'Загрузка',
    noResultsText: 'Не найдено',
    noChoicesText: 'No choices to choose from',
    itemSelectText: '',
    addItemText: value => {
      return `Press Enter to add <b>"${value}"</b>`
    },
    maxItemText: maxItemCount => {
      return `Only ${maxItemCount} values can be added`
    },
    valueComparer: (value1, value2) => {
      return value1 === value2
    },
    classNames: {
      containerOuter: 'choices',
      containerInner: 'choices__inner',
      input: 'choices__input',
      inputCloned: 'choices__input--cloned',
      list: 'choices__list',
      listItems: 'choices__list--multiple',
      listSingle: 'choices__list--single',
      listDropdown: 'choices__list--dropdown',
      item: 'choices__item',
      itemSelectable: 'choices__item--selectable',
      itemDisabled: 'choices__item--disabled',
      itemChoice: 'choices__item--choice',
      placeholder: 'choices__placeholder',
      group: 'choices__group',
      groupHeading: 'choices__heading',
      button: 'choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices',
    },

    fuseOptions: {
      include: 'score',
    },
    callbackOnInit: null,
    callbackOnCreateTemplates: null,
  })
}

/* ********************** */
// const picker = datepicker('#searchDate', {
//   // Event callbacks.
//   onSelect: instance => {
//     // Show which date was selected.
//     // console.log(instance.dateSelected)
//   },
//   onShow: instance => {
//     // console.log('Calendar showing.')
//   },
//   onHide: instance => {
//     // console.log('Calendar hidden.')
//   },
//   onMonthChange: instance => {
//     // Show the month of the selected date.
//     console.log(instance.currentMonthName)
//   },

//   // Customizations.
//   formatter: (input, date, instance) => {
//     // This will display the date as `1/1/2019`.
//     // input.value = date.toLocaleDateString()
//     // input.value = date.toDateString()
//   },
//   position: '', // Top right.
//   startDay: 1, // Calendar week starts on a Monday.
//   customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
//   customMonths: [
//     'Янв',
//     'Фев',
//     'Мар',
//     'Апр',
//     'Май',
//     'Июн',
//     'Июл',
//     'Авг',
//     'Сен',
//     'Окт',
//     'Ноя',
//     'Дек',
//   ],
//   customOverlayMonths: [
//     '😀',
//     '😂',
//     '😎',
//     '😍',
//     '🤩',
//     '😜',
//     '😬',
//     '😳',
//     '🤪',
//     '🤓 ',
//     '😝',
//     '😮',
//   ],
//   overlayButton: 'Go!',
//   overlayPlaceholder: 'Enter a 4-digit year',

//   // Settings.
//   // alwaysShow: true, // Never hide the calendar.
//   dateSelected: new Date(), // Today is selected.
//   maxDate: new Date(2099, 0, 1), // Jan 1st, 2099.
//   minDate: new Date(2016, 5, 1), // June 1st, 2016.
//   startDate: new Date(), // This month.
//   showAllDates: true, // Numbers for leading & trailing days outside the current month will show.

//   // Disabling things.
//   noWeekends: false, // Saturday's and Sunday's will be unselectable.
//   // disabler: date => date.getDay() === 2 && date.getMonth() === 9, // Disabled every Tuesday in October
//   disabledDates: [new Date(2050, 0, 1), new Date(2050, 0, 3)], // Specific disabled dates.
//   disableMobile: true, // Conditionally disabled on mobile devices.
//   disableYearOverlay: true, // Clicking the year or month will *not* bring up the year overlay.

//   // ID - be sure to provide a 2nd picker with the same id to create a daterange pair.
//   id: 1,
// })

if (document.querySelector('#filterWhereBuy')) {
  const filterWhereBuy = document.querySelector('#filterWhereBuy')
  const filterWhereBuyItem = new Choices(filterWhereBuy, {
    silent: false,
    items: [],
    choices: [],
    renderChoiceLimit: -1,
    maxItemCount: -1,
    addItems: true,
    addItemFilter: null,
    removeItems: true,
    removeItemButton: false,
    editItems: false,
    duplicateItemsAllowed: true,
    delimiter: ',',
    paste: true,
    searchEnabled: false,
    // searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 4,
    searchFields: ['label', 'value'],
    position: 'auto',
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    sorter: () => {},
    // placeholderValue: '23432423',
    searchPlaceholderValue: null,
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: 'auto',
    loadingText: 'Загрузка',
    noResultsText: 'Не найдено',
    noChoicesText: 'No choices to choose from',
    itemSelectText: '',
    addItemText: value => {
      return `Press Enter to add <b>"${value}"</b>`
    },
    maxItemText: maxItemCount => {
      return `Only ${maxItemCount} values can be added`
    },
    valueComparer: (value1, value2) => {
      return value1 === value2
    },
    classNames: {
      containerOuter: 'choices',
      containerInner: 'choices__inner',
      input: 'choices__input',
      inputCloned: 'choices__input--cloned',
      list: 'choices__list',
      listItems: 'choices__list--multiple',
      listSingle: 'choices__list--single',
      listDropdown: 'choices__list--dropdown',
      item: 'choices__item',
      itemSelectable: 'choices__item--selectable',
      itemDisabled: 'choices__item--disabled',
      itemChoice: 'choices__item--choice',
      placeholder: 'choices__placeholder',
      group: 'choices__group',
      groupHeading: 'choices__heading',
      button: 'choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices',
    },

    fuseOptions: {
      include: 'score',
    },
    callbackOnInit: null,
    callbackOnCreateTemplates: null,
  })
}

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



//<month lang>====================================================================================================
if (currentLanguage === 'ru') {
  customMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  customDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  overlayButton = 'Применить'
  overlayPlaceholder = 'Год (4 цифры)'
} else if (currentLanguage === 'ua') {
  customMonths = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень']
  customDays = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  overlayButton = 'Застосувати'
  overlayPlaceholder = 'Рік (4 цифри)'
}
//<month lang>====================================================================================================

const now = new Date()
let nextMonth
if (now.getMonth() == 11) {
  nextMonth = new Date(now.getFullYear() + 1, 0, 1)
} else {
  nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
}

//<Календарь на главной>====================================================================================================
if (document.querySelector('.main-search-date')) {
  const mainSearchDate = document.querySelector('.main-search-date')
  const mainSearchDateItem = datepicker(mainSearchDate, {
    customDays,
    customMonths,
    overlayButton,
    overlayPlaceholder,
    startDay: 1,
    position: 'br',
    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString()
      const val = value.split('.').reverse().join('-')
      input.value = val
    },
    onSelect: function (input, instance, date) {
      input_focus_add(input.el)
    },
  })
  // const dataFrom = input.getAttribute('data-from')
  // const dataTo = input.getAttribute('data-to')
  // if (dataFrom) {
  //   calendarItem.setMin(new Date(dataFrom))
  // }
  // if (dataTo) {
  //   calendarItem.setMax(new Date(dataTo))
  // }
}
//<Календарь на главной>====================================================================================================

//<Календарь на странице курс валют >====================================================================================================
if (document.querySelector('.calendar-archive')) {
  const calendar = document.querySelector('.calendar-archive__inner')
  const calendarItem = datepicker(calendar, {
    customDays,
    customMonths,
    overlayButton,
    overlayPlaceholder,
    startDay: 1,
    maxDate: new Date(),
    alwaysShow: true,

    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString()
      const formatedValue = value.split('.').reverse().join('-')
      input.value = formatedValue
    },
    onSelect: (instance, date) => {
      const value = date.toLocaleDateString()
      const formatedValue = value.split('.').reverse().join('-')

      console.log(formatedValue)
    },
    onShow: instance => {
      // console.log('Calendar showing.')
    },
  })
}
//<Календарь на странице курс валют >====================================================================================================

//<Календари на странице календарь>====================================================================================================
if (document.querySelector('.inner-calendar-page')) {
  //<calendar page>====================================================================================================
  const calendarPageStart = document.querySelector('.inner-calendar-page__start-item')
  const calendarPageEnd = document.querySelector('.inner-calendar-page__end-item')
  const calendarStart = datepicker(calendarPageStart, {
    customDays,
    customMonths,
    overlayButton,
    overlayPlaceholder,
    startDay: 1,
    alwaysShow: true,
    id: 5,
    dateSelected: new Date(),
    minDate: new Date(),
    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString()
      const formatedValue = value.split('.').reverse().join('-')
      input.value = formatedValue
    },

    onSelect: (instance, date) => {},
    onShow: instance => {
      // console.log('Calendar START.')
    },
  })

  const calendarEnd = datepicker(calendarPageEnd, {
    customDays,
    customMonths: customMonths,
    overlayButton,
    overlayPlaceholder: 'Год (4 цифры)',
    startDay: 1,
    alwaysShow: true,
    id: 5,
    startDate: nextMonth,

    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString()
      const formatedValue = value.split('.').reverse().join('-')
      input.value = formatedValue
    },

    onSelect: (instance, date) => {},
    onShow: instance => {},
    onMonthChange: instance => {},
  })
}
//<Календари на странице календарь>====================================================================================================

//<Календарь на странице Поиск тура>====================================================================================================
if (document.querySelector('.filter-form-date__start') || document.querySelector('.filter-form-date__end')) {
  const dateOption = {
    id: 1,
    customDays,
    customMonths,
    overlayButton,
    overlayPlaceholder,
    dateSelected: new Date(),
    minDate: new Date(),
    startDay: 1,
    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString()
      const val = value.split('.').reverse().join('-')
      input.value = val
    },
    onSelect: function (input, instance, date) {
      input_focus_add(input.el)
    },
  }

  document.querySelector('.filter-input-end').value = new Date().toLocaleDateString()
  const start = datepicker('.filter-input-start', dateOption)
  const end = datepicker('.filter-input-end', {
    id: 1,
    customDays,
    customMonths,
    overlayButton,
    overlayPlaceholder,
    minDate: new Date(),

    startDay: 1,
    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString()
      const val = value.split('.').reverse().join('-')
      input.value = val
    },
    onSelect: function (input, instance, date) {
      input_focus_add(input.el)
    },
  })
}
//<Календарь на странице Поиск тура>====================================================================================================

//<SORT SELECT on filter page>====================================================================================================
if (document.querySelector('.filter-header__sort')) {
  const filterPageSelect = document.querySelector('.filter-header__sort')
  const filterPageSelectItem = new Choices(filterPageSelect, {
    silent: false,
    items: [],
    choices: [],
    renderChoiceLimit: -1,
    maxItemCount: -1,

    delimiter: ',',

    searchEnabled: false,
    searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 4,
    searchFields: ['label', 'value'],
    position: 'auto',
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    sorter: () => {},
    placeholder: true,
    placeholderValue: null,
    searchPlaceholderValue: null,
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: 'auto',
    loadingText: 'Загрузка...',
    noResultsText: 'Не найдено',
    noChoicesText: 'No choices to choose from',
    itemSelectText: '',

    classNames: {
      containerOuter: 'choices',
      containerInner: 'choices__inner',
      input: 'choices__input',
      inputCloned: 'choices__input--cloned',
      list: 'choices__list',
      listItems: 'choices__list--multiple',
      listSingle: 'choices__list--single',
      listDropdown: 'choices__list--dropdown',
      item: 'choices__item',
      itemSelectable: 'choices__item--selectable',
      itemDisabled: 'choices__item--disabled',
      itemChoice: 'choices__item--choice',
      placeholder: 'choices__placeholder',
      group: 'choices__group',
      groupHeading: 'choices__heading',
      button: 'choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices',
    },

    fuseOptions: {
      include: 'score',
    },
    callbackOnInit: null,
    callbackOnCreateTemplates: null,
  })

  filterPageSelect.addEventListener('showDropdown', function (event) {
    console.log('sort select')
  })
}
//<SORT SELECT on filter page>====================================================================================================

//<SORT TOUR ON REVIEWS PAGE>====================================================================================================
if (document.querySelector('.item-sort-reviews__tour')) {
  const reviewsPageTour = document.querySelector('.item-sort-reviews__tour')
  const reviewsPageTourItem = new Choices(reviewsPageTour, {
    silent: false,
    items: [],
    choices: [],
    renderChoiceLimit: -1,
    maxItemCount: -1,
    delimiter: ',',
    searchEnabled: true,
    searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 4,
    searchFields: ['label', 'value'],
    position: 'auto',
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    sorter: () => {},
    placeholder: true,
    placeholderValue: null,
    searchPlaceholderValue: 'Поиск',
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: 'auto',
    loadingText: 'Загрузка...',
    noResultsText: 'Не найдено',
    noChoicesText: 'No choices to choose from',
    itemSelectText: '',

    classNames: {
      containerOuter: 'choices',
      containerInner: 'choices__inner',
      input: 'choices__input',
      inputCloned: 'choices__input--cloned',
      list: 'choices__list',
      listItems: 'choices__list--multiple',
      listSingle: 'choices__list--single',
      listDropdown: 'choices__list--dropdown',
      item: 'choices__item',
      itemSelectable: 'choices__item--selectable',
      itemDisabled: 'choices__item--disabled',
      itemChoice: 'choices__item--choice',
      placeholder: 'choices__placeholder',
      group: 'choices__group',
      groupHeading: 'choices__heading',
      button: 'choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices',
    },

    fuseOptions: {
      include: 'score',
    },
    callbackOnInit: null,
    callbackOnCreateTemplates: null,
  })

  reviewsPageTour.addEventListener('showDropdown', function (event) {
    console.log('sort tour')
  })
}
//<SORT TOUR ON REVIEWS PAGE>====================================================================================================

//<SORT GUIDE ON REVIEWS PAGE>====================================================================================================
if (document.querySelector('.item-sort-reviews__guide')) {
  const reviewsPageGuide = document.querySelector('.item-sort-reviews__guide')

  const reviewsPageGuideItem = new Choices(reviewsPageGuide, {
    silent: false,
    items: [],
    choices: [],
    renderChoiceLimit: -1,
    maxItemCount: -1,

    delimiter: ',',

    searchEnabled: true,
    searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 4,
    searchFields: ['label', 'value'],
    position: 'auto',
    resetScrollPosition: true,
    placeholder: true,
    placeholderValue: 'null',
    searchPlaceholderValue: 'Поиск',
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: 'auto',
    loadingText: 'Загрузка...',
    noResultsText: 'Не найдено',
    noChoicesText: 'No choices to choose from',
    itemSelectText: '',

    classNames: {
      containerOuter: 'choices',
      containerInner: 'choices__inner',
      input: 'choices__input',
      inputCloned: 'choices__input--cloned',
      list: 'choices__list',
      listItems: 'choices__list--multiple',
      listSingle: 'choices__list--single',
      listDropdown: 'choices__list--dropdown',
      item: 'choices__item',
      itemSelectable: 'choices__item--selectable',
      itemDisabled: 'choices__item--disabled',
      itemChoice: 'choices__item--choice',
      placeholder: 'choices__placeholder',
      group: 'choices__group',
      groupHeading: 'choices__heading',
      button: 'choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices',
    },

    fuseOptions: {
      include: 'score',
    },
    callbackOnInit: null,
    callbackOnCreateTemplates: null,
  })

  reviewsPageGuide.addEventListener('showDropdown', function (event) {
    console.log('sort guide')
  })
}
//<SORT GUIDE ON REVIEWS PAGE>====================================================================================================

//<SORT DATE ON REVIEWS PAGE>====================================================================================================
if (document.querySelector('.item-sort-reviews__date')) {
  const reviewsPageDate = document.querySelector('.item-sort-reviews__date')

  const reviewsPageDateItem = new Choices(reviewsPageDate, {
    silent: false,
    items: [],
    choices: [],
    renderChoiceLimit: -1,
    maxItemCount: -1,

    delimiter: ',',

    searchEnabled: false,
    searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 4,
    searchFields: ['label', 'value'],
    position: 'auto',
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    sorter: () => {},
    placeholder: true,
    placeholderValue: null,
    searchPlaceholderValue: null,
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: 'auto',
    loadingText: 'Загрузка...',
    noResultsText: 'Не найдено',
    noChoicesText: 'No choices to choose from',
    itemSelectText: '',

    classNames: {
      containerOuter: 'choices',
      containerInner: 'choices__inner',
      input: 'choices__input',
      inputCloned: 'choices__input--cloned',
      list: 'choices__list',
      listItems: 'choices__list--multiple',
      listSingle: 'choices__list--single',
      listDropdown: 'choices__list--dropdown',
      item: 'choices__item',
      itemSelectable: 'choices__item--selectable',
      itemDisabled: 'choices__item--disabled',
      itemChoice: 'choices__item--choice',
      placeholder: 'choices__placeholder',
      group: 'choices__group',
      groupHeading: 'choices__heading',
      button: 'choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices',
    },

    fuseOptions: {
      include: 'score',
    },
    callbackOnInit: null,
    callbackOnCreateTemplates: null,
  })

  reviewsPageDate.addEventListener('showDropdown', function (event) {
    console.log('sort date')
  })
}
//<SORT DATE ON REVIEWS PAGE>====================================================================================================

//<SORT RATING ON REVIEWS PAGE>====================================================================================================
if (document.querySelector('.item-sort-reviews__rating')) {
  const reviewsPageRating = document.querySelector('.item-sort-reviews__rating')

  const reviewsPageRatingItem = new Choices(reviewsPageRating, {
    silent: false,
    items: [],
    choices: [],
    renderChoiceLimit: -1,
    maxItemCount: -1,

    delimiter: ',',

    searchEnabled: false,
    searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 4,
    searchFields: ['label', 'value'],
    position: 'auto',
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    sorter: () => {},
    placeholder: true,
    placeholderValue: null,
    searchPlaceholderValue: null,
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: 'auto',
    loadingText: 'Загрузка...',
    noResultsText: 'Не найдено',
    noChoicesText: 'No choices to choose from',
    itemSelectText: '',

    classNames: {
      containerOuter: 'choices',
      containerInner: 'choices__inner',
      input: 'choices__input',
      inputCloned: 'choices__input--cloned',
      list: 'choices__list',
      listItems: 'choices__list--multiple',
      listSingle: 'choices__list--single',
      listDropdown: 'choices__list--dropdown',
      item: 'choices__item',
      itemSelectable: 'choices__item--selectable',
      itemDisabled: 'choices__item--disabled',
      itemChoice: 'choices__item--choice',
      placeholder: 'choices__placeholder',
      group: 'choices__group',
      groupHeading: 'choices__heading',
      button: 'choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices',
    },

    fuseOptions: {
      include: 'score',
    },
    callbackOnInit: null,
    callbackOnCreateTemplates: null,
  })

  reviewsPageRating.addEventListener('showDropdown', function (event) {
    console.log('sort rating')
  })
}
//<SORT RATING ON REVIEWS PAGE>====================================================================================================


let scr_body = document.querySelector('body');
let scr_blocks = document.querySelectorAll('._scr-sector');
let scr_items = document.querySelectorAll('._scr-item');
let scr_fix_block = document.querySelectorAll('._side-wrapper');
let scr_min_height = 750;

let scrolling = true;
let scrolling_full = true;

let scrollDirection = 0;

let currentScroll;

//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll);
function scroll_scroll() {
	let src_value = currentScroll = pageYOffset;
	let header = document.querySelector('header.header');
	if (header !== null) {
		if (src_value > 10) {
			header.classList.add('_scroll');
		} else {
			header.classList.remove('_scroll');
		}
	}
	if (scr_blocks.length > 0) {
		for (let index = 0; index < scr_blocks.length; index++) {
			let block = scr_blocks[index];
			let block_offset = offset(block).top;
			let block_height = block.offsetHeight;

			/*
			if ((src_value > block_offset - block_height) && src_value < (block_offset + block_height) && window.innerHeight > scr_min_height && window.innerWidth > 992) {
				let scrProcent = (src_value - block_offset) / block_height * 100;
				scrParallax(block, scrProcent, block_height);
			}
			*/

			if ((pageYOffset > block_offset - window.innerHeight / 1.5) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				block.classList.add('_scr-sector_active');
			} else {
				if (block.classList.contains('_scr-sector_active')) {
					block.classList.remove('_scr-sector_active');
				}
			}
			if ((pageYOffset > block_offset - window.innerHeight / 2) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				if (!block.classList.contains('_scr-sector_current')) {
					block.classList.add('_scr-sector_current');
				}
			} else {
				if (block.classList.contains('_scr-sector_current')) {
					block.classList.remove('_scr-sector_current');
				}
			}
		}
	}
	if (scr_items.length > 0) {
		for (let index = 0; index < scr_items.length; index++) {
			let scr_item = scr_items[index];
			let scr_item_offset = offset(scr_item).top;
			let scr_item_height = scr_item.offsetHeight;


			let scr_item_point = window.innerHeight - (window.innerHeight - scr_item_height / 3);
			if (window.innerHeight > scr_item_height) {
				scr_item_point = window.innerHeight - scr_item_height / 3;
			}

			if ((src_value > scr_item_offset - scr_item_point) && src_value < (scr_item_offset + scr_item_height)) {
				scr_item.classList.add('_active');
				scroll_load_item(scr_item);
			} else {
				scr_item.classList.remove('_active');
			}
			if (((src_value > scr_item_offset - window.innerHeight))) {
				if (scr_item.querySelectorAll('._lazy').length > 0) {
					scroll_lazy(scr_item);
				}
			}
		}
	}
	if (scr_fix_block.length > 0) {
		fix_block(scr_fix_block, src_value);
	}
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	if (custom_scroll_line) {
		let window_height = window.innerHeight;
		let content_height = document.querySelector('.wrapper').offsetHeight;
		let scr_procent = (pageYOffset / (content_height - window_height)) * 100;
		let custom_scroll_line_height = custom_scroll_line.offsetHeight;
		custom_scroll_line.style.transform = "translateY(" + (window_height - custom_scroll_line_height) / 100 * scr_procent + "px)";
	}
	if (src_value > scrollDirection) {
		// downscroll code
	} else {
		// upscroll code
	}
	scrollDirection = src_value <= 0 ? 0 : src_value;
}
setTimeout(function () {
	//document.addEventListener("DOMContentLoaded", scroll_scroll);
	scroll_scroll();
}, 100);

function scroll_lazy(scr_item) {
	/*
	let lazy_src = scr_item.querySelectorAll('*[data-src]');
	if (lazy_src.length > 0) {
		for (let index = 0; index < lazy_src.length; index++) {
			const el = lazy_src[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('src', el.getAttribute('data-src'));
				el.classList.add('_loaded');
			}
		}
	}
	let lazy_srcset = scr_item.querySelectorAll('*[data-srcset]');
	if (lazy_srcset.length > 0) {
		for (let index = 0; index < lazy_srcset.length; index++) {
			const el = lazy_srcset[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('srcset', el.getAttribute('data-srcset'));
				el.classList.add('_loaded');
			}
		}
	}
	*/
	/*
	window.onload = () => {
		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					console.log(entry)
					// ссылка на оригинальное изображение хранится в атрибуте "data-src"
					entry.target.src = entry.target.dataset.src
					observer.unobserve(entry.target)
				}
			})
		}, { threshold: 0.5 })

		document.querySelectorAll('img').forEach(img => observer.observe(img))
	}
	*/
}
function scroll_load_item(scr_item) {
	if (scr_item.classList.contains('_load-map') && !scr_item.classList.contains('_loaded-map')) {
		let map_item = document.getElementById('map');
		if (map_item) {
			scr_item.classList.add('_loaded-map');
			map();
		}
	}
}
function scrParallax(block, scrProcent, blockHeight) {
	let prlxItems = block.querySelectorAll('._prlx-item');
	if (prlxItems.length > 0) {
		for (let index = 0; index < prlxItems.length; index++) {
			const prlxItem = prlxItems[index];
			let prlxItemAttr = (prlxItem.dataset.prlx) ? prlxItem.dataset.prlx : 3;
			const prlxItemValue = -1 * (blockHeight / 100 * scrProcent / prlxItemAttr);
			prlxItem.style.cssText = `transform: translateY(${prlxItemValue}px);`;
		}
	}
}
//FullScreenScroll
if (scr_blocks.length > 0 && !isMobile.any()) {
	disableScroll();
	window.addEventListener('wheel', full_scroll);

	let swiperScrolls = document.querySelectorAll('._swiper_scroll');

	if (swiperScrolls.length > 0) {
		for (let index = 0; index < swiperScrolls.length; index++) {
			const swiperScroll = swiperScrolls[index];
			swiperScroll.addEventListener("mouseenter", function (e) {
				window.removeEventListener('wheel', full_scroll);
			});
			swiperScroll.addEventListener("mouseleave", function (e) {
				window.addEventListener('wheel', full_scroll);
			});
		}
	}
}
function getPrevBlockPos(current_block_prev) {
	let viewport_height = window.innerHeight;
	let current_block_prev_height = current_block_prev.offsetHeight;
	let block_pos = offset(current_block_prev).top;

	if (current_block_prev_height >= viewport_height) {
		block_pos = block_pos + (current_block_prev_height - viewport_height);
	}
	return block_pos;
}
function full_scroll(e) {
	let viewport_height = window.innerHeight;
	if (viewport_height >= scr_min_height) {
		if (scrolling_full) {
			let current_block = document.querySelector('._scr-sector._scr-sector_current');
			let current_block_pos = offset(current_block).top;
			let current_block_height = current_block.offsetHeight;
			let current_block_next = current_block.nextElementSibling;
			let current_block_prev = current_block.previousElementSibling;
			if (e.keyCode == 40 || e.keyCode == 34 || e.deltaX > 0 || e.deltaY < 0) {
				if (current_block_height <= viewport_height) {
					if (current_block_prev) {
						full_scroll_to_sector(getPrevBlockPos(current_block_prev));
					}
				} else {
					enableScroll();
					if (currentScroll <= current_block_pos) {
						if (current_block_prev) {
							full_scroll_to_sector(getPrevBlockPos(current_block_prev));
						}
					}
				}
			} else if (e.keyCode == 38 || e.keyCode == 33 || e.deltaX < 0 || e.deltaY > 0) {
				if (current_block_height <= viewport_height) {
					if (current_block_next) {
						let block_pos = offset(current_block_next).top;
						full_scroll_to_sector(block_pos);
					}
				} else {
					enableScroll();
					if (current_block_next) {
						let block_pos = offset(current_block_next).top;
						if (currentScroll >= block_pos - viewport_height) {
							full_scroll_to_sector(block_pos);
						}
					}
				}
			}
		} else {
			disableScroll();
		}
	} else {
		enableScroll();
	}
}
function full_scroll_to_sector(pos) {
	disableScroll();
	scrolling_full = false;
	_goto(pos, 800);

	let scr_pause = 500;
	if (navigator.appVersion.indexOf("Mac") != -1) {
		scr_pause = 1000;
	};
	setTimeout(function () {
		scrolling_full = true;
	}, scr_pause);
}
function full_scroll_pagestart() { }
function full_scroll_pageend() { }

//ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block');
if (link) {
	let blocks = [];
	for (let index = 0; index < link.length; index++) {
		let el = link[index];
		let block_name = el.getAttribute('href').replace('#', '');
		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}
		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body._active')) {
				menu_close();
				body_lock_remove(500);
			}
			let target_block_class = el.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		})
	}

	window.addEventListener('scroll', function (el) {
		let old_current_link = document.querySelectorAll('._goto-block._active');
		if (old_current_link) {
			for (let index = 0; index < old_current_link.length; index++) {
				let el = old_current_link[index];
				el.classList.remove('_active');
			}
		}
		for (let index = 0; index < blocks.length; index++) {
			let block = blocks[index];
			let block_item = document.querySelector('.' + block);
			if (block_item) {
				let block_offset = offset(block_item).top;
				let block_height = block_item.offsetHeight;
				if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
					let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
					for (let index = 0; index < current_links.length; index++) {
						let current_link = current_links[index];
						current_link.classList.add('_active');
					}
				}
			}
		}
	})
}
//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('._goto');
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		let goto_link = goto_links[index];
		goto_link.addEventListener('click', function (e) {
			let target_block_class = goto_link.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		});
	}
}
function _goto(target_block, speed, offset = 0) {
	let header = '';
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
}

//SameFunctions
function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}
function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}*/
}

function fix_block(scr_fix_block, scr_value) {
	let window_width = parseInt(window.innerWidth);
	let window_height = parseInt(window.innerHeight);
	let header_height = parseInt(document.querySelector('header').offsetHeight) + 15;
	for (let index = 0; index < scr_fix_block.length; index++) {
		const block = scr_fix_block[index];
		let block_width = block.getAttribute('data-width');
		const item = block.querySelector('._side-block');
		if (!block_width) { block_width = 0; }
		if (window_width > block_width) {
			if (item.offsetHeight < window_height - (header_height + 30)) {
				if (scr_value > offset(block).top - (header_height + 15)) {
					item.style.cssText = "position:fixed;bottom:auto;top:" + header_height + "px;width:" + block.offsetWidth + "px;left:" + offset(block).left + "px;";
				} else {
					gotoRelative(item);
				}
				if (scr_value > (block.offsetHeight + offset(block).top) - (item.offsetHeight + (header_height + 15))) {
					block.style.cssText = "position:relative;";
					item.style.cssText = "position:absolute;bottom:0;top:auto;left:0px;width:100%";
				}
			} else {
				gotoRelative(item);
			}
		}
	}
	function gotoRelative(item) {
		item.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;";
	}
}

if (!isMobile.any()) {
	//custom_scroll();
	/*
	window.addEventListener('wheel', scroll_animate, {
		capture: true,
		passive: true
	});
	window.addEventListener('resize', custom_scroll, {
		capture: true,
		passive: true
	});
	*/
}
function custom_scroll(event) {
	scr_body.style.overflow = 'hidden';
	let window_height = window.innerHeight;
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	let custom_scroll_content_height = document.querySelector('.wrapper').offsetHeight;
	let custom_cursor_height = Math.min(window_height, Math.round(window_height * (window_height / custom_scroll_content_height)));
	if (custom_scroll_content_height > window_height) {
		if (!custom_scroll_line) {
			let custom_scroll = document.createElement('div');
			custom_scroll_line = document.createElement('div');
			custom_scroll.setAttribute('class', '_custom-scroll');
			custom_scroll_line.setAttribute('class', '_custom-scroll__line');
			custom_scroll.appendChild(custom_scroll_line);
			scr_body.appendChild(custom_scroll);
		}
		custom_scroll_line.style.height = custom_cursor_height + 'px';
	}
}

let new_pos = pageYOffset;
function scroll_animate(event) {
	let window_height = window.innerHeight;
	let content_height = document.querySelector('.wrapper').offsetHeight;
	let start_position = pageYOffset;
	let pos_add = 100;

	if (event.keyCode == 40 || event.keyCode == 34 || event.deltaX > 0 || event.deltaY < 0) {
		new_pos = new_pos - pos_add;
	} else if (event.keyCode == 38 || event.keyCode == 33 || event.deltaX < 0 || event.deltaY > 0) {
		new_pos = new_pos + pos_add;
	}
	if (new_pos > (content_height - window_height)) new_pos = content_height - window_height;
	if (new_pos < 0) new_pos = 0;

	if (scrolling) {
		scrolling = false;
		_goto(new_pos, 1000);

		let scr_pause = 100;
		if (navigator.appVersion.indexOf("Mac") != -1) {
			scr_pause = scr_pause * 2;
		};
		setTimeout(function () {
			scrolling = true;
			_goto(new_pos, 1000);
		}, scr_pause);
	}
	//If native scroll
	//disableScroll();
}



