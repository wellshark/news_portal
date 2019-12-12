class Admin {

    constructor() {
        this.modal_block = document.querySelector('.js-modal');
        this.log_out_btn = document.querySelector('.js-log-out');
        this.modal_show_btn = document.querySelector('.js-show-modal');
        this.modal_close_btn = document.querySelector('.js-modal-close');
        this.modal_title = document.querySelector('.js-modal-title');
        this.modal_title_input = document.querySelector('.js-textarea-title');
        this.modal_description_input = document.querySelector('.js-textarea-description');
        this.modal_save_btn = document.querySelector('.js-modal-save');
        this.news_wrapp = document.querySelector('.js-news');
        this.edit_article_btn = document.querySelector('.edit-article');
        this.delete_article_btn = document.querySelectorAll('.delete-article');

        this.showAllArticle();
        this.addEventsListeners();
    }


    showModal(title, btn, handler) {
        this.modal_title.innerText = title;
        this.modal_save_btn.innerText = btn;
        this.modal_save_btn.addEventListener('click', (e) => handler.call(this, e));
        this.modalToggleVisibility();

    }

    modalToggleVisibility() {
        this.modal_block.classList.toggle('hide');
    }

    clearLocalStorage() {
        localStorage.clear();
    }

    addArticle(e) {
        const newArticle = {
            title: this.modal_title_input.value,
            description: this.modal_description_input.value,
            id: new Date().getTime()
        };
        let array_news = [];
        if (localStorage.getItem('news')) {
            array_news = JSON.parse(localStorage.getItem('news'));
        }
        array_news.push(newArticle);
        localStorage.setItem('news', JSON.stringify(array_news));
        this.modalToggleVisibility();
        this.showArticle(newArticle);
        e.preventDefault();
    }

    showAllArticle() {
        let articles = JSON.parse(localStorage.getItem('news'));
        this.news_wrapp.innerHTML = '';
        if (articles) {
            for (let article of articles) {
                this.showArticle(article)
            }
        }
    }

    showArticle(article) {
        let article_node = document.createElement('div');
        article_node.className = "news__item";
        article_node.setAttribute('data-article-id', article.id);
        article_node.innerHTML =
            `<h3 class="news__title">${article.title}</h3>
        <p class="news__description mt-10">
            ${article.description}
        </p>
        <div class="news__control-buttons">
            <img class="edit-article" src="assets/img/edit.png">
            <img class="delete-article" src="assets/img/delete.png" width="24" height="24">
        </div>`;

        article_node.querySelector('.delete-article').addEventListener('click', (e) => this.deleteArticle(e));
        article_node.querySelector('.edit-article').addEventListener('click', (e) => this.editArticle(e));
        this.news_wrapp.append(article_node);

    }

    deleteArticle(e) {
        let article_id = e.target.parentElement.parentElement.getAttribute('data-article-id');
        let articles = JSON.parse(localStorage.getItem('news'));
        articles.splice(this.searchArticle(articles, article_id), 1);
        localStorage.setItem('news', JSON.stringify(articles));
        e.target.parentElement.parentElement.remove();
    }

    searchArticle(arr, key) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id.toString() === key) {
                return i;
            }
        }
    }

    editArticle(e) {
        let article_id = e.target.parentElement.parentElement.getAttribute('data-article-id');
        let articles = JSON.parse(localStorage.getItem('news'));
        let article_number = this.searchArticle(articles, article_id);
        this.modal_title_input.value = articles[article_number].title;
        this.modal_description_input.value = articles[article_number].description;
        this.articles_array = articles;
        this.article_number = article_number;
        this.showModal("Редактировать новость", 'Изменить', (e) => {
            this.articles_array[this.article_number].title = this.modal_title_input.value;
            this.articles_array[this.article_number].description = this.modal_description_input.value;
            localStorage.setItem('news', JSON.stringify(this.articles_array));
            this.showAllArticle();
            this.modalToggleVisibility();
            e.preventDefault();
        });
    }

    addEventsListeners() {
        this.log_out_btn.addEventListener('click', () => this.logOut());
        this.modal_show_btn.addEventListener('click', () => this.showModal("Добавить новость", 'Сохранить', this.addArticle));
        this.modal_close_btn.addEventListener('click', () => this.modalToggleVisibility());

    }

    logOut() {
        location.href = 'index.html';
        localStorage.setItem('role', '');
    }
}

if (localStorage.getItem('role')) {
    const admin = new Admin();
// admin.clearLocalStorage();
} else {
    location.href = 'index.html';
}
