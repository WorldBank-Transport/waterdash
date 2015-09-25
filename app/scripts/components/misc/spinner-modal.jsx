import React, { PropTypes } from 'react';
import T from './t';

require('stylesheets/misc/spinner-modal');

const SpinnerModal = React.createClass({
  propTypes: {
    retry: PropTypes.func,
    state: PropTypes.object.isRequired,
  },
  render() {
    return this.props.state.match({
      Finished: () => <div style={{display: 'none'}}></div>,
      Active: () => (
        <div className="spinner-modal">
          <div className="spinner">TODO: replace me with the font-awesome spinner</div>
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
