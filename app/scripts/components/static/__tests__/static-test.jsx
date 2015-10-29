/* eslint-env jest */

/**
 * All static component tests have been combined into this file because
 * it's really the same single test run against each.
 */

describe('Static Components', () => {
  let React, Homepage, Data, SpeakOut, NotFound;
  beforeEach(() => {
    React = require('react/addons');
    Homepage = require.requireActual('../homepage.jsx');
    Data = require.requireActual('../data.jsx');
    SpeakOut = require.requireActual('../speak-out.jsx');
    NotFound = require.requireActual('../not-found.jsx');
  });

  /**
   * Having the class "main" is important because it's used to absolutely
   * position the content in the full-screen layout.
   */
  it('should have class "main"', () => {
    const data = React.addons.TestUtils.renderIntoDocument(<Data />);
    expect(React.findDOMNode(data).className).toEqual('main');

    const homepage = React.addons.TestUtils.renderIntoDocument(<Homepage />);
    expect(React.findDOMNode(homepage).className).toEqual('main');

    const speakOut = React.addons.TestUtils.renderIntoDocument(<SpeakOut />);
    expect(React.findDOMNode(speakOut).className).toEqual('main');

    const notFound = React.addons.TestUtils.renderIntoDocument(<NotFound />);
    expect(React.findDOMNode(notFound).className).toEqual('main');
  });

});
