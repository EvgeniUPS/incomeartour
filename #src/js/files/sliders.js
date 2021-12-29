//BildSlider
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
