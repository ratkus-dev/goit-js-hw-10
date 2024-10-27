import iziToast from 'izitoast';
// import iconOk from '/img/ok.svg';
// import iconError from '/img/error.svg';

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(event.target.delay.value);
  const state = event.target.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        titleColor: 'white',
        position: 'topRight',
        backgroundColor: 'green',
        messageColor: 'white',
        title: 'OK',
        // iconUrl: iconOk,
        message: `Fulfilled promise in ${delay}ms`,
      });
    })

    .catch(delay => {
      iziToast.error({
        titleColor: 'white',
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
        title: 'Error',
        iconUrl: iconError,
        message: `Rejected promise in ${delay}ms`,
      });
    });
});
