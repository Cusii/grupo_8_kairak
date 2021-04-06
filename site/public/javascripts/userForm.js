const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const expressions = {
	first_name: /^[a-zA-ZÀ-ÿ\s]{2,20}$/,
	last_name: /^[a-zA-ZÀ-ÿ\s]{2,20}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	password: /^.{8,16}$/
}

const validations = {
	first_name: false,
	last_name: false,
	email: false,
	password: false
}

const validateForm = (e) => {
	switch (e.target.name) {
		case 'first_name':
			validateField(expressions.first_name, e.target, e.target.name);
			break;

		case 'last_name':
			validateField(expressions.last_name, e.target, e.target.name);
			break;

		case 'email':
			validateField(expressions.email, e.target, e.target.name);
			break;

		case 'password':
			validateField(expressions.password, e.target, e.target.name);
			validatePasswords();
			break;

		case 'password2':
			validatePasswords();
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


const validatePasswords = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`group_password2`).classList.add('form_incorrect_group');
		document.getElementById(`group_password2`).classList.remove('form_correct_group');
		document.querySelector(`#group_password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#group_password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#group_password2 .form_error_input`).classList.add('form_active_error_input');
		validations['password'] = false;
	} else {
		document.getElementById(`group_password2`).classList.remove('form_incorrect_group');
		document.getElementById(`group_password2`).classList.add('form_correct_group');
		document.querySelector(`#group_password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#group_password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#group_password2 .form_error_input`).classList.remove('form_active_error_input');
		validations['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
})

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const terms = document.getElementById('terms');
	
	if(!validations.first_name && !validations.last_name && !validations.password && !validations.email && !terms.checked ){
		document.getElementById('form_message').classList.add('form_active_message');
	}
});