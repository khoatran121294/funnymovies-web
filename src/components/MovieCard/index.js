import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Label, Card, CardBody } from "reactstrap";

const MovieCard = ({ movie }) => {
  return (
    <Card className="mb-3">
      <CardBody>
        <Row>
          <Col md="5">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src={movie.linkUrl}
              title="youtube_link"
            />
          </div>
          </Col>
          <Col md="7">
            <Row>
              <Col md="12">
                <h4>{movie.title}</h4>
              </Col>
              <Col md="12" className="d-flex flex-column">
                <Label className="font-weight-bold mb-0">Created By</Label>
                <Label className="text-justify">{movie.createdBy}</Label>
              </Col>
              <Col md="12" className="d-flex flex-column">
                <Label className="font-weight-bold mb-0">Description</Label>
                <Label className="text-justify">
                  {movie.description}
                </Label>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
