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
