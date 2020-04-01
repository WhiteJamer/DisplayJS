/*
	Компонент модального окна
*/
Element.prototype.appendAfter = function(el) {
	el.parentNode.insertBefore(this, el.nextSibling);
}

const noop = function(){}

function _createModalFooter(buttons = []){

	const wrapper = document.createElement('div')
	wrapper.classList.add('modal__footer')

	buttons.forEach(btn => {
		const $btn = document.createElement('button')
		$btn.classList.add('btn')
		$btn.classList.add(`btn-${btn.type}`)
		$btn.textContent = btn.text
		$btn.onclick = btn.handler || noop()
		wrapper.appendChild($btn)
	})
	return wrapper
}

// Генерирует html модального окна
function _createModal(options){
	const modal = document.createElement('div')
	modal.classList.add('gmodal')

	modal.insertAdjacentHTML('afterbegin', `
		<div class="gmodal__overlay" data-close=true>
			<div class="gmodal__window" style="width: ${options.width || '400px'}">
	            <div class="gmodal__header">
	                <h3 class="gmodal__title" data-title>
	                ${options.title || 'Модальное окно'}
	                </h3>
	                ${options.closable ? `<i class=" header__cross" data-close=true>&#10006;</i>` : ''}

	            </div>
	            <div class="gmodal__content" data-content>
	            	${options.content || ''}
	            </div>
	        </div>
        </div>
	`)
	const footer = _createModalFooter(options.footerButtons)
	footer.appendAfter(modal.querySelector('[data-content]'))
	document.body.appendChild(modal)
	return modal
	
}
// функция которая возвращент объект
displayJS.modal = function(options){
	const ANIMATION_SPEED = 200
	const $modal = _createModal(options)
	let closing = false

	// Если options.closable не указан явно то он будет true
	options.closable = options.closable === undefined ? true : options.closable 

	// Создает модальное окно в DOM дереве

	// Объект модального окна
	const modal = {
		open() {
			$modal.classList.add('open')
			if( typeof options.onOpen === 'function'){
				options.onOpen()
			}

		},
		close() {
			closing = true
			$modal.classList.remove('open')
			$modal.classList.add('hide')
			setTimeout(() => {
				$modal.classList.remove('hide')
				closing = false
				if( typeof options.onClose === 'function'){
					options.onClose()
				}
			}, ANIMATION_SPEED)

		},
	}

	// Обработчик события клика
	const clickHandler = event => {
		if (event.target.getAttribute('data-close')){
			modal.close();
		}
	}
	
	// Добавляем прослушку события к модальному окну
	$modal.addEventListener('click', clickHandler, false)
	// Дополняем объект и возвращаем
	return Object.assign(modal, {
		setContent(newContent) {
			$modal.querySelector('[data-content]')
			.innerHTML = newContent
		},
		setTitle(newTitle) {
			$modal.querySelector('[data-title]')
			.innerHTML = newTitle
		},
		destroy() {
			$modal.remove();
		},
	})
}

// // Новое модальное окно
// const modal = displayJS.modal({
// 	title: 'Ну заголов и заголовок',
// 	content: `<p>Какой то html</p>`,
// 	width: '400px',
// 	onOpen: () => { console.log('Открылась')},
// 	onClose: () => { console.log('Пуф!')},
// 	footerButtons: [
// 		{text: 'Нажать', type: 'secondary', handler: () => { console.log('Кликнул, молодец')} },
// 		{text: 'Кликнуть', type: 'primary', handler: () => {
// 			console.log('Да, нажал') 
// 			modal.close()} 
// 		},
// 		{text: 'Прожать', type: 'success', handler: () => { console.log('Еще одна!')} },
// 	],
// })
