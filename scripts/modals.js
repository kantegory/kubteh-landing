const openModal = document.querySelector('.contacts__action');

openModal.addEventListener('click', () => {
  // open logic
  document.querySelector('.shadow').style.display = 'block';
  document.querySelector('#sendRequest').style.display = 'block';
  document.querySelector('#sendRequest').classList.add('show');
  document.querySelector('html').classList.add('modal-open');
  
  // close logic
  document.querySelector('#sendRequest .close').addEventListener('click', () => {
    document.querySelector('.shadow').style.display = 'none';
    document.querySelector('#sendRequest').classList.remove('show');
    document.querySelector('#sendRequest').style.display = 'none';
    document.querySelector('html').classList.remove('modal-open');
  })
});
