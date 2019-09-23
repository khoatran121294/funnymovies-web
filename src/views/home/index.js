import React from "react";
import { Row, Col, Container } from "reactstrap";
import "./style.scss";

class Home extends React.Component {
  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col md="12">Home</Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
