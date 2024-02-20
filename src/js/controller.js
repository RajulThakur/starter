import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './viewJS/searchView.js';
import * as modal from './modal.js';
import recipeView from './viewJS/recipeView.js';
import resultView from './viewJS/resultView.js';
import PaginationView from './viewJS/pagination.js';
import bookmarkView from './viewJS/bookmarkView.js';
import addRecipeView from './viewJS/addRecipeView.js';
import { MODAL_CLOSE_SEC, RES_PER_PAGE } from './config.js';

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //update result view to mark selected
    resultView.update(modal.getSearchResultPage());
    bookmarkView.update(modal.state.bookmarks);
    //1)getting data
    await modal.loadRecipe(id);
    //2) rending recipe
    recipeView.render(modal.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    //1. get search query
    const query = searchView.getQuery();
    if (!query) return;
    resultView.renderSpinner();

    //2.loading Search result
    await modal.loadSearchResult(query);

    //3.render results
    resultView.render(modal.getSearchResultPage());

    //4. render pagination buttons
    PaginationView.render(modal.state.search);

  } catch (err) {
    throw err;
  }
};

const controlPagination = function (goToPage) {
  //rendering again list
  resultView.renderSpinner();
  resultView.render(modal.getSearchResultPage(goToPage));

  //4. render pagination buttons
  PaginationView.render(modal.state.search);
};

const controlServing = function (newServing) {
  //update the recipe serving (in state)
  modal.updateServing(newServing);
  //update the recipe view
  recipeView.update(modal.state.recipe);
};

const controlAddBookmark = function () {
  //1 add remove bookmark
  if (!modal.state.recipe.bookmarked) modal.addBookMark(modal.state.recipe);
  else modal.deleteBookMark(modal.state.recipe);

  //2 update recipe view
  recipeView.update(modal.state.recipe);

  //3
  bookmarkView.render(modal.state.bookmarks);
};

const controlBookmark = function () {
  bookmarkView.render(modal.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await modal.uploadRecipe(newRecipe);
    
    // Success message
    addRecipeView.renderMessage();
    
    // Render bookmark view
    bookmarkView.render(modal.state.bookmarks);
    
    //change id in url
    window.history.pushState(null,'',`#${modal.state.recipe.id}`);

    //close form
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
    recipeView.renderMessage(); 
    // Render recipe
    recipeView.render(modal.state.recipe);
  } catch (err) {
    console.error(`💥💥💥💥💥💥 ${err}`);
    addRecipeView.renderError(err.message);
  }
};


//)listening to events
const init = function () {
  bookmarkView.addHandleRender(controlBookmark);

  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerBookmark(controlAddBookmark);
  PaginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
