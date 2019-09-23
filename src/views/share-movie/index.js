import React from "react";
import { Row, Col, Container, FormGroup, Label, Button } from "reactstrap";
import "./style.scss";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toastr } from "react-redux-toastr";
import _ from "lodash";
import http from "../../helpers/http";
import { HTTP_STATUS_CODE } from "../../app-constants";

const formSchema = Yup.object().shape({
  linkUrl: Yup.string().required("Required"),
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required")
});

class ShareMovie extends React.Component {
  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col md="12">
            <h3>Share a movie</h3>
          </Col>
        </Row>

        <Formik
          initialValues={{
            linkUrl: "",
            title: "",
            description: ""
          }}
          validationSchema={formSchema}
          onSubmit={this.onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label for="linkUrl">Youtube Url</Label>
                    <Field
                      name="linkUrl"
                      id="linkUrl"
                      className={`form-control ${errors.linkUrl &&
                        touched.linkUrl &&
                        "is-invalid"}`}
                    />
                    {errors.linkUrl && touched.linkUrl && (
                      <div className="invalid-feedback">{errors.linkUrl}</div>
                    )}
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label for="title">Movie Title</Label>
                    <Field
                      name="title"
                      id="title"
                      className={`form-control ${errors.title &&
                        touched.title &&
                        "is-invalid"}`}
                    />
                    {errors.title && touched.title && (
                      <div className="invalid-feedback">{errors.title}</div>
                    )}
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Field
                      component="textarea"
                      name="description"
                      id="description"
                      rows="8"
                      className={`form-control ${errors.description &&
                        touched.description &&
                        "is-invalid"}`}
                    />
                    {errors.description && touched.description && (
                      <div className="invalid-feedback">{errors.description}</div>
                    )}
                  </FormGroup>
                </Col>
                <Col md="12">
                  <FormGroup>
                    <Button
                      type="button"
                      color="secondary"
                      className="mr-2"
                      onClick={() => {
                        this.props.history.push("/");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" color="danger">
                      Share
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    );
  }
  onSubmit = async newMovie => {
    try {
      const res = await http.post("movies", newMovie);
      if (res.data) {
        toastr.success("Success", "Share a movie successfully.");
        this.props.history.push("/home");
      }
    } catch (err) {
      const statusCode = _.get(err, "response.status");
      const errorMessage  = _.get(err, "response.data.error");
      if (statusCode === HTTP_STATUS_CODE.BAD_REQUEST) {
        toastr.error("Error", errorMessage);
      }
    }
  };
}

export default ShareMovie;
