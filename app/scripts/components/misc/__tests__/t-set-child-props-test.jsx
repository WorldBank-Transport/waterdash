/* eslint-env jest */
describe('Translator component wrapper', () => {
  jest.dontMock('../t');
  jest.dontMock('../../../stores/lang');
  let React, TS;
  beforeEach(() => {
    React = require('react/addons');
    TS = require.requireActual('../t-set-child-props.jsx');
  });

  it('should put translated props on its child', () => {
    const ts = React.addons.TestUtils.renderIntoDocument(
      <TS>
        <img alt={{k: 'site-name'}} />
      </TS>
    );
    const img = React.addons.TestUtils.findRenderedDOMComponentWithTag(ts, 'img');
    const attrText = React.findDOMNode(img).getAttribute('alt');
    expect(attrText).toBeDefined();
    expect(attrText).toEqual('Water Dashboard');
  });

  it('should put translated props on the object prop which has a k', () => {
    const ts = React.addons.TestUtils.renderIntoDocument(
      <TS>
        <text tooltip={{propA: {k: 'site-name'}}} />
      </TS>
    );
    const wc = React.addons.TestUtils.findRenderedDOMComponentWithTag(ts, 'text');
    const objTranslated = wc.props.tooltip;
    expect(objTranslated).toBeDefined();
    expect(objTranslated).toEqual({propA: 'Water Dashboard'});
  });

  it('should break to put translated props on the object prop which has two a k', () => {
    expect(() => React.addons.TestUtils.renderIntoDocument(
      <TS>
        <text tooltip={{propA: {k: 'site-name'}, propB: {k: 'site.flag'}}} />
      </TS>
    )).toThrow('TSetChildProps on object props should one k element.');
  });

  it('should break for no children', () => {
    expect(() => React.addons.TestUtils.renderIntoDocument(
      <TS />
    )).toThrow('TSetChildProps must wrap exactly one child element. Got 0 children.');
  });

  it('should break for multiple children', () => {
    expect(() => React.addons.TestUtils.renderIntoDocument(
      <TS>
        <img alt={{k: 'site-name'}} />
        <img alt={{k: 'site-name'}} />
      </TS>
    )).toThrow('TSetChildProps must wrap exactly one child element. Got 2 children.');
  });

  it('should break for string children', () => {
    expect(() => React.addons.TestUtils.renderIntoDocument(
      <TS>abc</TS>
    )).toThrow('TSetChildProps must wrap exactly one component. There is one child, but maybe it is a string instead of a proper element?');
  });

});
