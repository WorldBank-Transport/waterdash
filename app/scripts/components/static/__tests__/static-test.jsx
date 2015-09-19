/**
 * All static component tests have been combined into this file because
 * it's really the same single test run against each.
 */

describe('Static Components', () => {
  var React, Data, SpeakOut, NotFound;
  beforeEach(() => {
    React = require('react/addons');
    Data = require.requireActual('../data.jsx');
    SpeakOut = require.requireActual('../speak-out.jsx');
    NotFound = require.requireActual('../not-found.jsx');
  });

  /**
   * Having the class "main" is important because it's used to absolutely
   * position the content in the full-screen layout.
   */
  it('should have class "main"', () => {
    let data = React.addons.TestUtils.renderIntoDocument(<Data />);
    expect(React.findDOMNode(data).className).toEqual('main');

    let speakOut = React.addons.TestUtils.renderIntoDocument(<SpeakOut />);
    expect(React.findDOMNode(speakOut).className).toEqual('main');

    let notFound = React.addons.TestUtils.renderIntoDocument(<NotFound />);
    expect(React.findDOMNode(notFound).className).toEqual('main');
  });

});
