import React from 'react';

export default class Response extends React.Component {
  constructor() {
    super();

  }

  componentWillMount() {

  }

  render() {
    return <div>
      {this.props.text}
    </div>;
  }

}