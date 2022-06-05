import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Form, Navbar, Container } from 'react-bootstrap';
import ReactGA from "react-ga4";

import './App.css';

ReactGA.initialize([
  {
    trackingId: "G-WHCWXF4MFZ",
  },
]);

const layers = require('./layers.json');

const regions = {
  'us-east-1': 'US East (N. Virginia)',
  'us-east-2': 'US East (Ohio)',
  'us-west-1': 'US West (N. California)',
  'us-west-2': 'US West (Oregon)',
  'eu-central-1': 'Europe (Frankfurt)',
  'eu-west-1': 'Europe (Ireland)',
  'eu-west-2': 'Europe (London)',
}

class NLNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onRegionChange(e.target.value);
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            NodeLayers
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Form.Select aria-label="AWS region" size="sm" value={this.props.region} onChange={this.handleChange}>
                {Object.keys(regions).map(region => {
                  return <option key={region} value={region}>{regions[region]} &middot; {region}</option>
                })}
              </Form.Select>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

function Layer(props) {
  const { name, description, version, keywords, region, regions } = props;
  return (
    <div class="pb-4 mb-4 border-bottom">
      <h5><a href={`https://npmjs.com/package/${name}`}>{name}</a> <span class="text-muted">@{version}</span></h5>
      <p>{description}</p>
      <div class="mb-3">
        {keywords && keywords.map(keyword =>
          <span class="badge text-bg-light">{keyword}</span>
        )}
      </div>
      <CopyToClipboard text={regions && regions[region]}>
        <span class="Copy form-control p-1 bg-dark text-light font-monospace">{regions && regions[region]}</span>
      </CopyToClipboard>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.state = { region: 'us-east-1' };
  }

  handleRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <div>
        <NLNavbar region={this.state.region} onRegionChange={this.handleRegionChange} />

        <main class="container mt-5">
          <div class="py-5 mb-4 border-bottom text-center ">
            <h4 class="fw-light">Easily <span class="badge text-bg-light font-monospace">import</span> NodeJS modules in AWS
              Lambda functions</h4>
            <h5 class="fw-light">Just copy the layer ARN and add to your function</h5>
          </div>
          {Object.keys(layers).sort().map(name => {
            const layer = layers[name]
            return (
              <Layer key={name} name={name} version={layer.version} description={layer.description} keywords={layer.keywords} region={this.state.region} regions={layer._regions} />
            )
          })}
        </main>

        <div class="container">
          <footer class="pt-5 my-5 text-muted">
            Made by <a class="text-decoration-none" href="https://www.twitter.com/gazoakley">@gazoakley</a>. Inspired by <a class="text-decoration-none" href="https://github.com/keithrozario/Klayers">Klayers</a>.
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
