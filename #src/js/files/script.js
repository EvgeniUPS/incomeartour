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
if (changeViewButton) {
  changeViewButton.addEventListener('click', changeViewHandler)
}

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

const searchFormDirection = document.querySelector(
  '.search-form__direction select'
)

// searchFormDirection.addEventListener('change', e => {})

// searchBtn.addEventListener('click', searchForm)

const subMenuLink = document.querySelectorAll('.has-submenu')

/* ******************** */
// var acc = document.getElementsByClassName('accordion')
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

// const readMoreBtns = document.querySelectorAll('._read-more-btn')

// if (readMoreBtns) {
//   readMoreBtns.forEach(item => {
//     const moreBtnText = 'Развернуть'
//     const lessBtnText = 'Свернуть'
//     item.innerHTML = moreBtnText
//     item.addEventListener('click', e => {
//       readMoreBtns.forEach(el => {
//         el.classList.remove('_active')
//       })
//       const lineLimit = 2
//       const targetItem = e.target
//       const targetPrevious = targetItem.previousElementSibling
//       const targetPreviousHeight = targetPrevious.offsetHeight
//       targetItem.classList.toggle('_active')
//       targetPrevious.classList.toggle('_active')

//       if (targetItem.innerHTML == moreBtnText) {
//         targetItem.innerHTML = lessBtnText
//       } else if (targetItem.innerHTML == lessBtnText) {
//         targetItem.innerHTML = moreBtnText
//       }
//     })
//   })
// }

if (document.querySelector('.simple-rating')) {
  const simpleRatingWrapper = document.querySelector('.simple-rating')
  const simpleRatingBottom = document.querySelector('.simple-rating__bottom')

  simpleRatingWrapper.addEventListener('click', function (e) {
    simpleRatingBottom.querySelector('span').innerHTML = e.target.value
    simpleRatingBottom.style.opacity = '1'
  })
}

//
