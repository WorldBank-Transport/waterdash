import React, { PropTypes } from 'react';
import { Maybe } from 'results';
import { Link } from 'react-router';
import DataTypes from '../../constants/data-types';
import ViewModes from '../../constants/view-modes';
import OpenClosed from  '../../constants/open-closed';
import T from '../misc/t';
import TSetChildProps from '../misc/t-set-child-props';

require('stylesheets/boilerplate/view-mode');

const ViewMode = React.createClass({
  propTypes: {
    dataType: PropTypes.instanceOf(DataTypes.OptionClass).isRequired,
    openClosed: PropTypes.instanceOf(OpenClosed.OptionClass),
    viewMode: PropTypes.instanceOf(DataTypes.ViewModes).isRequired,
  },
  renderLink(viewMode, k) {
    const { dataType } = this.props;
    return (
      <li>
        {Maybe.match(dataType.getLocationProp(viewMode), {
          Some: () => (  // we have data for this viewMode/dataType combo
            <Link activeClassName="active" to={`/dash/${viewMode.toParam()}/${dataType.toParam()}/`}>
              <T k={k} />
            </Link>
          ),
          None: () => (  // if we do _not_ have data for this viewMode/dataType combo
            <TSetChildProps>
              <span className="disabled" title={{k: 'view-mode.disabled'}}>
                <T k={k} />
              </span>
            </TSetChildProps>
          ),
        })}
      </li>
    );
  },
  render() {
    return OpenClosed.match(this.props.openClosed, {
      Closed: () => (
        <div className="view-mode">
          <ul>
            {this.renderLink(ViewModes.Points(), `view-mode.points.${this.props.dataType.toParam()}`)}
            {this.renderLink(ViewModes.Regions(), `view-mode.region`)}
            {this.renderLink(ViewModes.Districts(), `view-mode.district`)}
            {this.renderLink(ViewModes.Wards(), `view-mode.ward`)}
          </ul>
        </div>
      ),
      Open: () => <div className="view-mode empty"></div>,
    });
  },
});

export default ViewMode;
