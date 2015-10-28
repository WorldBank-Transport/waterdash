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
});

export default OpenClosed;
