/* eslint-env jest */
describe('Translator component', () => {
  jest.dontMock('results');
  let React, state, SpinnerModal;
  beforeEach(() => {
    React = require('react/addons');
    state = require.requireActual('../../../constants/async').state;
    SpinnerModal = require.requireActual('../spinner-modal.jsx');
  });

  it('should be invisible if the async state is Finished', () => {
    const t = React.addons.TestUtils.renderIntoDocument(
      <SpinnerModal state={state.Finished(new Date())} />);
    expect(React.findDOMNode(t).style.display).toEqual('none');
  });

  it('should show a spinner if the state is Active', () => {
    const t = React.addons.TestUtils.renderIntoDocument(
      <SpinnerModal state={state.Active(new Date())} />);
    const display = React.findDOMNode(t).style.display;
    expect(display).not.toEqual('none');
    const classes = React.findDOMNode(t).className;
    expect(/failed/.test(classes)).toBe(false);
  });

  it('should show a failed overlay if the state is Failed', () => {
    const t = React.addons.TestUtils.renderIntoDocument(
      <SpinnerModal state={state.Failed(new Date(), {})} />);
    const classes = React.findDOMNode(t).className;
    expect(/failed/.test(classes)).toBe(true);
  });

});
