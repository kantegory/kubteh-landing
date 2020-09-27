const sendRequestBtn = document.querySelector('#sendRequestBtn');
const form = document.querySelector('#sendRequest form');
let errBlock = document.querySelector('.error');

// show err function
const showErr = (field, msg) => {
  field.setCustomValidity(msg);
  errBlock.innerHTML = msg;
  errBlock.style.display = "block";
  setTimeout(() => {
    errBlock.style.display = "none";
    field.setCustomValidity("");
  }, 2500);
}

// validate russian phone number
let phoneMask = IMask(
  document.querySelector('[name="recipient-phone"]'), {
    mask: '+{7}(000)000-00-00'
  }
);

// validate email function
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email);
}

sendRequestBtn.addEventListener('click', async (event) => {
  // cancel form submitting
  event.preventDefault();

  // get formData
  let name = form.querySelector('[name="recipient-name"]');
  let email = form.querySelector('[name="recipient-email"]');
  let phone = form.querySelector('[name="recipient-phone"]');
  let message = form.querySelector('[name="message-text"]');

  let formData = { name: name.value, email: email.value, phone: phone.value, message: message.value };
  formData = JSON.stringify(formData);

  // check is email valid
  let isEmailValid = validateEmail(email.value);

  if (!name.value) {
    showErr(name, "Поле Имя обязательно к заполнению");
  } else if (!phone.value) {
    showErr(phone, "Поле Телефон обязательно к заполнению");
  } else if (!email.value) {
    showErr(email, "Поле Email обязательно к заполнению");
  } else if (!isEmailValid) {
    showErr(email, "Поле Email заполнено некорректно");
  } else if (!message.value) {
    showErr(message, "Поле Сообщение обязательно к заполнению");
  }

  // sending form
  let result = await fetch("https://push.kubteh.ru/lp/mailer/sendmsg", {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: formData,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin'
  });

  result = await result.json();

  if (result.success) {
    // success logic is there
  }
})
