const qs = (e) => document.querySelector(e)


window.addEventListener('load', ()=>{

    let formularioLogin = qs ('#formLogin');
    let inputEmail = formularioLogin.elements[0]
    let inputPassword = formularioLogin.elements[1]

    inputEmail.addEventListener('blur',()=>{
        switch (true) {
            case !inputEmail.value:
                errorMail.innerHTML = 'El campo nombre es obligatorio'
                inputEmail.classList.add('is-invalid')
                break;
                /*  
                case !regLetras.test(inputEmail.value):
                errorMail.innerHTML = 'solo carecteres normales' 
                 break;*/
            default:
                errorMail.innerHTML= ''
                inputEmail.classList.remove('is-invalid')
                inputEmail.classList.add('is-valid')
                break;
        }
    })

    inputPassword.addEventListener('blur',()=>{
        switch (true) {
            case !inputPassword.value:
                errorPassword.innerHTML = 'El campo nombre es obligatorio'
                inputPassword.classList.add('is-invalid')
                break;
            default:
                errorPassword.innerHTML= ''
                inputPassword.classList.remove('is-invalid')
                inputPassword.classList.add('is-valid')
                break;
        }
    })

})