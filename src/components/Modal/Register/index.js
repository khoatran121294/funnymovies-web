import React from "react";
import {
  Button,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  FormGroup,
  Label,
  Modal,
  ModalFooter,
} from "reactstrap";
import PropTypes from 'prop-types';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

class RegisterModal extends React.Component {
  static propTypes = {
    modal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };
  render () {
    const { modal, toggle, onSubmit } = this.props;
    return (
      <Modal
          isOpen={modal}
          toggle={toggle}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={formSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <ModalHeader toggle={toggle}>
                  Register Account
                </ModalHeader>
                <ModalBody>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="email">
                          Email
                        </Label>
                        <Field
                          name="email"
                          id="email"
                          className={`form-control ${errors.email &&
                            touched.email &&
                            "is-invalid"}`}
                        />
                        {errors.email && touched.email && (
                          <div className="invalid-feedback">
                            {errors.email}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label for="password">
                          Password
                        </Label>
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          className={`form-control ${errors.password &&
                            touched.password &&
                            "is-invalid"}`}
                        />
                        {errors.password && touched.password && (
                          <div className="invalid-feedback">
                            {errors.password}
                          </div>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                </ModalBody>
                <ModalFooter>
                  <Button size="sm" onClick={toggle}>
                    Cancel
                  </Button>{" "}
                  <Button size="sm" color="danger" type="submit">
                    Submit
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </Modal>
    );
  }
}

export default RegisterModal;
