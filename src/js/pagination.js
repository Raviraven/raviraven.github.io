import { createProjectSection, getReposArray } from "./repositories.js";
export { paginationSetup, loadPageByNumber, nextPage, previousPage };

let repositoriesArray = [];

let reposPerPage = 6;
let currentPage = 1;
let totalPages = 0;
let projectsContainerClass = ".projects__container--js";
let pagesContainerClass = ".projects__pagination--js";

async function paginationSetup() {
  repositoriesArray = await getReposArray();
  totalPages = getTotalPages();
  loadPageByNumber(currentPage);
}

function getTotalPages() {
  let total = repositoriesArray.length / reposPerPage;
  if (total < 1) return 1;
  else if (total % 1 === 0) return total;
  else return parseInt(total) + 1;
}

function loadPageByNumber(nextPage) {
  const projectsContainer = document.querySelector(projectsContainerClass);
  let dataToShow = getDataFromArrayByPage(nextPage);
  if (dataToShow == undefined || dataToShow.length <= 0) return;
  addDataIntoHtml(projectsContainer, dataToShow);
  addPagesIntoHtml(totalPages, nextPage);
}

function addDataIntoHtml(repositoriesContainer, dataToInsertArray) {
  repositoriesContainer.innerHTML = "";
  dataToInsertArray.forEach((element) => {
    repositoriesContainer.innerHTML += createProjectSection(
      element.name,
      element.description,
      element.homepage,
      element.html_url
    );
  });
}

function getDataFromArrayByPage(nextPage) {
  if (nextPage <= 0 || nextPage > totalPages) return;

  currentPage = nextPage;
  let firstItemToShow = parseInt((nextPage - 1) * reposPerPage);
  let lastItemToShow = parseInt(firstItemToShow + reposPerPage);
  return repositoriesArray.slice(firstItemToShow, lastItemToShow);
}

const nextPage = () => loadPageByNumber(currentPage + 1);
const previousPage = () => loadPageByNumber(currentPage - 1);

function addPagesIntoHtml(totalPages, currentPage) {
  let pagesContainer = document.querySelector(pagesContainerClass);
  pagesContainer.innerHTML = getPaginationHtml(totalPages, currentPage);
}

function getPaginationHtml(totalPages, currentPage) {
  if (totalPages <= 1) return "";

  let innerHtml = ``;
  innerHtml += createSinglePageSpan(
    "<",
    "projects__pagination--arrow",
    "previousPage();"
  );

  for (let i = 0; i < totalPages; i++) {
    let cssClass = "";
    if (i + 1 == currentPage) {
      cssClass = "projects__pagination--active";
    }
    innerHtml += createSinglePageSpan(
      i + 1,
      cssClass,
      `loadPageByNumber(${i + 1});`
    );
  }

  innerHtml += createSinglePageSpan(
    ">",
    "projects__pagination--arrow",
    "nextPage();"
  );
  return innerHtml;
}

function createSinglePageSpan(spanText, spanClass, onclick) {
  let pageSpan = `<a href="#projects-container" class="${spanClass}" onclick="${onclick}">${spanText}</a>`;
  return pageSpan;
}
