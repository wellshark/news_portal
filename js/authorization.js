class LogIn {
    constructor(emailInput, passwordInput, logInBtn) {
        this.emailInput = document.querySelector('.js-email');
        this.passwordInput = document.querySelector('.js-password');
        this.logInBtn = document.querySelector('.js-sign-in');
        this.requiredPasswordLength = 8;
        this.errorMessageBlock = document.querySelector('.js-error-messages');
        this.adminEmail = 'admin@email.com';
        this.userEmail = 'user@email.com';
        this.adminPassword = '11111111';
        this.userPassword = '11111111';
        this.roles = {
            'admin': 1,
            'user': 2
        };
        this.addEventsListeners();
    }

    addEventsListeners() {
        this.emailInput.addEventListener('keyup', () => this.changerSignInBtnColor());
        this.passwordInput.addEventListener('keyup', () => this.changerSignInBtnColor());
        this.logInBtn.addEventListener('click', (e) => this.authorization(e));
    }


    changerSignInBtnColor() {
        if (this.isInputsValid()) {
            this.blueSignInBtn.call(this);
        } else {
            this.graySignInBtn.call(this);
        }
    }

    blueSignInBtn() {
        if (this.logInBtn.classList.contains('button_gray')) {

            this.logInBtn.classList.remove('button_gray');
            this.logInBtn.classList.add('button_blue');
        }

    }

    graySignInBtn() {
        if (this.logInBtn.classList.contains('button_blue')) {
            this.logInBtn.classList.remove('button_blue');
            this.logInBtn.classList.add('button_gray');
        }
    }


    isInputsValid() {
        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(this.emailInput.value) && this.passwordInput.value.length === this.requiredPasswordLength;
    }


    authorization(event) {
        event.preventDefault();
        if (this.isInputsValid()) {
            if (this.isItAdmin() || this.isItUser()) {
                this.successAuthorization();
                location.href = 'news.html';
            }
            else {
                this.failAuthorization();
            }
        }
    }

    isItAdmin() {
        return (this.emailInput.value === this.adminEmail && this.passwordInput.value === this.adminPassword);
    }

    isItUser() {
        return this.emailInput.value === this.userEmail && this.passwordInput.value === this.userPassword
    }

    successAuthorization() {
        this.isItAdmin() ? localStorage.setItem('role', this.roles['admin']) : localStorage.setItem('role', this.roles['user']);
    }

    failAuthorization() {
        this.errorMessageBlock.style.opacity = 1;
        setTimeout(() => this.errorMessageBlock.style.opacity = 0, 3000);
    }
}

document.addEventListener("DOMContentLoaded", () => new LogIn());
