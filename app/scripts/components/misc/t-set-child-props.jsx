import React from 'react';
import warn from '../../utils/warn';
import { stringsEn } from './t';

const TSetChildProps = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    props: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {strings: stringsEn};
  },

  componentWillMount() {
    try {
      React.Children.only(this.props.children);
    } catch (err) {
      const childInv = 'Invariant Violation: onlyChild must be passed a children with exactly one child';
      if (String(err).indexOf(childInv) !== -1) {
        const num = React.Children.count(this.props.children);
        if (num === 1) {
          throw new Error('TSetChildProps must wrap exactly one component. There is ' +
            'one child, but maybe it is a string instead of a proper element?');
        } else {
          throw new Error('TSetChildProps must wrap exactly one child element. ' +
            `Got ${num} children.`);
        }
      } else {
        throw err;
      }
    }
  },

  render() {
    const translatedProps = {};
    Object.keys(this.props.props).forEach(prop => {
      const translated = this.state.strings[this.props.props[prop]];
      if (typeof translated !== 'undefined') {
        translatedProps[prop] = translated;
      } else {
        warn('missing translation for key', this.props.props[prop]);
        translatedProps[prop] = this.props.props[prop];
      }
    });
    const fixed = React.cloneElement(this.props.children, translatedProps);
    return <span>{fixed}</span>;
  },
});

export default TSetChildProps;
