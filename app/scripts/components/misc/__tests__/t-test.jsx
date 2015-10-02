/* eslint-env jest */
describe('Translator component', () => {
  jest.dontMock('../../../stores/lang');
  let React, T;
  beforeEach(() => {
    React = require('react/addons');
    T = require.requireActual('../t.jsx').default;
  });

  it('should render the key if no translation is found', () => {
    const t = React.addons.TestUtils.renderIntoDocument(<T k="not.a.real.key" />);
    expect(React.findDOMNode(t).textContent).toEqual('not.a.real.key');
  });

  it('should render the translated string', () => {
    const t = React.addons.TestUtils.renderIntoDocument(<T k="site-name" />);
    expect(React.findDOMNode(t).textContent).toEqual('Water Dashboard');
  });

  it('should interpolate the translated string', () => {
    const t = React.addons.TestUtils.renderIntoDocument(
      <T i={['test']} k="error.api.ckan.record-missing-field" />
    );
    expect(React.findDOMNode(t).textContent)
      .toEqual('A record from the CKAN data server was missing the field \'test\'');
  });

});
