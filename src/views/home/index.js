import React from "react";
import { Row, Col, Container } from "reactstrap";
import MovieCard from "../../components/MovieCard";
import "./style.scss";

class Home extends React.Component {
  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col md="12">
            <h3>Shared Movies</h3>
          </Col>
          <Col md="12">
            {
              [1, 2, 3, 4, 5].map((item, index) => <MovieCard key={index} />)
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
