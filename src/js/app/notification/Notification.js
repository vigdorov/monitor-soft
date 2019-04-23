let Notification = function () {

  let div = createDOMElement({
    tagName: 'div',
    parent: document.body,
    property: {
      style: {
        display: 'block',
        position: 'fixed',
        top: '60px',
        right: '10px',
        maxWidth: '300px',
      }
    }
  });

  // Функция принимает сообщение в виде объекта (заголовок и текст)
  this.createMsg = function (msg) {

    let color = msg.color || 'info';

    let body = createDOMElement({
      tagName: 'div',
      parent: div,
      property: {
        className: 'alert alert-dismissible fade show alert-' + color,
      },
      attributes: {
        role: 'alert',
      },
    });

    // таймер жизни сообщения 5 секунд
    setTimeout(function () {
      try {
        div.removeChild(body);
      } catch {}
    }, 5000);

    // убираем сообщение по клику
    body.addEventListener('click', function () {
      div.removeChild(body);
    });

    createDOMElement({
      tagName: 'strong',
      parent: body,
      property: {
        textContent: msg.header,
      },
    });

    createDOMElement({
      tagName: 'div',
      parent: body,
      property: {
        textContent: msg.text,
      },
    });

    let closeButton = createDOMElement({
      tagName: 'button',
      parent: body,
      property: {
        className: 'close',
      },
      attributes: {
        type: 'button',
        'data-dismiss': 'alert',
        'aria-label': 'Close',
      },
    });

    createDOMElement({
      tagName: 'span',
      parent: closeButton,
      property: {
        innerHTML: '&times;',
      }
    });

  };
};

module.exports = Notification;