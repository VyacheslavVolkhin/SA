document.addEventListener("DOMContentLoaded", function () {

  //fancybox
  Fancybox.bind("[data-fancybox]", {
    //settings
  });
  



  //mobile filter functionals
  let buttonsFilterBack = document.querySelectorAll('.js-filter-back');
  let buttonFilterShow = document.querySelector('.js-filter-show');
	if (buttonFilterShow) {
		buttonFilterShow.addEventListener('click', function(event) {
			document.body.classList.add('filter-showed');
			event.preventDefault();
		});
		buttonsFilterBack.forEach(function(buttonFilterBack) {
			buttonFilterBack.addEventListener('click', function(event) {
				if (this.closest('.js-popup-wrap')) {
					let popupWrap = this.closest('.js-popup-wrap');
					if (popupWrap) {
						let toggleButton = popupWrap.querySelector('.js-btn-popup-toggle');
						if (toggleButton) {
							toggleButton.classList.remove('active');
						}
					}
				} else {
					document.body.classList.remove('filter-showed');
				}
				event.preventDefault();
			});
		});
	}

	

  //form input clear
  const inputFields = document.querySelectorAll(".frm-field-input-action .form-input");
  const clearButtons = document.querySelectorAll(".button-field-clear");
  
  for (let i = 0; i < inputFields.length; i++) {
	const inputField = inputFields[i
	];
	const form = inputField.closest(".frm-field-input-action");
  
	inputField.addEventListener("input", function () {
	  if (inputField.value.length > 0) {
		form.classList.add("inp-valid");
		} else {
		form.classList.remove("inp-valid");
		}
	});
  }
  for (let i = 0; i < clearButtons.length; i++) {
	const clearButton = clearButtons[i
	];
	clearButton.addEventListener("click", function (event) {
	  this.closest(".frm-field-input-action").querySelector(".form-input").value = "";
	  this.closest(".frm-field-input-action").classList.remove("inp-valid");
	  event.preventDefault();
	});
  }

  

  //field-select checkboxes
  const buttonSelects = document.querySelectorAll('.js-field-button-select');
  
  function updateButtonTitle(button) {
	const checkboxes = button.closest('.js-field-select').querySelectorAll(' input[type="checkbox"]');
	const selectedTexts = Array.from(checkboxes)
		.filter(checkbox => checkbox.checked)
		.map(checkbox => checkbox.nextElementSibling.textContent);
	
	const buttonTitle = button.querySelector('.button-title');
	buttonTitle.textContent = selectedTexts.length > 0 ? selectedTexts.join(', ') : buttonTitle.dataset.placeholder;
  
	if (selectedTexts.length > 0) {
		button.setAttribute('data-count', selectedTexts.length);
	} else {
		button.removeAttribute('data-count');
	}
  }
  
  buttonSelects.forEach(button => {
	updateButtonTitle(button);
	button.addEventListener('click', function (e) {
		e.preventDefault();
		buttonSelects.forEach(otherButton => {
			if (otherButton !== button) {
				otherButton.classList.remove('active');
			}
		});
		updateButtonTitle(this);
	});
	
	const checkboxes = button.closest('.js-field-select').querySelectorAll(' input[type="checkbox"]');
	checkboxes.forEach(checkbox => {
		checkbox.addEventListener('change', function () {
			updateButtonTitle(button);
		});
	});
  });
  
  document.addEventListener('click', function (e) {
	if (!e.target.closest('.js-field-select')) {
		buttonSelects.forEach(button => {
			if (button.classList.contains('active')) {
				button.classList.remove('active');
			}
		});
	}
  });
  
  document.addEventListener('click', function (e) {
	if (!e.target.closest('.js-field-select')) {
		buttonSelects.forEach(button => {
			button.classList.remove('active');
		});
	}
  });




  //select toggle content visibility
  const inputs = document.querySelectorAll(
    "input[data-content], input[data-content-check], input[data-content-uncheck]"
  );
  console.log("test");

  inputs.forEach(function (input) {
    toggleContent(input);
  });

  inputs.forEach((input) => {
    input.addEventListener("click", function () {
      document.querySelectorAll(".frm-content").forEach((content) => {
        content.classList.remove("active");
      });

      inputs.forEach(toggleContent);
    });
  });

  function toggleContent(input) {
    let selectContent;
    if (input.checked) {
      selectContent =
        input.getAttribute("data-content-check") ||
        input.getAttribute("data-content");
    } else {
      selectContent = input.getAttribute("data-content-uncheck");
    }
    document
      .querySelectorAll('.frm-content[data-content="' + selectContent + '"]')
      .forEach((content) => {
        content.classList.add("active");
      });
  }

  //btn tgl and add
  let tglButtons = document.querySelectorAll(".js-btn-tgl");
  let addButtons = document.querySelectorAll(".js-btn-add");
  for (i = 0; i < tglButtons.length; i++) {
    tglButtons[i].addEventListener("click", function (e) {
      this.classList.contains("active")
        ? this.classList.remove("active")
        : this.classList.add("active");
      e.preventDefault();
      return false;
    });
  }
  for (i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function (e) {
      if (!this.classList.contains("active")) {
        this.classList.add("active");
        e.preventDefault();
        return false;
      }
    });
  }
  let buttonsTglOne = document.querySelectorAll(".js-btn-tgl-one");
  buttonsTglOne.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      let row = this.closest(".row");
      row.querySelectorAll(".js-btn-tgl-one").forEach(function (btn) {
        btn.classList.remove("active");
      });
      row.querySelectorAll(".js-btn-tgl-one").forEach(function (btn) {
        btn.classList.remove("active");
      });
      this.classList.add("active");
      return false;
    });
  });

  //js popup wrap
  const togglePopupButtons = document.querySelectorAll(".js-btn-popup-toggle");
  const closePopupButtons = document.querySelectorAll(".js-btn-popup-close");
  const popupElements = document.querySelectorAll(".js-popup-wrap");
  const wrapWidth = document.querySelector(".wrap").offsetWidth;
  const bodyElem = document.querySelector("body");
  function popupElementsClear() {
    document.body.classList.remove("menu-show");
    document.body.classList.remove("filter-show");
    document.body.classList.remove("search-show");
    popupElements.forEach((element) => element.classList.remove("popup-right"));
  }
  function popupElementsClose() {
    togglePopupButtons.forEach((element) => {
      if (!element.closest(".no-close")) {
        element.classList.remove("active");
      }
    });
  }
  function popupElementsContentPositionClass() {
    popupElements.forEach((element) => {
      let pLeft = element.offsetLeft;
      let pWidth = element.querySelector(".js-popup-block").offsetWidth;
      let pMax = pLeft + pWidth;
      if (pMax > wrapWidth) {
        element.classList.add("popup-right");
      } else {
        element.classList.remove("popup-right");
      }
    });
  }
  for (i = 0; i < togglePopupButtons.length; i++) {
    togglePopupButtons[i].addEventListener("click", function (e) {
      popupElementsClear();
      if (this.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        popupElementsClose();
        this.classList.add("active");
        if (this.closest(".popup-menu-wrap")) {
          document.body.classList.add("menu-show");
        }
        if (this.closest(".popup-search-wrap")) {
          document.body.classList.add("search-show");
        }
        if (this.closest(".popup-filter-wrap")) {
          document.body.classList.add("filter-show");
        }
        popupElementsContentPositionClass();
      }
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  }
  for (i = 0; i < closePopupButtons.length; i++) {
    closePopupButtons[i].addEventListener("click", function (e) {
      popupElementsClear();
      popupElementsClose();
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  }
  document.onclick = function (event) {
    if (!event.target.closest(".js-popup-block")) {
      popupElementsClear();
      popupElementsClose();
    }
  };
  popupElements.forEach((element) => {
    if (element.classList.contains("js-popup-select")) {
      let popupElementSelectItem = element.querySelectorAll(
        ".js-popup-block li a"
      );
      if (element.querySelector(".js-popup-block .active")) {
        element.classList.add("select-active");
        let popupElementActive = element.querySelector(
          ".js-popup-block .active"
        ).innerHTML;
        let popupElementButton = element.querySelector(".js-btn-popup-toggle");
        popupElementButton.innerHTML = "";
        popupElementButton.insertAdjacentHTML("beforeend", popupElementActive);
      } else {
        element.classList.remove("select-active");
      }
      for (i = 0; i < popupElementSelectItem.length; i++) {
        popupElementSelectItem[i].addEventListener("click", function (e) {
          this.closest(".js-popup-wrap").classList.add("select-active");
          if (
            this.closest(".js-popup-wrap").querySelector(
              ".js-popup-block .active"
            )
          ) {
            this.closest(".js-popup-wrap")
              .querySelector(".js-popup-block .active")
              .classList.remove("active");
          }
          this.classList.add("active");
          let popupElementActive = element.querySelector(
            ".js-popup-block .active"
          ).innerHTML;
          let popupElementButton = element.querySelector(
            ".js-btn-popup-toggle"
          );
          popupElementButton.innerHTML = "";
          popupElementButton.insertAdjacentHTML(
            "beforeend",
            popupElementActive
          );
          popupElementsClear();
          popupElementsClose();
          if (!this.closest(".js-tabs-nav")) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        });
      }
    }
  });

  //js tabs
  const tabsNav = document.querySelectorAll('.js-tabs-nav')
  const tabsBlocks = document.querySelectorAll('.js-tab-block')
  const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
  const tabsButtonContent = document.querySelectorAll('.js-tab-content')
  function tabsActiveStart() {
	for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
		if (tabsBlocks[iTab].classList.contains('active')) {
			tabsBlocks[iTab].classList.remove('active')
		}
	}
	for (i = 0; i < tabsNav.length; i++) {
		let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
		for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
			if (tabsNavElements[iElements].classList.contains('active')) {
				let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
				for (j = 0; j < tabsBlocks.length; j++) {
					if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
						console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
						tabsBlocks[j].classList.add('active')
					}
				}
			}
		}
	}
	
  }
  for (i = 0; i < tabsButtonTitle.length; i++) {
	tabsButtonTitle[i].addEventListener('click', function (e) {
		this.classList.toggle('active')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
  }
  for (i = 0; i < tabsNav.length; i++) {
	tabsNav[i].addEventListener('click', function (e) {
		if (e.target.closest('[data-tab]')) {
			let tabsNavElements = this.querySelector('[data-tab].active')
			tabsNavElements ? tabsNavElements.classList.remove('active') : false
			e.target.closest('[data-tab]').classList.add('active')
			alert('ddd')
			tabsActiveStart()
			e.preventDefault()
			e.stopPropagation()
			return false
		}
	})
  }
  tabsActiveStart()

  // Popups
  let popupCurrent;
  let popupsList = document.querySelectorAll(".popup-outer-box");

  document.querySelectorAll(".js-popup-open").forEach(function (element) {
    element.addEventListener("click", function (e) {
      document.querySelector(".popup-outer-box").classList.remove("active");
      document.body.classList.add("popup-open");

      popupCurrent = this.getAttribute("data-popup");
      document
        .querySelector(
          `.popup-outer-box[id="${popupCurrent}"
			]`
        )
        .classList.add("active");

      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  });
  document.querySelectorAll(".js-popup-close").forEach(function (element) {
    element.addEventListener("click", function (event) {
      document.body.classList.remove("popup-open");
      for (i = 0; i < popupsList.length; i++) {
        popupsList[i].classList.remove("active");
      }
      event.preventDefault();
      event.stopPropagation();
    });
  });
  document.querySelectorAll(".popup-outer-box").forEach(function (element) {
    element.addEventListener("click", function (event) {
      if (!event.target.closest(".popup-box")) {
        document.body.classList.remove("popup-open");
        document.body.classList.remove("popup-open-scroll");
        document.querySelectorAll(".popup-outer-box").forEach(function (e) {
          e.classList.remove("active");
        });
        return false;
      }
    });
  });


  //slider filter
  const swiperSliderFilter = new Swiper('.slider-filter .swiper', {
	loop: false,
	slidesPerView: 'auto',
	spaceBetween: 0,
	autoHeight: true,
	speed: 400,
	pagination: false,
	autoplay: false,
	navigation: false,
	freeMode: true,
  });


  //slider tilesMain
  const swiperSlidersliderName = new Swiper(".slider-tilesMain .swiper", {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: false,
    speed: 400,
    pagination: {
      el: ".slider-tilesMain-pagination",
      clickable: true,
    },
    autoplay: false,
    navigation: false,
  });

  // tiles slider
  const sliders = document.querySelectorAll(".slider-tiles");
  sliders.forEach((slider) => {
    const dataCol = slider.getAttribute("data-col") || 1;
    const swiper = new Swiper(slider.querySelector(".swiper"), {
      loop: false,
      slidesPerView: "auto",
      spaceBetween: 0,
      autoHeight: false,
      speed: 400,
      pagination: false,
      autoplay: false,
      navigation: {
        nextEl: slider.querySelector(
          ".btn-action-ico.ico-arrow.ico-arrow-next.button-slider-tiles-next"
        ),
        prevEl: slider.querySelector(
          ".btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-tiles-prev"
        ),
      },
      breakpoints: {
        1024: {
          slidesPerView:
            dataCol === "auto"
              ? "auto"
              : parseInt(dataCol) > 5
              ? 5
              : parseInt(dataCol),
        },
        1200: {
          slidesPerView:
            dataCol === "auto"
              ? "auto"
              : parseInt(dataCol) > 6
              ? 6
              : parseInt(dataCol),
        },
        1400: {
          slidesPerView: dataCol === "auto" ? "auto" : parseInt(dataCol),
        },
      },
    });
  });


  //slider tile
  const swiperSliderTile = new Swiper('.slider-tile .swiper', {
	loop: false,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 400,
	pagination: {
		el: '.slider-tile-pagination',
		clickable: true,
	},
	autoplay: false,
	navigation: false,
  
  });



  //slider media thumbs preview
  const swiperMediaPreview = new Swiper(".slider-media-thumbs .swiper",
  {
	loop: false,
	slidesPerView: 4,
	spaceBetween: 0,
	threshold: 5,
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
	freeMode: false,
	navigation: {
	  nextEl: ".button-slider-media-thumbs-next",
	  prevEl: ".button-slider-media-thumbs-prev",
	},
  });
  
  //slider media thumbs main
  const swiperMediaMain = new Swiper(".slider-media-main .swiper",
  {
	loop: false,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 400,
	threshold: 5,
	freeMode: false,
	watchSlidesProgress: true,
	navigation: {
	  nextEl: ".button-slider-media-main-next",
	  prevEl: ".button-slider-media-main-prev",
	},
	pagination: false,
	thumbs: {
	  swiper: swiperMediaPreview,
	},
  });
  
  
  
});
