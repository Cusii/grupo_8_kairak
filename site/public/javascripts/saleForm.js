const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');

const validations = {
	discount: false,
	expiredAt: false
}

const validateForm = (e) => {
	switch (e.target.name) {
		case 'discount':
			const inputDiscount = document.getElementById('discount');
			if (inputDiscount.value > 0 && inputDiscount.value <= 100) {
				document.getElementById(`group_discount`).classList.remove('form_incorrect_group');
				document.getElementById(`group_discount`).classList.add('form_correct_group');
				document.querySelector(`#group_discount i`).classList.remove('fa-times-circle');
				document.querySelector(`#group_discount i`).classList.add('fa-check-circle');
				document.querySelector(`#group_discount .form_error_input`).classList.remove('form_active_error_input');
				validations['discount'] = true;
			} else {
				document.getElementById(`group_discount`).classList.add('form_incorrect_group');
				document.getElementById(`group_discount`).classList.remove('form_correct_group');
				document.querySelector(`#group_discount i`).classList.add('fa-times-circle');
				document.querySelector(`#group_discount i`).classList.remove('fa-check-circle');
				document.querySelector(`#group_discount .form_error_input`).classList.add('form_active_error_input');		
				validations['discount'] = false;
			}
			break;

		case 'expiredAt':
			const inputExpiredAt = document.getElementById(e.target.name);
			if (new Date(inputExpiredAt.value) >= new Date()) {
				document.getElementById(`group_expiredAt`).classList.remove('form_incorrect_group');
				document.getElementById(`group_expiredAt`).classList.add('form_correct_group');
				document.querySelector(`#group_expiredAt i`).classList.remove('fa-times-circle');
				document.querySelector(`#group_expiredAt i`).classList.add('fa-check-circle');
				document.querySelector(`#group_expiredAt .form_error_input`).classList.remove('form_active_error_input');
				validations['expiredAt'] = true;
			} else {
				document.getElementById(`group_expiredAt`).classList.add('form_incorrect_group');
				document.getElementById(`group_expiredAt`).classList.remove('form_correct_group');
				document.querySelector(`#group_expiredAt i`).classList.add('fa-times-circle');
				document.querySelector(`#group_expiredAt i`).classList.remove('fa-check-circle');
				document.querySelector(`#group_expiredAt .form_error_input`).classList.add('form_active_error_input');
				validations['expiredAt'] = false;
			}
			break;	
	
		default:
			break;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validateForm);
	input.addEventListener('blur', validateForm);
})

form.addEventListener('submit', (e) => {
	e.preventDefault();
	
	if(!validations.discount && !validations.expiredAt ){
		document.getElementById('form_message').classList.add('form_active_message');
	}
});