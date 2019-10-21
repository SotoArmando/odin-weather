'use strict';

import _ from 'lodash';

function initDom() {
    let body = document.querySelector("body");
    let head = document.createElement("head");
    let _body = document.createElement("body-content");
    let footer = document.createElement("footer");

    body.appendChild(head);
    body.appendChild(_body);
    body.appendChild(footer);

    return { head, body: _body, footer };
}