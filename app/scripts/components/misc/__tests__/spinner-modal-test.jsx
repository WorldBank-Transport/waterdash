/* eslint-env jest */
describe('Spinner Modal', () => {
  jest.dontMock('results');
  jest.dontMock('../../../constants/async');
  jest.dontMock('../t');
  let React, Async, SpinnerModal;
  beforeEach(() => {
    React = require('react/addons');
    Async = require.requireActual('../../../constants/async');
    SpinnerModal = require.requireActual('../spinner-modal.jsx');
  });

  it('should be invisible if the async state is Finished', () => {
    const t = React.addons.TestUtils.renderIntoDocument(
      <SpinnerModal state={Async.Finished(new Date())} />);
    expect(React.findDOMNode(t).style.display).toEqual('none');
  });

  it('should show a spinner if the state is Active', () => {
    const t = React.addons.TestUtils.renderIntoDocument(
      <SpinnerModal state={Async.Active(new Date())} />);
    const display = React.findDOMNode(t).style.display;
    expect(display).not.toEqual('none');
    const classes = React.findDOMNode(t).className;
    expect(/failed/.test(classes)).toBe(false);
  });

  it('should show a failed overlay if the state is Failed', () => {
    const t = React.addons.TestUtils.renderIntoDocument(
      <SpinnerModal state={Async.Failed({k: 'test-fail'})} />);
    const classes = React.findDOMNode(t).className;
    expect(/failed/.test(classes)).toBe(true);
  });

});
