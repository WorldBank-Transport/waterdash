import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import setLanguage from '../actions/lang';


const LangStore = createStore({
  initialData: 'en',
  mixins: [SaneStore],
  init() {
    this.listenTo(setLanguage, 'setLanguage');
  },
  setLanguage(lang) {
    this.setData(lang);
  },
});


export default LangStore;
