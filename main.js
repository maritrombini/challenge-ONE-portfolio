(function () {
  'use strict';

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  let backtotop = document.querySelector('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  const btn = document.querySelector('.hamburger-icon');
  const body = document.querySelector('body');
  const html = document.querySelector('html');

  btn.addEventListener('click', function (e) {
    if (body.classList.contains('mobile-nav-active')) {
      body.classList.remove('mobile-nav-active');
    } else {
      body.classList.add('mobile-nav-active');
    }
  });

  btn.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
      } else {
        body.classList.add('mobile-nav-active');
      }
    }
  });

  html.addEventListener('click', function (e) {
    if (e.target !== btn) body.classList.remove('mobile-nav-active');
  });

  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    let fields = document.querySelectorAll('.form-control');
    fields.forEach((field) => {
      field.addEventListener('input', function () {
        this.classList.remove('is-invalid');
      });
    });
  });
})();

document.getElementById('nome').addEventListener('blur', () => {
  validateName();
});

document.getElementById('assunto').addEventListener('blur', () => {
  validateSubject();
});

document.getElementById('mensagem').addEventListener('blur', () => {
  validateMessage();
});

const validateForm = () => {
  clearErrors();

  if (!validateName() || !validateSubject() || !validateMessage()) {
    return false;
  }

  return true;
};

const validateName = () => {
  let name = document.getElementById('nome').value.trim();
  if (name.length < 2) {
    showError('nome', 'O nome deve ter no mínimo 2 caracteres.');
    return false;
  }
  return true;
};

const validateSubject = () => {
  let subject = document.getElementById('assunto').value.trim();
  if (subject.length < 2) {
    showError('assunto', 'O assunto deve ter no mínimo 2 caracteres.');
    return false;
  }
  return true;
};

const validateMessage = () => {
  let message = document.getElementById('mensagem').value;
  if (message.length < 10) {
    clearErrors();
    showError('mensagem', 'A mensagem deve ter pelo menos 10 caracteres.');
    return false;
  }
  return true;
};

const sendEmail = () => {
  clearErrors();

  if (!validateForm()) {
    return false;
  }

  setTimeout(() => {
    clearForm();
  }, 3000);
  return true;
};

const showError = (field, message) => {
  let errorDiv = document.createElement('div');
  errorDiv.className = 'invalid-feedback';
  errorDiv.textContent = message;

  let parent = document.getElementById(field).parentNode;

  let existingError = parent.querySelector('.invalid-feedback');
  if (existingError) {
    existingError.remove();
  }

  parent.appendChild(errorDiv);
  document.getElementById(field).classList.add('is-invalid');
};

const clearErrors = () => {
  let errorMessages = document.querySelectorAll('.invalid-feedback');
  errorMessages.forEach((message) => message.remove());

  let fields = document.querySelectorAll('.form-control');
  fields.forEach((field) => {
    field.classList.remove('is-invalid');
    field.classList.remove('is-valid');
  });
};

const clearForm = () => {
  document.getElementById('form-reset').reset();
  clearErrors();
};
