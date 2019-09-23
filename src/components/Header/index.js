import React, { Fragment } from "react";
import { Input, Button, Label } from "reactstrap";
import "./style.scss";
import appConfig from "../../app-config";
import RegisterModal from "../Modal/Register";
import ConfirmModal from "../Modal/Confirm";

class AppHeader extends React.Component {
  state = {
    email: "",
    password: "",
    isShowRegisterModal: false,
    isLoggedIn: true,
    isShowLogoutModal: false
  };
  render() {
    const { isLoggedIn } = this.state;
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
          <Button color="danger" className="mr-2">
            Login
          </Button>
          <Button color="secondary" onClick={this.onToggleRegisterModal}>
            Register
          </Button>
        </div>
        <RegisterModal
          modal={isShowRegisterModal}
          toggle={this.onToggleRegisterModal}
        />
      </Fragment>
    );
  };
  _renderAuthorizedHeaderSide = () => {
    const { isShowLogoutModal } = this.state;
    return (
      <div className="header-right">
        <Label className="mr-2 mb-0">Welcome username@gmail.com</Label>
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
}

export default AppHeader;
