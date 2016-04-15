import React, { Component } from 'react';

import ObjectDescription from './ObjectDescription';

// Styles
import objectStyles from './objectStyles';
const styles = {
  preview: {
    fontStyle: 'italic',
  },
  link: {
    color: '#0000ff'
  }
}

function intersperse(arr, sep, max){
  if (arr.length === 0) {
    return [];
  }
  let res = arr.slice(1, max).reduce(function(xs, x, i) {
      return xs.concat([sep, x]);
  }, [arr[0]]);
  if (arr.length > max) {
    let ellipsis = (<span key={'ellipsis'}>…</span>);
    res.push(sep, ellipsis);
  }
  return res;
}

/**
 * A preview of the object on root level node
 */
export default class ObjectPreview extends Component {
  propTypes: {
    maxProperties: PropTypes.number; // maximum properties displayed in preview
  }

  static defaultProps = {
    maxProperties: 5,
    maxArrayElements: 5
  }

  render() {
    const object = this.props.object;
    if (typeof object !== 'object' || object === null) {
      return (<ObjectDescription object={object} />);
    }

    if (Array.isArray(object)) {
      return (<span style={styles.preview}>
          <span style={styles.link}>{'Array(' + object.length + ')'}</span>
          {' '}
          [
          {intersperse(object.map(function(element, index){
            return (<ObjectDescription key={index} object={element} />)
          }), ", ", this.props.maxArrayElements)}
          ]
        </span>);
    }
    else if (object instanceof Date) {
      return <span>{object.toString()}</span>;
    }
    else {
      let propertyNodes = [];
      for(let propertyName in object){
        const propertyValue = object[propertyName];
        if(object.hasOwnProperty(propertyName)){
          let ellipsis;
          if (propertyNodes.length === (this.props.maxProperties - 1)
              && Object.keys(object).length > this.props.maxProperties) {
            ellipsis = (<span key={'ellipsis'}>…</span>);
          }
          propertyNodes.push(
            <span key={propertyName}>
              <span style={objectStyles.name}>{propertyName}</span>
              :&nbsp;
              <ObjectDescription object={propertyValue} />
              {ellipsis}
            </span>
          );
          if(ellipsis)
            break;
        }
      }

      return (<span style={styles.preview}>
                  <span style={styles.link}>{'Object(' + Object.keys(object).length + ')'}</span>
                  {' {'}
                  {intersperse(propertyNodes, ", ")}
                  {'}'}
              </span>);
    }
  }
}
