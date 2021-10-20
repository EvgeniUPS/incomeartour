const swiper = new Swiper('.main-slider', {
  // Optional parameters
  // direction: 'vertical',
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

const changeViewButton = document.querySelector('#changeViewButton')
const itemTour = document.querySelectorAll('.item-tour')
const itemList = document.querySelector('.tour-list')

const changeViewHandler = e => {
  itemList.classList.toggle('tour-list_list')
  itemList.classList.toggle('tour-list_grid')
  console.log(e.target)

  itemTour.forEach(item => {
    item.classList.toggle('item-tour_list')
    item.classList.toggle('item-tour_grid')
    console.log(item)
  })

  if (changeViewButton.innerHTML === 'List') {
    changeViewButton.innerHTML = 'Grid'
  } else {
    changeViewButton.innerHTML = 'List'
  }
}
if (changeViewButton) {
  changeViewButton.addEventListener('click', changeViewHandler)
}

tippy('.tooltip-link', {
  duration: 0,
  animation: 'fade',
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
    // when window width is >= 480px
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    992: {
      slidesPerView: 4.5,
      spaceBetween: 10,
    },
  },
})
