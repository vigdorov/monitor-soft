/*
Функция создания DOM елементов, имеет два режима работы. Позволяет создавать
практически любые элементы одной командой.

1-ый режим:
Принимает 3-и параметра - имя тега, куда поместить элемент и имя класса

2-ой режим:
Принимает объект в виде
{
  tagName: имя тега,
  parent: куда поместить элемент
  property: {
    любые параметры объекта DOM
  },
  attributes: {
    любый аттрибуты объекта DOM
  }
}

Функция всегда возвращает собранный объект, при этом обязательный только
один параметр это имя тега.

 */

;(function() {
  let createDOMElement = function(tagName, parent, className) {
    if (!tagName) {
      console.error('createDOMElement: tagName is empty!');
      return null;
    }

    let element;

    if (typeof tagName === 'string') {
      element = document.createElement(tagName);

      if (parent) {
        parent.appendChild(element);
      }

      if (className) {
        element.className = className;
      }

    } else {
      let setting = tagName;
      element = document.createElement(setting.tagName);

      if (setting.parent) {
        setting.parent.appendChild(element);
      }

      // Парсит свойства объекта DOM в рекурсии, что позволяет менять свойства
      // любой глубины объекта. Очень удобно задавать стили
      if (setting.property) {
        let addElementProperty = function(element, property) {
          for (let key in property) {
            if (typeof property[key] === 'object') {
              addElementProperty(element[key], property[key]);
            } else {
              element[key] = property[key];
            }
          }
        };

        addElementProperty(element, setting.property);
      }

      if (setting.attributes) {
        for (let attr in setting.attributes) {
          if (setting.attributes.hasOwnProperty(attr)) {
            element.setAttribute(attr, setting.attributes[attr]);
          }
        }
      }
    }

    return element;
  };

  window.createDOMElement = createDOMElement;
})();


