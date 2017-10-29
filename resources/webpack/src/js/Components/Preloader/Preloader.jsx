import React from 'react';
import './preloader.scss';

export default class Preloader extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {

  }

  render() {
    return <div style={this.props.style} className="preload-container">
      <div className="cssload-container">
        <div className="cssload-double-torus" />
      </div>
    </div>;
  }
}