import {User} from './components/User.js'
import {Admin} from './components/Admin.js'

const roles = {
    'admin': 1,
    'user': 2
};

document.addEventListener("DOMContentLoaded", function () {
    let received_role = Number(localStorage.getItem('role'));
    if (received_role === roles.admin || received_role === roles.user) {
        if (received_role === roles.admin) {
            const admin = new Admin();
        } else {
            const user = new User();
            user.showAllArticle();
            user.bindEventsListeners();
        }
    }
    else {
        location.href = 'index.html';
    }
});



