import React, { PropTypes } from 'react';
import T from './t';
import TChildProps from './t-set-child-props';

require('stylesheets/misc/spinner-modal');

const SpinnerModal = React.createClass({
  propTypes: {
    retry: PropTypes.func,
    state: PropTypes.object.isRequired,
    message: PropTypes.string,
  },
  render() {
    return this.props.state.match({
      Finished: () => <div style={{display: 'none'}}></div>,
      Active: () => (
        <div className="spinner-modal">
          <div className="spinner">
            <TChildProps>
              <img alt={{k: 'loading'}} src="/images/loading-icon.gif" />
            </TChildProps>
            {this.props.message}
          </div>
        </div>
      ),
      Failed: ({ errKey, errInterp }) => (
        <div className="spinner-modal failed">
          <div className="fail-message">
            <h1><T k="error" /></h1>
            <p><T i={errInterp} k={errKey} /></p>
            {this.props.retry && (
              <p className="retry">
                <button
                    onClick={this.props.retry}
                    type="button">
                  <T k="error.retry" />
                </button>
              </p>
            )}
          </div>
        </div>
      ),
    });
  },
});

export default SpinnerModal;
