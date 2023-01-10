import React from 'react';
import ReactDOM from 'react-dom';
import './options.css';

const Test = <p>hello world</p>;

const rootElement = document.createElement('div');
rootElement.setAttribute('id', 'root');
document.body.appendChild(rootElement);

ReactDOM.render(Test, rootElement);
