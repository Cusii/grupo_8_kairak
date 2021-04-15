window.addEventListener('load', ()=>{ 

    document.getElementById("img").onchange = function(e) {        
        let reader = new FileReader();
      
        reader.readAsDataURL(e.target.files[0]);
      
        reader.onload = function(){
            let preview = document.getElementById('preview-img');
            let image = document.createElement('img');
      
            image.src = reader.result;
        
            preview.innerHTML = '';
            preview.innerHTML = `<img src="${image.src}" class=" img-logo-person img-fluid m-3 rounded mx-auto d-block " alt="logo " width="425px">`;
            //preview.append(image);
        };
    }
})