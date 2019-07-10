import React, { Component } from "react";
import { connect } from "react-redux";
import { socket } from "../socket/api";
import { chatMessage, createUserIO } from "../socket/api";
import { currentUserWrapper } from "../actions/actions";
import { store } from '../store/store';

import '../styles/UserIn.scss';

class UserIn extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			password: '',
			login: false,
			validation: false
		}
		socket.emit('userUpdate'); 

		this.handleChange = this.handleChange.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSignin = this.handleSignin.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleChange(event) {
		event.preventDefault();

  	this.setState({value: event.target.value});
	}

	handleChangePassword(event) {
		event.preventDefault();
	}

	handleSubmit(event) {
		let user = this.state.value;
		let { userLogin } = this.props;

    event.preventDefault();
    socket.emit('userValidation', user);
    socket.emit('userIn', user);
    socket.emit('userUpdate');
   	store.dispatch(currentUserWrapper(user));

    this.setState({ value: '' });
  }

  handleSignin() {
  	this.setState({ login: false });
  }

  handleLogin() {
  	this.setState({ login: true });
  }

	render() {
		if (this.state.login !== false) {
			return(
				<div className="userIn-wrapp">
					<div className="crAccWarp">
						<button onClick={this.handleSignin}>Sign up</button>
						<button onClick={this.handleLogin}>Log In</button>
					</div>
					<form className="userLogin" onSubmit={this.handleSubmit}>
						<div className="login-wrapp">
							<div className="login">
								<label className="spanInput">Login</label>
								<input 
									id="loginInput" 
									className="loginInput" 
									value={this.state.value} 
									onChange={this.handleChange} />
							</div>
						</div>
						<div className="login-wrapp">
							<div className="password">
								<label className="spanInput">Password</label>
								<input 
									className="passwordInput"
									value={this.state.password}
									onChange={this.handleChangePassword}
									disabled
								/>
							</div>
						</div>
						<div className="button-wrap">
							<button className="button-login">Login</button>
						</div>					
					</form>
				</div>
			)
		}	else {
			return(
				<div className="userIn-wrapp">
					<div className="crAccWarp">
						<button onClick={this.handleSignin}>Sign up</button>
						<button onClick={this.handleLogin}>Log In</button>
					</div>
					<form className="userSignIn" onSubmit={this.handleSubmit}>
						<div className="signIn-wrapp">
							<div className="signIn">
								<label className="spanInput">Sign in</label>
								<input 
									id="signInInput" 
									className="signInInput" 
									value={this.state.value} 
									onChange={this.handleChange} />
							</div>
						</div>
						<div className="signIn-wrapp">
							<div className="password">
								<label className="spanInput">Password</label>
								<input className="passwordInput" disabled />
							</div>
						</div>
						<div className="button-wrap">
							<button className="button-signIn">Sign In</button>
						</div>	
					</form>
				</div>
			)
		}
	}
}

const mapStateToProps = store => {
  return {
    userLogin: store.userLogin
  }
};

export default connect(
	mapStateToProps
)(UserIn);