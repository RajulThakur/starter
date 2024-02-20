import View from './view.js';
import icons from 'url:../../../src/img/icons.svg'; //parcel 2
import previewView from './previewView.js';

class resultView extends View {
  _errorMessage = 'No recipe is found for your Query';
  _parentElement = document.querySelector('.results');
  _generateMarkup() {
    return this._data
      .map(ele => previewView.render(ele, false))
      .join('');
  }
}
export default new resultView();
