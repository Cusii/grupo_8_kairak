const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expressions = {
	title: /^(.)+(\s){2,20}$/,
	length: /^[1-9]+[\d]{1,2}$/,
	year: /^[1-9]+[\d]{3}$/,
	trailerPath: /^https:\/\/www.youtube.com\/embed\/+[\w]{11}$/,
	moviePath: /^https:\/\/www.youtube.com\/embed\/+[\w]{11}$/,
    description: /^[a-zA-ZÀ-ÿ\s,-_\)\(\/:;'!¿¡?&$%]{20,400}$/
}

const validations = {
	title: false,
	length: false,
	price: false,
	year: false,
	trailerPath: false,
	moviePath: false,
	description: false
}

const validateForm = (e) => {
	switch (e.target.name) {
		case 'title':
			validateField(expressions.title, e.target, e.target.name);
			break;

		case 'length':
			validateField(expressions.length, e.target, e.target.name);
			break;

		case 'price':
			const inputPrice = document.getElementById('price');
			if (inputPrice.value > 0 ) {
				document.getElementById(`group_price`).classList.remove('form_incorrect_group');				
				document.getElementById(`group_price`).classList.add('form_correct_group');
				document.querySelector(`#group_price i`).classList.remove('fa-times-circle');
				document.querySelector(`#group_price i`).classList.add('fa-check-circle');
				document.querySelector(`#group_price .form_error_input`).classList.remove('form_active_error_input');
				validations['price'] = true;
			} else {
				document.getElementById(`group_price`).classList.add('form_incorrect_group');
				document.getElementById(`group_price`).classList.remove('form_correct_group');
				document.querySelector(`#group_price i`).classList.add('fa-times-circle');
				document.querySelector(`#group_price i`).classList.remove('fa-check-circle');
				document.querySelector(`#group_price .form_error_input`).classList.add('form_active_error_input');
				validations['price'] = false;
			}
			break;

		case 'year':
			validateField(expressions.year, e.target, e.target.name);
			break;

		case 'trailerPath':
			validateField(expressions.trailerPath, e.target, e.target.name);
			break;

		case 'moviePath':
			validateField(expressions.moviePath, e.target, e.target.name);
			break;

		case 'description':
			validateField(expressions.description, e.target, e.target.name);
			break;
	
		default:
			break;
	}
}

const validateField = (expression, input, field) => {
	if(expression.test(input.value)){
		document.getElementById(`group_${field}`).classList.remove('form_incorrect_group');
		document.getElementById(`group_${field}`).classList.add('form_correct_group');
		document.querySelector(`#group_${field} i`).classList.add('fa-check-circle');
		document.querySelector(`#group_${field} i`).classList.remove('fa-times-circle');
		document.querySelector(`#group_${field} .form_error_input`).classList.remove('form_active_error_input');
		validations[field] = true;
	} else {
		document.getElementById(`group_${field}`).classList.add('form_incorrect_group');
		document.getElementById(`group_${field}`).classList.remove('form_correct_group');
		document.querySelector(`#group_${field} i`).classList.add('fa-times-circle');
		document.querySelector(`#group_${field} i`).classList.remove('fa-check-circle');
		document.querySelector(`#group_${field} .form_error_input`).classList.add('form_active_error_input');
		validations[field] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
})

form.addEventListener('submit', (e) => {
	e.preventDefault();
	
	if(!validations.title &&
		!validations.length &&
		!validations.price &&
		!validations.year &&
		!validations.trailerPath &&
		!validations.moviePath &&
		!validations.description ){
		document.getElementById('form_message').classList.add('form_active_message');
	}
});