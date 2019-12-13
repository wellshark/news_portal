export class User {
    constructor() {
        this.log_out_btn = document.querySelector('.js-log-out');
        this.news_wrapp = document.querySelector('.js-news')
    }

    bindEventsListeners() {
        this.log_out_btn.addEventListener('click', () => this.logOut());
    }

    logOut() {
        location.href = 'index.html';
        localStorage.setItem('role', '');
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
        article_node.innerHTML =
            `<h3 class="news__title">${article.title}</h3>
        <p class="news__description mt-10">
            ${article.description}
        </p>`;
        this.news_wrapp.append(article_node);
    }

    clearLocalStorage() {
        localStorage.clear();
    }
}