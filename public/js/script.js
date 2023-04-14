const outer = document.querySelector('.outer');
const login = document.querySelector('.login-link');
const register = document.querySelector('.register-link');
const btnPop = document.querySelector('.btnlogin');
const X = document.querySelector('.X');

register.addEventListener('click',()=> {
    outer.classList.add('active')
});
login.addEventListener('click',()=> {
    outer.classList.remove('active')
});
btnPop.addEventListener('click',()=> {
    outer.classList.add('active-popup')
});
X.addEventListener('click',()=> {
    outer.classList.remove('active-popup')
});