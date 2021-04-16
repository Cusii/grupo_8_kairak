const qs = (e) => document.querySelector(e)


window.addEventListener('load', ()=>{

    const expressions = {
        first_name: /^[a-zA-ZÀ-ÿ\s]{2,20}$/,
        last_name: /^[a-zA-ZÀ-ÿ\s]{2,20}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
       // password:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z].{6.12})$/
 
       password: /^.{8,16}$/ ,
       img:/(.jpg|.jpeg|.png|.gif)$/i
 
    }


    let formularioRegister = qs ('#formRegister');
    console.log(formularioRegister.elements);
    console.log(formularioRegister.elements[3].value);

    let inputFirst_name = formularioRegister.elements[0]
    let inputLast_name = formularioRegister.elements[1]
    let inputEmail = formularioRegister.elements[2]
    let inputPassword = formularioRegister.elements[3]
    let inputPassword2 = formularioRegister.elements[4]
    let inputImg = formularioRegister.elements[6]

/*     (inputImg.value)?inputImg.value='': null */

    let regLetras = /^[a-zA-Z\s]*$/

    inputFirst_name.addEventListener('blur',()=>{
        switch (true) {
            case !inputFirst_name.value:
                errorFirst_name.innerHTML = 'Este campo es obligatorio'
                inputFirst_name.classList.add('is-invalid')
                break;
             case !expressions.first_name.test(inputFirst_name.value):
                inputFirst_name.classList.add('is-invalid')
                errorFirst_name.innerHTML = 'Mas de 2 caracteres' 
                 break;
            default:
                errorFirst_name.innerHTML= ''
                inputFirst_name.classList.remove('is-invalid')
                inputFirst_name.classList.add('is-valid')
                break;
        }
    })
    inputLast_name.addEventListener('blur',()=>{
        switch (true) {
            case !inputLast_name.value:
                errorLast_name.innerHTML = 'Este campo es obligatorio'
                inputLast_name.classList.add('is-invalid')
                break;
                case !expressions.last_name.test(inputFirst_name.value):
                    inputFirst_name.classList.add('is-invalid')
                    errorFirst_name.innerHTML = 'Mas de 2 caracteres' 
                     break;
            default:
                errorLast_name.innerHTML= ''
                inputLast_name.classList.remove('is-invalid')
                inputLast_name.classList.add('is-valid')
                break;
        }
    })
    inputEmail.addEventListener('blur',()=>{
        switch (true) {
            case !inputEmail.value:
                errorEmail.innerHTML = 'Este campo es obligatorio'
                inputEmail.classList.add('is-invalid')
                break;
                case !expressions.email.test(inputEmail.value):
                    inputEmail.classList.add('is-invalid')
                    errorEmail.innerHTML = 'Ingrese un mail correcto' 
                     break;
            default:
                errorEmail.innerHTML= ''
                inputEmail.classList.remove('is-invalid')
                inputEmail.classList.add('is-valid')
                break;
        }
    })
    inputPassword.addEventListener('blur',()=>{
        switch (true) {
            case !inputPassword.value:
                errorPassword.innerHTML = 'Este campo es obligatorio'
                errorPassword.classList.add('is-invalid')
                break;
            case !expressions.password.test(inputPassword.value):
                    inputPassword.classList.add('is-invalid')
                    errorPassword.innerHTML = 'Debe contener mas de 8 caracteres' 
                     break;
            default:
                errorPassword.innerHTML= ''
                inputPassword.classList.remove('is-invalid')
                inputPassword.classList.add('is-valid')
                break;
        }
    })
    inputPassword2.addEventListener('blur',()=>{
        switch (true) {
            case !inputPassword2.value:
                errorPassword2.innerHTML = 'Este campo es obligatorio'
                inputPassword2.classList.add('is-invalid')
                break;
                case inputPassword2.value !== inputPassword.value:
                    inputPassword2.classList.add('is-invalid')
                    errorPassword2.innerHTML = 'La contraseña deben coincidir' 
                   
                     break;
               /*  case !expressions.password.test(inputPassword2.value):
                    inputPassword2.classList.add('is-invalid')
                    errorPassword2.innerHTML = 'mas de 8 caracteres' 
                     break; */
            default:
                errorPassword2.innerHTML= ''
                inputPassword2.classList.remove('is-invalid')
                inputPassword2.classList.add('is-valid')
                break;
        }
    })

  /*   inputImg.addEventListener('blur',()=>{
        switch (true) {
            case !inputImg.value:
                errorImg.innerHTML = 'Este campo es obligatorios'
                inputImg.classList.add('is-invalid')
                break; */
             /*    case inputImg.value !== inputPassword.value:
                    inputImg.classList.add('is-invalid')
                    errorImg.innerHTML = 'La contraseña debe ser la misma' 
                   
                     break; */
               /*  case !expressions.password.test(inputImg.value):
                    inputImg.classList.add('is-invalid')
                    errorImg.innerHTML = 'mas de 8 caracteres' 
                     break; */
   /*          default:
                errorImg.innerHTML= ''
                inputImg.classList.remove('is-invalid')
                inputImg.classList.add('is-valid')
                break;
        }
    }) */
/*     inputImg.addEventListener('change'),(e)=>{
        switch (true) {
            case !expressions.img.exec(inputImg.value):
                errorImg.innerHTML= 'solo imagenes jpg,png'
                inputImg.classList.remove('is-invalid')
              
                
                break;
        
            default:
                break;
        }
    } */


    document.getElementById("img").onchange = function(e) {        
        let reader = new FileReader();
      
        reader.readAsDataURL(e.target.files[0]);
      
        reader.onload = function(){
            let preview = document.getElementById('preview-img');
            let image = document.createElement('img');
      
            image.src = reader.result;
        
            preview.innerHTML = '';
            preview.innerHTML = `<img src="${image.src}" class=" img-logo-person img-fluid m-3 rounded mx-auto d-block " alt="logo " width="150px">`;
            //preview.append(image);
        };
    }


})