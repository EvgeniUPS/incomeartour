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

// flatpickr('#flatDate', {
//   altInput: true,
//   altFormat: 'F j, Y',
//   dateFormat: 'Y-m-d',
// })
