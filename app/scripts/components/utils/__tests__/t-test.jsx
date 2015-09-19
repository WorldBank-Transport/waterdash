/* eslint-env jest */
describe('Translator component', () => {
  let React, T;
  beforeEach(() => {
    React = require('react/addons');
    T = require.requireActual('../t.jsx');
  });

  it('should render the key if no translation is found', () => {
    const t = React.addons.TestUtils.renderIntoDocument(<T k="not.a.real.key" />);
    expect(React.findDOMNode(t).textContent).toEqual('not.a.real.key');
  });

  it('should render the translated string', () => {
    const t = React.addons.TestUtils.renderIntoDocument(<T k="site-name" />);
    expect(React.findDOMNode(t).textContent).toEqual('Water Dashboard');
  });

});
