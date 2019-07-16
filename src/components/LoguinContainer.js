import React, { Component } from 'react'
import * as request from 'superagent'
import { connect } from 'react-redux'
import { getUser, getToken } from '../actions/users'


class LoginContainer extends Component {
    state = {
        username: '',
        password: '',
        passwordConfirmation: '',
        option: 'LOG_IN'
    }

    url = 'http://localhost:4000'

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
                request
                    .post(`${this.url}/users`)
                    .send({ username, password })
                    .then(res => {
                        console.log('signup res', res)
                        this.props.getUser(username)
                        alert("User created successfully!")

                        request
                            .post(`${this.url}/login`)
                            .send({ username, password })
                            .then(res => {
                                this.props.getUser(username)
                                this.props.history.push(`/events`)
                                this.props.getToken(res.body.jwt)
                                localStorage.setItem ('token', res.body.jwt)
                            })
                            .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
            }
        } else {
            request
                .post(`${this.url}/login`)
                .send({ username, password })
                .then(res => {
                    this.props.getUser(username)
                    this.props.history.push(`/events`)
                    this.props.getToken(res.body.jwt)
                    localStorage.setItem ('token', res.body.jwt)
                })
                .catch(error => console.log(error))
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

export default connect(mapStateToProps, { getUser, getToken })(LoginContainer)