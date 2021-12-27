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
