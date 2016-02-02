import { createStore } from 'reflux';
import SaneStore from '../utils/sane-store-mixin';
import { toggleStatus } from '../actions/waterpoint-status';
import { setExclude } from '../actions/filters';

const WaterpointStatusStore = createStore({
  initialData: {
    FUNCTIONAL: true,
    'FUNCTIONAL NEEDS REPAIR': true,
    'NON FUNCTIONAL': true,
  },
  mixins: [SaneStore],
  init() {
    this.listenTo(toggleStatus, 'update');
  },
  update(what) {
    const newState = {
      ...this.get(),
      [what]: !this.get()[what],
    };
    this.setData(newState);
    const statuses = Object.keys(newState).filter(s => !newState[s]);
    const statusWinNonFunctional = [];
    statuses.forEach(s => {
      if (s === 'NON FUNCTIONAL') {
        statusWinNonFunctional.push('NON FUNCTIONAL > 6M');
        statusWinNonFunctional.push('NON FUNCTIONAL > 3M');
        statusWinNonFunctional.push('NON FUNCTIONAL < 6M');
        statusWinNonFunctional.push('NON FUNCTIONAL < 3M');
      }
      statusWinNonFunctional.push(s);
    });
    setExclude('STATUS', statusWinNonFunctional);
  },
});

export default WaterpointStatusStore;
