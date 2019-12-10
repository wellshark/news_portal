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

    }

    modalToggleHide() {
        this.modal.classList.toggle('hide');
    }


    clearLocalStorage() {
        localStorage.clear();
    }

    addArticle(e) {
        const article = JSON.stringify({title: this.title_input.value, description: this.description_input.value});
        localStorage.setItem(localStorage.length.toString(), article);
        this.modalToggleHide();
        e.preventDefault();
    }

    showAllNews() {
        let map = new Map();
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let obj = JSON.parse(localStorage.getItem(key));
            map.set(key, obj);
        }
        for (let i = 0; i < map.size; i++) {
            let article_obj = map.get(i.toString());
            let article_node = document.createElement('div');
            article_node.className = "news__item";
            article_node.innerHTML = "<h3 class=\"news__title\">" + article_obj.title + " </h3>" +
                "<p class=\"news__description mt-10\">\n" + article_obj.description + "</p>";
            this.news_wrapp.append(article_node);
        }
    }

    editArticle() {

    }

    deleteArticle() {

    }

    showArticles() {

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
// admin.clearLocalStorage();
admin.addEventsListeners();
admin.showNews();
