import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, signin } from '../actions/users'


class LoginContainer extends Component {
    state = {
        username: '',
        password: '',
        passwordConfirmation: '',
        option: 'LOG_IN'
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
                this.props.history.push(`/events`)
            }
        } else {
            this.props.login(username, password)
            this.props.history.push(`/events`)
        }
    }

    renderForm = () => {
        return (
            <form onSubmit={this.onSubmit}>
                <label>Username</label>
                <br />
                <input onChange={this.onChange} value={this.state.username} name="username"></input>
                <br />
                <br />
                <label>Password</label>
                <br />
                <input
                    onChange={this.onChange}
                    value={this.state.password}
                    name="password"
                    type="password">
                </input>
                <br />
                <br />
                {this.state.option === 'SIGN_UP' &&
                    <React.Fragment>
                        <label>Password confirmation</label>
                        <br />
                        <input
                            onChange={this.onChange}
                            value={this.state.passwordConfirmation}
                            name="passwordConfirmation"
                            type="password">
                        </input>
                        <br />
                        <br />
                    </React.Fragment>
                }
                <button>Get in</button>
            </form>
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

    render() {
        return (
            <div className="Login">
                {this.renderForm()}
                <button onClick={this.logIn}>Log in</button>
                <button onClick={this.signUp}>Sign up</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.currentUser
    }
}

export default connect(mapStateToProps, { login, signin })(LoginContainer)