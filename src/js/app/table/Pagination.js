let Pagination = function (parent) {

  let countPages = Math.ceil(state.date.length / state.countStringOnPage);

  let nav = createDOMElement('nav', parent);

  let ul = createDOMElement('ul', nav, 'pagination justify-content-center');

  let elementPrevious = createDOMElement('li', ul, 'page-item');
  let previousButton = createDOMElement('button', elementPrevious, 'page-link');
  createDOMElement({
    tagName: 'span',
    parent: previousButton,
    property: {
      innerHTML: '&laquo;',
    },
  });
  if (state.currentPage === 0) {
    elementPrevious.classList.add('disabled');
  } else {
    elementPrevious.addEventListener('click', function () {
      state.currentPage -= 1;
      app.table.render(app.parent);
    });
  }

  let maxButtons = 7;
  let startIndex;


  if (state.currentPage > Math.floor(maxButtons / 2)) {
    startIndex = state.currentPage - Math.floor(maxButtons / 2);
    if (countPages - state.currentPage < Math.ceil(maxButtons / 2)) {
      startIndex = countPages - maxButtons;
    }
  } else {
    startIndex = 0;
  }

  let endIndex = startIndex + maxButtons;

  for (let i = startIndex; i < Math.min(countPages, endIndex); i++) {
    let li = createDOMElement('li', ul, 'page-item');
    let pageNumberButton = createDOMElement({
      tagName: 'button',
      parent: li,
      property: {
        className: 'page-link',
        textContent: i + 1,
      },
    });

    li.addEventListener('click', function () {
      state.currentPage = i;
      app.table.render(app.parent);
      app.controls.refreshAppButtons();

    });

    if (state.currentPage === i) {
      li.classList.add('active');
    }
  }

  let elementNext = createDOMElement('li', ul, 'page-item');
  let nextButton = createDOMElement('button', elementNext, 'page-link');
  createDOMElement({
    tagName: 'span',
    parent: nextButton,
    property: {
      innerHTML: '&raquo;',
    },
  });
  if (state.currentPage === countPages - 1) {
    elementNext.classList.add('disabled');
  } else {
    elementNext.addEventListener('click', function () {
      state.currentPage += 1;
      app.table.render(app.parent);
    });
  }
};

module.exports = Pagination;