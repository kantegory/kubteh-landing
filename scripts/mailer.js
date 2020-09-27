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

  let msg = `Имя отправителя: ${name.value}\nEmail: ${email.value}\nНомер телефона: ${phone.value}\nСообщение: ${message.value}`;
  msg = JSON.stringify({ msg: msg });

  // check is email valid
  let isEmailValid = validateEmail(email.value);

  if (!name.value) {
    showErr(name, "Поле Имя обязательно к заполнению");
    return;
  } else if (!phone.value) {
    showErr(phone, "Поле Телефон обязательно к заполнению");
    return;
  } else if (!email.value) {
    showErr(email, "Поле Email обязательно к заполнению");
    return;
  } else if (!isEmailValid) {
    showErr(email, "Поле Email заполнено некорректно");
    return;
  } else if (!message.value) {
    showErr(message, "Поле Сообщение обязательно к заполнению");
    return;
  }

  // sending form
  let result = await fetch("https://push.kubteh.ru/lp/mailer/sendmsg", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: msg,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin'
  });

  result = await result.json();

  if (result.success) {
    // success logic is there

    // reset fields values
    name.value = "";
    name.setCustomValidity("");
    name.required = false;
    email.value = "";
    email.setCustomValidity("");
    email.required = false;
    phone.value = "";
    phone.setCustomValidity("");
    phone.required = false
    message.value = "";
    message.setCustomValidity("");
    message.required = false;

    // close current modal
    document.querySelector("#sendRequest .close").click();

    // show success modal
    // open logic
    document.querySelector('.shadow').style.display = 'block';
    document.querySelector('#success').style.display = 'block';
    document.querySelector('#success').classList.add('show');
    document.querySelector('html').classList.add('modal-open');

    // close logic
    Array.from(document.querySelectorAll('#success button')).map((elem) =>
      elem.addEventListener('click', () => {
        document.querySelector('.shadow').style.display = 'none';
        document.querySelector('#success').classList.remove('show');
        document.querySelector('#success').style.display = 'none';
        document.querySelector('html').classList.remove('modal-open');
      }));
  }
})
