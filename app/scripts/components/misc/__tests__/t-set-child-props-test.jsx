/* eslint-env jest */
describe('Translator component wrapper', () => {
  let React, TS;
  beforeEach(() => {
    React = require('react/addons');
    TS = require.requireActual('../t-set-child-props.jsx');
  });

  it('should put translated props on its child', () => {
    const ts = React.addons.TestUtils.renderIntoDocument(
      <TS props={{alt: 'site-name'}}>
        <img />
      </TS>
    );
    const img = React.addons.TestUtils.findRenderedDOMComponentWithTag(ts, 'img');
    const attrText = React.findDOMNode(img).getAttribute('alt');
    expect(attrText).toBeDefined();
    expect(attrText).toEqual('Water Dashboard');
  });

  it('should override the child\'s prop', () => {
    const ts = React.addons.TestUtils.renderIntoDocument(
      <TS props={{alt: 'site-name'}}>
        <img alt="blah blah" />
      </TS>
    );
    const img = React.addons.TestUtils.findRenderedDOMComponentWithTag(ts, 'img');
    const attrText = React.findDOMNode(img).getAttribute('alt');
    expect(attrText).toBeDefined();
    expect(attrText).toEqual('Water Dashboard');
  });

  it('should break for no children', () => {
    expect(() => React.addons.TestUtils.renderIntoDocument(
      <TS props={{alt: 'site-name'}} />
    )).toThrow('TSetChildProps must wrap exactly one child element. Got 0 children.');
  });

  it('should break for multiple children', () => {
    expect(() => React.addons.TestUtils.renderIntoDocument(
      <TS props={{alt: 'site-name'}}>
        <img />
        <img />
      </TS>
    )).toThrow('TSetChildProps must wrap exactly one child element. Got 2 children.');
  });

  it('should break for string children', () => {
    expect(() => React.addons.TestUtils.renderIntoDocument(
      <TS props={{alt: 'site-name'}}>'abc'</TS>
    )).toThrow('TSetChildProps must wrap exactly one component. There is one child, but maybe it is a string instead of a proper element?');
  });

});
