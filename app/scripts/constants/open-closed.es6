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
});

export default OpenClosed;
