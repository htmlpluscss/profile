( forms => {

	//reCaptcha v3

	const PUBLIC_KEY = '6LcsF5cjAAAAAOvoMbdW_JM5UIOLBN1WaDERnoID';

	const reCaptcha = () => {

		[...forms].forEach( form => {

			form.removeEventListener('input', reCaptcha);

		});

		const script = document.createElement('script');

		script.src = 'https://www.google.com/recaptcha/api.js?render=' + PUBLIC_KEY;

		document.head.appendChild(script);

	}

	[...forms].forEach( form => {

		form.addEventListener('input', reCaptcha);

		form.addEventListener('submit', event => {

			event.preventDefault();

			if (typeof(grecaptcha) === 'undefined') {

				alert('Error! Google reCaptcha');

			} else {

				grecaptcha.ready( () => {

					grecaptcha.execute(PUBLIC_KEY).then( token => {

						const formData = new FormData(form),
							  btn = form.querySelector('.form__submit');

						formData.append('g_recaptcha_response', token);

						btn.disabled = true;

						fetch(form.getAttribute('action'), {
							method: 'POST',
							body: formData
						})
						.then(response => response.json())
						.then(result => {

							console.log(result);

							btn.disabled = false;

							document.querySelector('.modal-done__title').innerHTML = result.title;
							document.querySelector('.modal-done__message').innerHTML = result.message;

							document.querySelectorAll('.modal-done__ico svg')[0].classList.toggle('hide', result.status !== 'ok');
							document.querySelectorAll('.modal-done__ico svg')[1].classList.toggle('hide', result.status === 'ok');

							const eventModalShow = new CustomEvent("modalShow", {
								detail: {
									selector: "done"
								}
							});

							modal.dispatchEvent(eventModalShow);

							form.reset();

						});

					});

				});

			}

		});

	});

	// valid

	[...document.querySelectorAll('.input')].forEach( input => {

		if ( input.required ) {

			input.addEventListener('blur', ()=> input.parentNode.classList.toggle('is-error', input.validity.valid === false));

			input.addEventListener('input', ()=> input.parentNode.classList.toggle('is-error', input.validity.valid === false));

		}

		input.addEventListener('input', ()=> input.classList.toggle('is-value', input.value.length > 0 ));

	});

})(document.querySelectorAll('.form'));