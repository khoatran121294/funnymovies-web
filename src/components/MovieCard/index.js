import React from "react";
// import PropTypes from "prop-types";
import { Row, Col, Label, Card, CardBody } from "reactstrap";

const MovieCard = props => {
  return (
    <Card className="mb-3">
      <CardBody>
        <Row>
          <Col md="5">
          <div class="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
              title="youtube_link"
              allowfullscreen
            />
          </div>
          </Col>
          <Col md="7">
            <Row>
              <Col md="12">
                <h4>Movie Title</h4>
              </Col>
              <Col md="12" className="d-flex flex-column">
                <Label className="font-weight-bold mb-0">Created By</Label>
                <Label className="text-justify">username@gmail.com</Label>
              </Col>
              <Col md="12" className="d-flex flex-column">
                <Label className="font-weight-bold mb-0">Description</Label>
                <Label className="text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </Label>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

// MovieCard.propTypes = {};

export default MovieCard;
