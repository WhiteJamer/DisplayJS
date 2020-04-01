displayJS.confirm = function(options){
	return new Promise((resolve, reject) => {
		const modal = displayJS.modal({
			title: options.title,
			content: options.content,
			closable: false,
			onClose(){
				setTimeout(() => {
					modal.destroy()
				}, 100)
			},
			footerButtons: [
				{text: 'Удалить', type: 'danger', handler() {
						modal.close()
						resolve()
					}},
				{text: 'Отмена', type: 'secondary', handler() {
						modal.close()
						reject()
					}},
			],
		})
		setTimeout(() => {
			modal.open()
		}, 100)
	})
}
