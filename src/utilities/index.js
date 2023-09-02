'use strict';

console.log('test');

fetch('./test.json')
.then(res => res.json())
.then(data => console.log(data.dataForCards.data));