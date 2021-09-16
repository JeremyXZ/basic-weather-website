const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const message3 = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
  message1.textContent = 'Loading...';
  message2.textContent = '';
  message3.textContent = '';

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent =
          'Please enter a valid search term and try again!';
      } else {
        message1.textContent = location;
        message2.textContent = data.condition;
        message3.innerHTML = data.temperature + ' &#8451;';
        search.value = ''; //remove the previous value on the search form
      }
    });
  });
});
