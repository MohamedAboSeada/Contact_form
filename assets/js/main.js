const queries = document.querySelector('.contact_form-query-options');

queries.addEventListener('click', (e) => {
	if (e.target.tagName === 'INPUT') {
		const activeOption = document.querySelector(
			'.contact_form-query-option_active'
		);
		if (activeOption) {
			activeOption.classList.remove('contact_form-query-option_active');
		}
		e.target.parentNode.classList.add('contact_form-query-option_active');
	}
});

const submitBtn = document.querySelector('.contact_form-subtn');

function checkInput(value) {
	return value.trim().length > 0;
}

function validEmail(email) {
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return email.trim().length > 0 && emailPattern.test(email);
}

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
	let allOkay = true;

	const inputs = [
		...document.querySelectorAll('.contact_form-input'),
		document.getElementById('msg'),
	];
	const radioBtns = document.querySelectorAll('.contact_form-query-rbtn');
	const messageAreaCheckBox = document.getElementById('agree');

	inputs.forEach((input) => {
		const errorMessageElement = input.nextElementSibling;
		if (!checkInput(input.value)) {
			input.classList.add('input__error');
			errorMessageElement.classList.remove('hide');
			errorMessageElement.textContent = `This field is required`;
			allOkay = false;
		} else {
			input.classList.remove('input__error');
			errorMessageElement.classList.add('hide');
		}
	});

	const emailInput = inputs[2];
	const emailErrorMessageElement = emailInput.nextElementSibling;
	if (!validEmail(emailInput.value)) {
		emailInput.classList.add('input__error');
		emailErrorMessageElement.classList.remove('hide');
		emailErrorMessageElement.textContent = `Please enter a valid email address`;
		allOkay = false;
	} else {
		emailErrorMessageElement.classList.add('hide');
	}

	const radioErrorElement = radioBtns[0]
		.closest('.contact_form-field')
		.querySelector('.contact_form-error');
	if (![...radioBtns].some((rdbtn) => rdbtn.checked)) {
		radioErrorElement.classList.remove('hide');
		allOkay = false;
	} else {
		radioErrorElement.classList.add('hide');
	}

	const messageAreaErrorElement = messageAreaCheckBox
		.closest('.contact_form-field')
		.querySelector('.contact_form-error');

	if (!messageAreaCheckBox.checked) {
		messageAreaErrorElement.classList.remove('hide');
		allOkay = false;
	} else {
		messageAreaErrorElement.classList.add('hide');
	}

	if (allOkay) {
		showMessage();
	}
});

function showMessage() {
	const success = document.querySelector('.pop_up');
	success.classList.add('pop_up_show');
	setTimeout(() => {
		success.classList.remove('pop_up_show');
	}, 3000);
}
