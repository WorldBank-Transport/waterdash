import { createStore } from 'reflux';
import saneStore from '../utils/sane-store-mixin';
import { pdfProgress, pdfCompleted } from '../actions/share';
import AsyncState from '../constants/async';

const PdfLoadingStore = createStore({
  initialData: AsyncState.Finished(),
  mixins: [saneStore],
  init() {
    this.listenTo(pdfProgress, 'loadStart');
    this.listenTo(pdfCompleted, 'loadCompleted');
  },
  loadStart() {
    this.setData(AsyncState.Active());
  },
  loadCompleted() {
    this.setData(AsyncState.Finished());
  },
});

export default PdfLoadingStore;
