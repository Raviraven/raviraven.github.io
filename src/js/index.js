import '../scss/main.scss';

import { paginationSetup, loadPageByNumber, nextPage, previousPage } from './pagination.js'

console.log('Welcome to the dark side 😈');

paginationSetup();

window.nextPage = nextPage;
window.previousPage = previousPage;
window.loadPageByNumber = loadPageByNumber;