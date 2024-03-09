import request from 'request-ecoe';
import scimitar from 'scimitar-tools';


const className = 'lets-toast';

const defaultOptions = {
  delay: 3000,
  dismiss: 'dismiss',
  dismissible: false,
  hPos: 'center',
  newestAtTop: true,
  severity: 'info',
  vPos: 'top',
};

function removeListItem(
  ul,
  li,
) {
  li.remove();
  const listItems = ul.querySelector('li');
  if (!listItems) {
    ul.remove();
  }
}

function Toast(initOptions  = {}) {
  return (message, options) => {
    const opts = { ...defaultOptions, ...initOptions, ...options };

    if (!ul) {
      ul = document.createElement('ul');
      ul.dataset.toast = '';
      ul.classList.add(className);
      ul.classList.add(`${className}--vpos-${opts.vPos}`);
      ul.classList.add(`${className}--hpos-${opts.hPos}`);
    }

    const li = document.createElement('li');
    li.classList.add(`${className}__item`);
    li.classList.add(`${className}__item--${opts.severity}`);

    const p = document.createElement('p');
    p.classList.add(`${className}__text`);
    const text = document.createTextNode(message);
    p.append(text);

    li.append(p);

    if (opts.dismissible) {
      const button = document.createElement('button');
      button.classList.add(`${className}__dismiss`);
      button.setAttribute('type', 'button');
      const buttonText = document.createTextNode(opts.dismiss);
      button.append(buttonText);
      button.addEventListener('click', () => {
        removeListItem(ul, li);
      });
      li.appendChild(button);
    }

    const newestAtTop = ['top', 'center'].includes(opts.vPos)
      ? opts.newestAtTop
      : !opts.newestAtTop;
    if (newestAtTop) {
      ul.insertBefore(li, ul.childNodes[0]);
    } else {
      ul.appendChild(li);
    }

    if (opts.delay > 0) {
      setTimeout(() => {
        removeListItem(ul, li);
      }, opts.delay);
    }

    document.body.appendChild(ul);
  };
}