import React, {Component} from 'react';
import {render} from 'react-dom';
import {Alert, Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import Preloader from './Components/Preloader/Preloader.jsx';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      isUrlValid: true,
      url: '',
      preloading: false,
      responses: []
    }
  }

  componentWillMount() {
    this.setState({
      responses: localStorage.getItem('urls') ? JSON.parse(localStorage.getItem('urls')) : []
    })
  }

  mappingUlrs() {
    return this.state.responses.map((item, i) =>
      (
        <div key={i}>
          <p>
            {item.url} - shortened to <b>{window.location.origin + '/' + item.url_shorted}</b>
          </p>
          {i === this.state.responses.length - 1 ? '' : <hr/>}
        </div>
      )
    )
  }

  render() {
    return (<Container style={{paddingTop: 40}}>
      <Row>
        <Col xs="12" sm="12" md="3"/>
        <Col xs="12" sm="12" md="6">
          <Form onSubmit={this.onSubmitHandler.bind(this)}>
            <FormGroup>
              <h1>Url Shortener</h1>
              <Label>Insert your url</Label>
              <Input ref="urlInput" valid={this.state.isUrlValid} onInput={this.onChangeHandler.bind(this)}/>
              <FormFeedback style={{display: !this.state.isUrlValid ? 'block' : 'none'}}>Url uncorrected</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Button color="primary">Shortening</Button>
            </FormGroup>
            <Preloader style={{display: this.state.preloading ? 'block' : 'none'}}/>
          </Form>
        </Col>
        <Col xs="12" sm="12" md="3"/>
      </Row>
      <Row>
        <Col>
          <Alert color="danger" style={{display: this.state.error ? 'block' : 'none'}}>
            <h4 className="alert-heading">Oops, Error</h4>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert color="success" style={{display: this.state.responses.length ? 'block' : 'none'}}>
            <h4 className="alert-heading">Shortened urls</h4>
            {this.mappingUlrs()}
          </Alert>
        </Col>
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
    if (this.state.url && this.state.isUrlValid && !this.state.preloading) {
      this.setState({
        preloading: true
      });
      axios.post(window.location.origin + '/shortener', {
        url: this.state.url
      }).then((response) => {
        this.setState({
          preloading: false,
          error: false
        });
        this.addUrl(response.data.url);
      }).catch((err) => {
        this.setState({
          error: true,
          preloading: false
        });
      });
    }
  }

  addUrl(url) {
    let founded = this.state.responses.find(item => url.url == item.url);
    if (!founded) {
      let responses = this.state.responses;
      responses.push(url);
      this.setState({
        responses
      });
      localStorage.setItem('urls', JSON.stringify(this.state.responses));
    }
  }
}

render(<Home/>, document.getElementById('app'));