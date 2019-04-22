let Header = function (table) {

  let thead = createDOMElement('thead', table, 'thead-dark');
  let tr    = createDOMElement('tr', thead);

  let headers = state.date[0];

  for (let key in headers) {
    createDOMElement({
      tagName: 'th',
      parent: tr,
      property: {
        textContent: key,
      },
    });
  }

};

module.exports = Header;