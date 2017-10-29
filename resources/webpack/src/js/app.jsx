import React, {Component} from 'react';
import {render} from 'react-dom';
import {Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      isUrlValid: true,
      url: ''
    }
  }

  render() {
    return (<Container>
      <Row>
        <Col/>
        <Col>
          <Form onSubmit={this.onSubmitHandler.bind(this)}>
            <h1>Url Shortener</h1>
            <FormGroup>
              <Label>Insert your url</Label>
              <Input ref="urlInput" valid={this.state.isUrlValid} onInput={this.onChangeHandler.bind(this)}/>
              <FormFeedback style={{display: !this.state.isUrlValid ? 'block' : 'none'}}>Url uncorrected</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Button color="primary">Get short url</Button>
            </FormGroup>
          </Form>
        </Col>
        <Col/>
      </Row>
    </Container>);
  }

  checkUrl(url) {
    return !!url.match(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i);
  }

  onChangeHandler(event) {

    this.setState({url: event.target.value, isUrlValid: this.checkUrl(event.target.value)});
  }

  onSubmitHandler(event) {
    event.preventDefault();

    if(this.state.url && this.state.isUrlValid) {
      axios.post(window.location.origin + '/shortener', {
        url: this.state.url
      }).then((response) => {
        console.log(this);
        debugger;
      })
    }
  }
}

render(
  <Home/>,
  document
    .getElementById(
      'app'
    ))
;