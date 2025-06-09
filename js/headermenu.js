




document.addEventListener('DOMContentLoaded', () => {

	//header menu
	if (window.innerWidth > 1023) {
			//desktop action
			function handleMouseOver(event) {
				const target = event.currentTarget; 
				const allButtonsMenu = document.querySelectorAll('.popup-menu-wrap .menu-main>li>.btn-menu');

				allButtonsMenu.forEach(button => {
					if (button !== target) {
						button.classList.remove('active');
					}
				});

				if (target.nextElementSibling && target.nextElementSibling.classList.contains('submenu-inner-wrap')) {
					target.classList.add('active');
				}
			}
			function handleClick(event) {
				const target = event.currentTarget;
				const allButtonsMenu = document.querySelectorAll('.popup-menu-wrap .menu-main>li>.btn-menu');

				allButtonsMenu.forEach(button => {
					button.classList.remove('active');
				});

				if (target.nextElementSibling && target.nextElementSibling.classList.contains('submenu-inner-wrap')) {
					target.classList.add('active');
				}
			}
			const buttonsMenu = document.querySelectorAll('.popup-menu-wrap .menu-main>li>.btn-menu');

			buttonsMenu.forEach(button => {
				button.addEventListener('mouseover', handleMouseOver);
			});

			buttonsMenu.forEach(button => {
				button.addEventListener('click', handleClick);
			});
			function setMinHeight() {
				const activeButton = document.querySelector('.popup-menu-wrap .menu-main>li>.btn-menu.active');
				if (activeButton) {
					const submenu = activeButton.nextElementSibling; 
					if (submenu && submenu.classList.contains('submenu-inner-wrap')) {
						const height = submenu.offsetHeight; 
						const popupMenuContent = document.querySelector('.popup-menu-content');
						if (popupMenuContent) {
							popupMenuContent.style.minHeight = height + 'px'; 
						}
					}
				}
			}
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.type === 'attributes') {
						if (mutation.attributeName === 'class') {
							setMinHeight();
						}
					}
				});
			});
			const config = {
				attributes: true,
				childList: false,
				subtree: false
			};
			const buttons = document.querySelectorAll('.popup-menu-wrap .menu-main>li>.btn-menu');
			buttons.forEach(button => {
				observer.observe(button, config);
			});
			setMinHeight();
	} else {
		//mobile-action
		document.querySelectorAll('.popup-menu-wrap .menu-main > li > .btn-menu:has(+ .submenu-inner-wrap)').forEach(button => {
			button.addEventListener('click', function(event) {
				document.querySelectorAll('.popup-menu-wrap .menu-main > li > .btn-menu.opened').forEach(otherButton => {
					if (otherButton !== this) {
						otherButton.classList.remove('opened');
					}
				});
				this.classList.toggle('opened');
				event.preventDefault();
			});
		});
		document.querySelectorAll('.popup-menu-wrap .menu-title').forEach(title => {
			title.addEventListener('click', function(event) {
				document.querySelectorAll('.popup-menu-wrap .menu-title.opened').forEach(otherTitle => {
					if (otherTitle !== this) {
						otherTitle.classList.remove('opened');
					}
				});
				this.classList.toggle('opened');
				event.preventDefault();
			});
		});
		document.querySelector('.js-menu-back').addEventListener('click', function(event) {
			const popupMenuWrap = document.querySelector('.popup-menu-wrap');
			const btnMenu = popupMenuWrap.querySelector('.btn-menu.opened');
			const menuTitle = popupMenuWrap.querySelector('.menu-title.opened');
			const btnPopupToggle = popupMenuWrap.querySelector('.js-btn-popup-toggle');
			if (menuTitle) {
				menuTitle.classList.remove('opened');
			}
			if (btnMenu) {
				btnMenu.classList.remove('opened');
			} else {
				if (btnPopupToggle) {
					btnPopupToggle.classList.remove('active');
					document.body.classList.remove("menu-show");
				}
			}
			event.preventDefault();
		});
		

	}

	


	
});

