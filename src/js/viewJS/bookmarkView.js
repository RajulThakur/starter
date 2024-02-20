import View from './view.js';
import icons from 'url:../../../src/img/icons.svg'; //parcel 2
import previewView from './previewView.js';

class bookmarkView extends View {
  _errorMessage = 'No bookmark yet .Find a recipe and bookmark';
  _parentElement = document.querySelector('.bookmarks__list');
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
  addHandleRender(handler){
    window.addEventListener('load',handler)
  }
}

export default new bookmarkView();
