export const getActualWidth = (element) => {
  const getFont = (el) => {
    const props = [
      'font-style',
      'font-variant',
      'font-weight',
      'font-size',
      'font-family',
    ];
    const font = [];
    props.forEach((prop) => {
      font.push(window.getComputedStyle(el, null).getPropertyValue(prop));
    });
    return font.join(' ');
  };

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = getFont(element);
  return context.measureText(element.value).width;
};

export const isDigit = value => /\d/.test(value);

export const setCaretPosition = (element, position) => {
  element.setSelectionRange(position, position);
};
