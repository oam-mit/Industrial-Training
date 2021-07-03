let button = document.getElementById("submit_button");
let context = document.getElementById("context");

const setDisabled = value => {
	button.disabled = value;
};

const setButtonText = value => {
	button.innerHTML = value;
};

const setContext = values => {
	context.innerHTML = "";
	for (let i = 0; i < values.length; i++) {
		let li = document.createElement("li");
		li.className = "list-group-item";
		li.innerHTML = values[i];
		context.appendChild(li);
	}
};

const getCookie = name => {
	let cookieValue = null;
	if (document.cookie && document.cookie !== "") {
		const cookies = document.cookie.split(";");
		for (let i = 0; i < cookies.length; i++) {
			const cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === name + "=") {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
};

document.getElementById("context_form").onsubmit = event => {
	event.preventDefault();

	let { context_input } = event.target;
	if (context_input.value.length == 0) {
		alert("Please enter a text");
		return;
	}
	setDisabled(true);
	setButtonText("Checking....");

	let form_data = new FormData();
	form_data.append("input", context_input.value);

	fetch("/api/predict", {
		method: "POST",
		body: form_data,
		headers: {
			"X-CSRFToken": getCookie("csrftoken"),
		},
	})
		.then(resp => resp.json())
		.then(data => {
			setContext(data.prediction);
			setButtonText("Submit");
			setDisabled(false);
		})
		.catch(err => {
			setButtonText(err);
			setDisabled(true);
		});
};
