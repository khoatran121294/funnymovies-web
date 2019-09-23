import React, { Fragment } from "react";
import { Input, Button, Label } from "reactstrap";
import { toastr } from "react-redux-toastr";
import { connect } from 'react-redux';
import _ from "lodash";
import "./style.scss";
import appConfig from "../../app-config";
import RegisterModal from "../Modal/Register";
import ConfirmModal from "../Modal/Confirm";
import http from "../../helpers/http";
import { HTTP_STATUS_CODE } from "../../app-constants";
import { updateLoggedInUser } from "../../redux/account/actions";


class AppHeader extends React.Component {
  state = {
    email: "",
    password: "",
    isShowRegisterModal: false,
    isShowLogoutModal: false
  };
  render() {
    const { account } = this.props;
    const isLoggedIn = !_.isEmpty(account.token);
    return (
      <div className="app-header">
        <span className="header-title">{appConfig.appName}</span>
        {isLoggedIn
          ? this._renderAuthorizedHeaderSide()
          : this._renderUnauthorizedHeaderSide()}
      </div>
    );
  }
  _renderUnauthorizedHeaderSide = () => {
    const { email, password, isShowRegisterModal } = this.state;
    return (
      <Fragment>
        <div className="header-right">
          <Input
            type="text"
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            id="email"
            name="email"
            placeholder="Enter email"
            className="mr-2"
          />
          <Input
            type="password"
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            id="password"
            name="password"
            placeholder="Enter password"
            className="mr-2"
          />
          <Button color="danger" className="mr-2" onClick={this.onLogin}>
            Login
          </Button>
          <Button color="secondary" onClick={this.onToggleRegisterModal}>
            Register
          </Button>
        </div>
        <RegisterModal
          modal={isShowRegisterModal}
          toggle={this.onToggleRegisterModal}
          onSubmit={this.onRegister}
        />
      </Fragment>
    );
  };
  _renderAuthorizedHeaderSide = () => {
    const { isShowLogoutModal } = this.state;
    const email = _.get(this.props, "account.userInfo.email");
    return (
      <div className="header-right">
        <Label className="mr-2 mb-0">Welcome {email}</Label>
        <Button
          color="primary"
          className="mr-2"
          onClick={() => {
            this.props.history.push(`/share-movie`);
          }}
        >
          Share a movie
        </Button>
        <Button color="danger" onClick={this.onToggleLogoutModal}>
          Logout
        </Button>
        <ConfirmModal
          modal={isShowLogoutModal}
          toggle={this.onToggleLogoutModal}
          message={"Are you sure want to logout?"}
          onConfirmPress={this.onLogout}
        />
      </div>
    );
  };
  onToggleRegisterModal = () => {
    this.setState({
      isShowRegisterModal: !this.state.isShowRegisterModal
    });
  };
  onToggleLogoutModal = () => {
    this.setState({
      isShowLogoutModal: !this.state.isShowLogoutModal
    });
  };
  onLogout = async () => {
    this.props.updateLoggedInUser(null, {});
    http.setAuthorizationHeader(null);
  };
  onLogin = async () => {
    const { email, password } = this.state;
    if ("" === email.trim() || "" === password.trim()) {
      toastr.error("Alert", "Email or password is empty");
      return;
    }
    try {
      const res = await http.post("login", {
        email,
        password
      });
      const token = _.get(res, "data.token");
      const userInfo = _.get(res, "data.userInfo");
      this.props.updateLoggedInUser(token, userInfo);
      http.setAuthorizationHeader(token);
      this.setState({
        email: "",
        password: ""
      });
    } catch (err) {
      const statusCode = _.get(err, "response.status");
      const errorMessage  = _.get(err, "response.data.error");
      if (statusCode === HTTP_STATUS_CODE.BAD_REQUEST) {
        toastr.error("Error", errorMessage);
      }
    }
  };
  onRegister = async newAccount => {
    try {
      const res = await http.post("register", newAccount);
      if (res.data) {
        toastr.success("Success", "You registered account successfully. Please login with email & password created.");
        this.setState({
          email: newAccount.email,
          password: ""
        });
        this.onToggleRegisterModal();
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

const mapStateToProps = state => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  { updateLoggedInUser }
)(AppHeader);
