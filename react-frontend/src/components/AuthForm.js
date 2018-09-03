import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

// additionally created imports
import { connect } from 'react-redux';
import { userActions } from '../authentication/_actions'

class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '' ,
        lastName: '',
        username: '',
        password: ''
      },
      confirmPassword: '',
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleChange = event => {
    const { name, value } = event.target;
    const { user } = this.state;

    if (this.isLogin) {
      this.setState({ [name]: value });
    }

    if (this.isSignup) {
      this.setState({
        user: {
          ...user,
          [name]: value
        }
      });      
    }

  }

  handleCPChange = event => {
    this.setState({confirmPassword: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    
    if (this.isSignup) {
     
      if (this.state.confirmPassword === this.state.user.password) {
        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
          dispatch(userActions.register(user));
        }
      } else {
        alert("password is not coincident");
      }
    }

    if (this.isLogin) {
      this.setState({ submitted: true });
      const { username, password } = this.state;
      const { dispatch } = this.props;
      if (username && password) {
          dispatch(userActions.login(username, password));
      }
    }
    
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      firstNameLabel,
      firstNameInputProps,
      lastNameLabel,
      lastNameInputProps,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        {this.isSignup && (
          <FormGroup>
            <Label for={firstNameLabel}>{firstNameLabel}</Label>
            <Input {...firstNameInputProps} onChange={this.handleChange} />
          </FormGroup>
        )}
        {this.isSignup && (
          <FormGroup>
            <Label for={lastNameLabel}>{lastNameLabel}</Label>
            <Input {...lastNameInputProps} onChange={this.handleChange} />
          </FormGroup>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input {...usernameInputProps} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input {...passwordInputProps} onChange={this.handleChange} />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} onChange={this.handleCPChange} />
          </FormGroup>
        )}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  firstNameLabel: PropTypes.string,
  firstNameInputProps: PropTypes.object,
  lastNameLabel: PropTypes.string,
  lastNameInputProps: PropTypes.string,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  firstNameLabel: 'Fistname',
  firstNameInputProps: {
    type: 'text',
    placeholder: 'John',
    name: 'firstName'
  },
  lastNameLabel: 'lastName',
  lastNameInputProps: {
    type: 'text',
    placeholder: 'Doe',
    name: 'lastName'
  },
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
    name: 'username',
    required: 'required'
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
    name: 'password',
    required: 'required'
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
    name: 'confirmPassword',
    required: 'required'
  },
  onLogoClick: () => {},
};

export default AuthForm;
