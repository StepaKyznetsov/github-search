import './index.html';
import './index.scss';

form.onsubmit = async (e) => {
    e.preventDefault();

    repos.innerHTML = ''

    if (input.value.trim().length <=2) {
      input.classList.add('form__input-nonvalid')
      input.value = ''
      input.placeholder = 'минимальное число символов: 3'
      return
    }

    if (input.placeholder === 'минимальное число символов: 3' && input.classList.contains('form__input-nonvalid')) {
      input.classList.remove('form__input-nonvalid')
      input.placeholder = 'название репозитория'
    }
  
    let response = await fetch(`https://api.github.com/search/repositories?q=${input.value.trim()}&per_page=10`)

    if (response.status !== 200)
      return repos.innerHTML += "<h2 class = 'repositories__notfound'>Возникли непредвиденные проблемы. Повторите попытку позже</h2>"

    let result = await response.json();

    if (!result.items.length) return repos.innerHTML += "<h2 class = 'repositories__notfound'>Ничего не найдено</h2>"

    result.items.forEach(element => {
      repos.innerHTML += `
      <div class = "repositories__body">
        <img class = "repositories__avatar" src = ${element.owner.avatar_url} alt = "avatar" />
        <div class = "repositories__info">
          <a target = "_blank" class = "repositories__name" href = "${element.html_url}">${element.name}</a>
          <span class = "repositories__author">Автор &#128578;:  ${element.owner.login}</span>
          <p class = "repositories__description">Описание &#128220;:  ${element.description || 'отсутствует'}</p>
          <span class = "repositories__language">Язык программирования &#128187;:  ${element.language || 'отсутствует'}</span>
        </div>	
      </div>
      `
    });
};