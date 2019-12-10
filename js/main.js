class LogIn {
    constructor(emailInput, passwordInput, logInBtn) {
        this.emailInput = emailInput;
        this.passwordInput = passwordInput;
        this.logInBtn = logInBtn;
        this.isEmailValid = false;
        this.isPasswordValid = false;
        this.adminEmail = 'admin@email.com';
        this.userEmail = 'user@email.com';
        this.adminPassword = '11111111';
        this.userPassword = '11111111';
    }

    validationEmail() {
        let pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.isEmailValid = pattern.test(this.emailInput.value);
        this.changeButtonColor();
    }

    changeButtonColor() {
        if (this.isEmailValid && this.isPasswordValid) {
            this.logInBtn.classList.remove('button_gray');
            this.logInBtn.classList.add('button_blue');
        }
    }

    validationPassword() {
        this.isPasswordValid = this.passwordInput.value.length === 8;
        this.changeButtonColor();
    }

    addEventsListeners() {
        this.emailInput.addEventListener('keyup', () => this.validationEmail());
        this.passwordInput.addEventListener('keyup', () => this.validationPassword());
        this.logInBtn.addEventListener('click', (e) => this.logIn(e));
    }

    logIn(event) {
        event.preventDefault();
        if(this.isEmailValid && this.isPasswordValid){
            if(this.emailInput.value===this.adminEmail&&this.passwordInput.value===this.adminPassword){
                location.href = 'admin.html';
            }
            if(this.emailInput.value===this.userEmail&&this.passwordInput.value===this.userPassword){
                location.href = 'user.html';
            }

        }
    }
}

const emailInput = document.querySelector('.email');
const passwordInput = document.querySelector('.password');
const logInBtn = document.querySelector('.button-lg');
console.log(logInBtn);
let login = new LogIn(emailInput, passwordInput, logInBtn);
login.addEventsListeners();