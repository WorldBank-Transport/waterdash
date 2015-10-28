/* eslint-env jest */

/**
 * All static component tests have been combined into this file because
 * it's really the same single test run against each.
 */

describe('Static layout', () => {
  let React, StaticLayout;
  beforeEach(() => {
    React = require('react/addons');
    StaticLayout = require.requireActual('../layout.jsx');
  });

  /**
   * Having the class "main" is important because it's used to absolutely
   * position the content in the full-screen layout.
   */
  it('should have class "main"', () => {
    const data = React.addons.TestUtils
      .renderIntoDocument(<StaticLayout><p>child content</p></StaticLayout>);
    expect(React.findDOMNode(data).className.indexOf('main')).not.toEqual(-1);
  });

});
