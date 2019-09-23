import React from "react";
import { Row, Col, Container, Label } from "reactstrap";
import MovieCard from "../../components/MovieCard";
import "./style.scss";
import _ from "lodash";
import http from "../../helpers/http";

class Home extends React.Component {
  state = {
    movies: [],
    loading: false,
    loaded: false,
  };
  render() {
    const { movies, loading } = this.state;
    return (
      <Container className="mt-5">
        <Row>
          <Col md="12">
            <h3>Shared Movies</h3>
          </Col>
          <Col md="12">
            {
              loading
              ? <Label>Loading ...</Label>
              : _.isEmpty(movies)
                ? <Label>Shared List is empty.</Label>
                : (
                  movies.map((item, index) => <MovieCard key={index} movie={item} />)
                )
            }
          </Col>
        </Row>
      </Container>
    );
  }
  componentDidMount = async () => {
    this.loadMovies();
  };

  loadMovies = async () => {
    this.setState({ loading: true, loaded: false });
    const res = await http.get("movies");
    this.setState({
      movies: res.data,
      loading: false,
      loaded: true,
    });
  };
}

export default Home;
