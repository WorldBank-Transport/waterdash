import { Union } from 'results';

const OpenClosed = Union({
  Open: {},
  Closed: {},
}, {
  toggle() {
    return OpenClosed.match(this, {
      Open: () => OpenClosed.Closed(),
      Closed: () => OpenClosed.Open(),
    });
  },
  getId() {
    return OpenClosed.match(this, {
      Open: () => 'opened',
      Closed: () => 'closed',
    });
  },
}, { // static
  fromParam(param) {
    if (param === 'opened') {
      return OpenClosed.Open();
    } else if (param === 'closed') {
      return OpenClosed.Closed();
    } else {
      throw new Error(`Could not get OpenClosed type for param '${param}'`);
    }
  },
});

export default OpenClosed;
