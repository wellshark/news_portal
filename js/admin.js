class Admin {

    constructor() {
        this.modal = document.querySelector('.modal');
        this.log_out_btn = document.querySelector('.log-out');
        this.show_modal_btn = document.querySelector('.show-modal');
        this.modal_close_btn = document.querySelector('.modal__close');
        this.title_input = document.querySelector('.textarea-title');
        this.description_input = document.querySelector('.textarea-description');
        this.save_btn = document.querySelector('.modal__save');
        this.news_wrapp = document.querySelector('.news');
        this.edit_article_btn = document.querySelector('.edit-article');
        this.delete_article_btn = document.querySelectorAll('.delete-article');
    }

    modalToggleHide() {
        this.modal.classList.toggle('hide');
    }


    clearLocalStorage() {
        localStorage.clear();
    }

    addArticle(e) {
        const newArticle = {title: this.title_input.value, description: this.description_input.value}
        let array_obj = [];
        if (localStorage.getItem('news')) {
            array_obj = JSON.parse(localStorage.getItem('news'));
        }
        array_obj.push(newArticle);
        localStorage.setItem('news', JSON.stringify(array_obj));
        this.modalToggleHide();
        this.showArticle(newArticle);
        e.preventDefault();
    }


    showAllNews() {
        let allNews = JSON.parse(localStorage.getItem('news'));
        for (let article of allNews) {
            this.showArticle(article)
        }
    }

    showArticle(article) {
        let article_node = document.createElement('div');
        article_node.className = "news__item";
        article_node.innerHTML = "<h3 class=\"news__title\">" + article.title + " </h3>" +
            "<p class=\"news__description mt-10\">\n" + article.description + "</p>" +
            "<div class=\"news__control-buttons\">\n" +
            "            <img class=\"edit-article\" src=\"assets/img/edit.png\">\n" +
            "            <img class=\"delete-article\" src=\"assets/img/delete.png\" width=\"24\" height=\"24\">\n" +
            "        </div>"
        ;
        article_node.querySelector('.delete-article').addEventListener('click', (e) => this.deleteArticle(e));
        article_node.querySelector('.edit-article').addEventListener('click', (e) => this.editArticle(e));
        this.news_wrapp.append(article_node);

    }


    editArticle(e) {
        let article_description = e.target.parentElement.parentElement.querySelector('.news__description').innerText;
        let array_news = [];
        if (localStorage.getItem('news')) {
            array_news = JSON.parse(localStorage.getItem('news'));
        }
        console.log(array_news[this.searchArticle(array_news, article_description)]);
        this.modalToggleHide();
    }

    searchArticle(arr, key) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].description === key) {
                return i;
            }
        }
    }

    deleteArticle(e) {
        let article_description = e.target.parentElement.parentElement.querySelector('.news__description').innerText;
        let array_news = [];
        if (localStorage.getItem('news')) {
            array_news = JSON.parse(localStorage.getItem('news'));
        }
        array_news.splice(this.searchArticle(array_news, article_description), 1);
        localStorage.setItem('news', JSON.stringify(array_news));

        e.target.parentElement.parentElement.remove();
    }


    addEventsListeners() {
        this.log_out_btn.addEventListener('click', () => this.logOut());
        this.show_modal_btn.addEventListener('click', () => this.modalToggleHide());
        this.modal_close_btn.addEventListener('click', () => this.modalToggleHide());
        this.save_btn.addEventListener('click', (e) => this.addArticle(e));
    }

    logOut() {
        location.href = 'index.html';
    }
}

const admin = new Admin();
admin.showAllNews();
// admin.clearLocalStorage();
admin.addEventsListeners();
