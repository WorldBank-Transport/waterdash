import React from 'react';
import isObject from 'lodash/lang/isObject';
import isString from 'lodash/lang/isString';
import isUndefined from 'lodash/lang/isUndefined';
import warn from '../../utils/warn';
import { connect } from 'reflux';
import langStore from '../../stores/lang';
import { translate } from './t';


/**
 * This component can be used inject translations into the props of its children
 *
 * Use it to wrap a single component which has props that you want to translate,
 * setting those props to a `{k: 'translation.k', i: ['interpolations']}`
 * object (the `i` key is optional).
 *
 * It will also check one-level deep for a single nested tranlation object, and
 * throw if there is more than one.
 *
 * Examples:
 *
 *     <TSetChildProps><img alt={k: 'site-name'} /></TSetChildProps>
 *
 *     <TSetChildProps>
 *       <Chart xAxis={label: {k: 'chart.x-axis-label'}} />
 *     </TSetChildProps>
 */
const TSetChildProps = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
  },

  mixins: [
    connect(langStore, 'lang'),
  ],

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

  getKObject(obj) {
    return Object.keys(obj).reduce((ret, propName) => {
      if (isObject(obj[propName]) && !isUndefined(obj[propName].k) && isString(obj[propName].k)) {
        if (ret.found) {
          throw new Error('TSetChildProps on object props should one k element.');
        }
        ret.found = true;
        ret.kOjb = obj[propName];
        ret.propName = propName;
      }
      return ret;
    }, {found: false});
  },

  isTranslateObj(obj) {
    if (!isObject(obj)) {
      return false;
    } else if (this.getKObject(obj).found) {
      return true;
    } else if (isUndefined(obj.k)) {
      return false;
    } else if (!isString(obj.k)) { // k but wrong type -- probably a mistake
      warn('Tried to translate obj', obj, 'but `k` was not a string.');
      return false;
    } else {
      return true;
    }
  },

  translateObj(obj) {
    const nestedKOjject = this.getKObject(obj);
    if (nestedKOjject.found) {
      return {
        ...obj,
        [nestedKOjject.propName]: translate(this.state.lang, nestedKOjject.kOjb.k, nestedKOjject.kOjb.i),
      };
    } else {
      return translate(this.state.lang, obj.k, obj.i);
    }
  },

  getTranslatedProps(child) {
    return Object.keys(child.props)
     .filter(propName => this.isTranslateObj(child.props[propName]))
     .reduce((aggProps, propName) => {
       return {
         ...aggProps,
         [propName]: this.translateObj(child.props[propName]),
       };
     }, {});
  },

  render() {
    const fixed = React.Children.map(this.props.children, child => {
      const translatedProps = this.getTranslatedProps(child);
      return React.cloneElement(child, translatedProps);
    });
    return <span>{fixed}</span>;
  },
});

export default TSetChildProps;
