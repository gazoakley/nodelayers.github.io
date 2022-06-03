import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Form, Navbar, Nav, Container } from 'react-bootstrap';

import './App.css';
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

function NLNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
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
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {/* value={this.state.region}> */}
            <Form.Select aria-label="AWS region" size="sm"> 
              {Object.keys(regions).map(region => {
                return <option key={region} value={region}>{regions[region]}</option>
              })}
            </Form.Select>
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>



    // <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    //   <div class="container">
    //     <a class="navbar-brand" href="/">NodeLayers</a>
    //     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
    //       aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
    //       <span class="navbar-toggler-icon"></span>
    //     </button>
    //     <div class="collapse navbar-collapse" id="navbarCollapse">
    //       <ul class="navbar-nav me-auto mb-2 mb-md-0">
    //         {/* <li class="nav-item">
    //         <a class="nav-link active" aria-current="page" href="#">Home</a>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link" href="#">Link</a>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link disabled">Disabled</a>
    //       </li> */}
    //       </ul>
    //       <form class="d-flex" role="search">
    //         <select class="form-select form-select-sm">
    //           <option selected>US East (N. Virginia) &middot; us-east-1</option>
    //           <option>US East (Ohio) &middot; us-east-2</option>
    //           <option>US West (N. California) &middot; us-west-1</option>
    //           <option>US West (Oregon) &middot; us-west-2</option>
    //           <option>Europe (Frankfurt) &middot; eu-central-1</option>
    //           <option>Europe (Ireland) &middot; eu-west-1</option>
    //           <option>Europe (London) &middot; eu-west-2</option>
    //         </select>
    //       </form>
    //     </div>
    //   </div>
    // </nav>
  )
}

function Layer(props) {
  const { name, description, version, keywords, region, regions } = props;
  return (
    <div class="pb-4 mb-4 border-bottom">
      <h5>{name} <span class="text-muted">@{version}</span></h5>
      <p>{description}</p>
      <div class="mb-3">
        {keywords && keywords.map(keyword =>
          <span class="badge text-bg-light">{keyword}</span>
        )}
      </div>
      {/* <div class="input-group mb-3">
        <input type="text" class="form-control" value={regions && regions["us-east-1"]} />
        <div class="input-group-append">
          <CopyToClipboard text={regions && regions["us-east-1"]}>
            <button type="button" class="btn btn-outline-secondary">Copy</button>
          </CopyToClipboard>
        </div>
      </div> */}
      <CopyToClipboard text={regions && regions[region]}>
        {/* <input class="form-control bg-dark text-light font-monospace" id="disabledInput" type="text" value={regions && regions[region]} /> */}
        <span class="Copy form-control p-1 bg-dark text-light font-monospace">{regions && regions[region]}</span>
      </CopyToClipboard>
      {/* <span class="p-1 bg-primary text-light font-monospace">{regions && regions["us-east-1"]}</span>
      <CopyToClipboard text={regions && regions["us-east-1"]}>
        <button type="button" class="btn btn-light btn-sm">Copy</button>
      </CopyToClipboard> */}
    </div>
  )
}

function App() {
  return (
    <div>
      <NLNavbar />

      <main class="container mt-5">
        <div class="py-5 mb-4 border-bottom text-center ">
          <h4 class="fw-light">Easily <span class="badge text-bg-light font-monospace">require()</span> NodeJS modules in AWS
            Lambda functions</h4>
          <h5 class="fw-light">Just copy the layer ARN and add to your function</h5>
        </div>
        {Object.keys(layers).sort().map(name => {
          const layer = layers[name]
          return (
            <Layer key={name} name={name} version={layer.version} description={layer.description} keywords={layer.keywords} region="eu-west-1" regions={layer._regions} />
          )
        })}
      </main>

      <div class="container">
        <footer class="pt-5 my-5 text-muted">
          Made by <a class="text-decoration-none" href="https://www.twitter.com/gazoakley">@gazoakley</a>
        </footer>
      </div>
    </div>
  );
}

export default App;
