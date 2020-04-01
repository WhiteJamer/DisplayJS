# DisplayJS
Библиотека для создания и управления модальными окнами.

## Установка

Добавить в HEAD 

```
<link rel="stylesheet" href="path/to/modal.css">
```

Подключить JS-скрипты.
```
<script src="path/to/displayJS.js"></script>
<script src="path/to/plugins/modal.js"></script>
```

Для того чтобы использовать плагин ``confirm`` нужно подключить его после последних двух скриптов, таким образом:

```
<body>
        <!--Какой-то HTML-->

	<script src="path/to/displayJS.js"></script>
	<script src="path/to/plugins/modal.js"></script>
    <script src="path/to/plugins/confirm.js"></script>
</body>
```

## Использование

```
// Создаем элемент откуда модалка будет брать информацию.
<div class="some-item">
    <div class="title">Заголовок который я задал</div>
    <div class="content">Lorem ipsum dolor sit amet.</div>
    <button data-btn="info">Кнопка</button>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {

       const myModal = displayJS.modal({
           title: 'Some title text',
           closable: true, // closable true рендерит крестик
           footerButtons: [
                // С помощью колбека можно сделать какое то действие при клике на кнопку
                // в данном случае она просто закрывает модалку.
                {text: 'OK', type: 'secondary', handler(){ myModal.close() }},
           ],
       })

        // Вешаем слушатель клика на весь документ
        document.addEventListener('click', e => {
            e.preventDefault()
            const btnType = e.target.dataset.btn
            if(btnType === "info"){
                const item = e.target.closest('.some-item')
                const title = item.querySelector('.title').innerText
                const content = item.querySelector('.content').innerHTML
                
                infoModal.setTitle(title)
                infoModal.setContent(content)
                infoModal.open()
            }
        })
    })
</script>
```

Особая благодарность [Vladilen Minin](https://www.youtube.com/channel/UCg8ss4xW9jASrqWGP30jXiw) за отличные уроки по JS.

