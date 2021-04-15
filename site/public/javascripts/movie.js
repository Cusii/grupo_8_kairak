const qs = (e) => document.querySelector(e)


window.addEventListener('load', ()=>{

    let formularioMovie = qs ('#formMovie');
 
    let inputTitle = formularioMovie.elements[0]
    let inputPrice = formularioMovie.elements[2]
    let inputLength = formularioMovie.elements[4]
    let inputYear = formularioMovie.elements[5]
    let inputTrailer = formularioMovie.elements[6]
    let inputPath = formularioMovie.elements[7]
    let inputDescription= formularioMovie.elements[9]
    let inputImg = formularioMovie.elements[0]

    inputTitle.addEventListener('blur',()=>{
        switch (true) {
            case !inputTitle.value:
                errorTitle.innerHTML = 'El campo nombre es obligatorio'
                inputTitle.classList.add('is-invalid')
                break;
                /*  
                case !regLetras.test(inputTitle.value):
                errorTitle.innerHTML = 'solo carecteres normales' 
                 break;*/
            default:
                errorTitle.innerHTML= ''
                inputTitle.classList.remove('is-invalid')
                inputTitle.classList.add('is-valid')
                break;
        }
    })
    inputPrice.addEventListener('blur',()=>{
        switch (true) {
            case !inputPrice.value:
                errorPrice.innerHTML = 'El campo nombre es obligatorio'
                inputPrice.classList.add('is-invalid')
                break;
                /*  
                case !regLetras.test(inputPrice.value):
                errorPrice.innerHTML = 'solo carecteres normales' 
                 break;*/
            default:
                errorPrice.innerHTML= ''
                inputPrice.classList.remove('is-invalid')
                inputPrice.classList.add('is-valid')
                break;
        }
    })
    inputLength.addEventListener('blur',()=>{
        switch (true) {
            case !inputLength.value:
                errorLength.innerHTML = 'El campo nombre es obligatorio'
                inputLength.classList.add('is-invalid')
                break;
                /*  
                case !regLetras.test(inputLength.value):
                errorLength.innerHTML = 'solo carecteres normales' 
                 break;*/
            default:
                errorLength.innerHTML= ''
                inputLength.classList.remove('is-invalid')
                inputLength.classList.add('is-valid')
                break;
        }
    })
    inputYear.addEventListener('blur',()=>{
        switch (true) {
            case !inputYear.value:
                errorYear.innerHTML = 'El campo nombre es obligatorio'
                inputYear.classList.add('is-invalid')
                break;
                /*  
                case !regLetras.test(inputYear.value):
                errorYear.innerHTML = 'solo carecteres normales' 
                 break;*/
            default:
                errorYear.innerHTML= ''
                inputYear.classList.remove('is-invalid')
                inputYear.classList.add('is-valid')
                break;
        }
    })
    inputTrailer.addEventListener('blur',()=>{
        switch (true) {
            case !inputTrailer.value:
                errorTrailer.innerHTML = 'El campo nombre es obligatorio'
                inputTrailer.classList.add('is-invalid')
                break;
                /*  
                case !regLetras.test(inputTrailer.value):
                errorTrailer.innerHTML = 'solo carecteres normales' 
                 break;*/
            default:
                errorTrailer.innerHTML= ''
                inputTrailer.classList.remove('is-invalid')
                inputTrailer.classList.add('is-valid')
                break;
        }
    })
    inputPath.addEventListener('blur',()=>{
        switch (true) {
            case !inputPath.value:
                errorPath.innerHTML = 'El campo nombre es obligatorio'
                inputPath.classList.add('is-invalid')
                break;
                /*  
                case !regLetras.test(inputPath.value):
                errorPath.innerHTML = 'solo carecteres normales' 
                 break;*/
            default:
                errorPath.innerHTML= ''
                inputPath.classList.remove('is-invalid')
                inputPath.classList.add('is-valid')
                break;
        }
    })
    inputDescription.addEventListener('blur',()=>{
        switch (true) {
            case !inputDescription.value:
                errorDescription.innerHTML = 'El campo nombre es obligatorio'
                inputDescription.classList.add('is-invalid')
                break;
                /*  
                case !regLetras.test(inputDescription.value):
                errorDescription.innerHTML = 'solo carecteres normales' 
                 break;*/
            default:
                errorDescription.innerHTML= ''
                inputDescription.classList.remove('is-invalid')
                inputDescription.classList.add('is-valid')
                break;
        }
    })



   

})