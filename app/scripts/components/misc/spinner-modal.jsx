import React, { PropTypes } from 'react';
import AsyncState from '../../constants/async';
import T from './t';
import TChildProps from './t-set-child-props';
import { translatable } from '../types';

require('stylesheets/misc/spinner-modal');

const SpinnerModal = React.createClass({
  propTypes: {
    message: translatable.isRequired,
    retry: PropTypes.func,
    state: PropTypes.object.isRequired,
  },
  render() {
    return AsyncState.match(this.props.state, {
      Finished: () => <div style={{display: 'none'}}></div>,
      Active: () => (
        <div className="spinner-modal">
          <div className="spinner">
            <TChildProps>
              <img alt={{k: 'loading'}} src="/images/loading-icon.gif" />
            </TChildProps>
            <p>{this.props.message}</p>
          </div>
        </div>
      ),
      Failed: ({ k, i }) => (
        <div className="spinner-modal failed">
          <div className="fail-message">
            <h1><T k="error" /></h1>
            <p><T i={i} k={k} /></p>
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
