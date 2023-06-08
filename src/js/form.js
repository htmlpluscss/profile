( forms => {

	[...forms].forEach( form => {

		form.addEventListener('submit', event => {

			event.preventDefault();

						const formData = new FormData(form),
							  btn = form.querySelector('.form__submit');

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

	// valid

	[...document.querySelectorAll('.input')].forEach( input => {

		if ( input.required ) {

			input.addEventListener('blur', ()=> input.parentNode.classList.toggle('is-error', input.validity.valid === false));

			input.addEventListener('input', ()=> input.parentNode.classList.toggle('is-error', input.validity.valid === false));

		}

		input.addEventListener('input', ()=> input.classList.toggle('is-value', input.value.length > 0 ));

	});

})(document.querySelectorAll('.form'));

( formGenerate => {

	if ( formGenerate ) {

		const jsonToHtml = obj => {

			let result = "";

			for ( let key in obj ) {

				let data = obj[key];

				result += `<li><span class="code__red">${key}:</span> ${ typeof data === 'object' ? jsonToHtml(data) : data } </li>`;

			}

			return `<span class="code__white">{</span><ul class="code__green">${result}</ul><span class="code__white">}</span>`;

		}

		formGenerate.addEventListener('submit', event => {

			event.preventDefault();

						const formData = new FormData(formGenerate),
							  btn = formGenerate.querySelector('.form-generate__submit');

						formGenerate.classList.add('is-loading');

						btn.disabled = true;

						fetch(formGenerate.getAttribute('action'), {
							method: 'POST',
							body: formData
						})
						.then(response => response.json())
						.then(result => {

							console.log(result);

							formGenerate.querySelector('.form-generate__result .code').innerHTML = jsonToHtml(result);

							btn.disabled = false;

							formGenerate.classList.remove('is-loading');

							formGenerate.classList.add('is-finish');

						});

		});

	}

})(document.querySelector('.form-generate'));