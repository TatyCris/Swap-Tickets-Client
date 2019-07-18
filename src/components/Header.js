import React, { Component } from 'react'
import Modal from './Modal'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login, signin, logout } from '../actions/users'
import './Header.css'

class Header extends Component {
    state = {
        username: '',
        password: '',
        passwordConfirmation: '',
        option: 'LOG_IN',
        openModal: false
    }

    onClick = (event) => {
        event.preventDefault()
        this.showModal()
    }

    onChange = (event) => {
        const { value } = event.target
        const key = event.target.name

        this.setState({ [key]: value })
    }

    onSubmit = (event) => {
        event.preventDefault()
        const { username } = this.state
        const { password } = this.state
        const { passwordConfirmation } = this.state

        this.setState({ username: '', password: '', passwordConfirmation: '' })

        if (this.state.option === 'SIGN_UP') {
            if (password !== passwordConfirmation) {
                alert("Password confirmation must match Password")
            } else {
                this.props.signin(username, password)
                this.hideModal()
            }
        } else {
            this.props.login(username, password)
            this.hideModal()

        }
    }

    showModal = () => {
        this.setState({ openModal: true })
    }

    hideModal = () => {
        this.setState({ openModal: false })
    }

    renderForm = () => {
        return (
            <div>
                {this.state.option === 'LOG_IN' ?
                    <button onClick={this.signUp}>Create an account</button> :
                    <button onClick={this.logIn}>I have an account</button>
                }
                <form onSubmit={this.onSubmit}>
                    <label>Username</label>
                    <input onChange={this.onChange} value={this.state.username} name="username" autoFocus></input>
                    <label>Password</label>
                    <input
                        onChange={this.onChange}
                        value={this.state.password}
                        name="password"
                        type="password">
                    </input>
                    {this.state.option === 'SIGN_UP' &&
                        <React.Fragment>
                            <label>Password confirmation</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.passwordConfirmation}
                                name="passwordConfirmation"
                                type="password">
                            </input>
                        </React.Fragment>
                    }
                    <button>Get in</button>
                </form>
            </div>
        )
    }

    signUp = () => {
        this.setState({
            option: 'SIGN_UP'
        })
    }

    logIn = () => {
        this.setState({
            option: 'LOG_IN'
        })
    }

    signIn = () => {
        if (this.props.user) {
            return this.props.user.username
        } else {
            return 'Sign in'
        }
    }

    logOut = () => {
        localStorage.token = ''
        this.props.logout()
    }

    render() {
        return (
            <div className="header">
                <div>
                    <Link to='/'><h3>Tickets NOW!</h3></Link>
                </div>
                <div className="login-container">
                    <h4 onClick={this.onClick}>{this.props.user.username || 'Sign in'}</h4>
                    <h4 className="logout" onClick={this.logOut} >{this.props.user.username ? 'Log out' : null}</h4>
                </div>
                <Modal
                    openModal={this.state.openModal}
                    hideModal={this.hideModal}
                    form={this.renderForm}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser
    }
}

export default connect(mapStateToProps, { login, signin, logout })(Header)
