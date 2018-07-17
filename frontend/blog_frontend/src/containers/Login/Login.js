import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";
import cssClass from "./Login.css";
import AxionsInstance from "../../AxiosInstance";

class Login extends Component {
    state = {
        loginForm: {
            username: {
                elementType: "input",
                elementConfig: {
                    type: "input",
                    placeholder: "Username"
                },
                value: ""
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "password"
                },
                value: ""
            }
        }
    };

    loginHandler = event => {
        event.preventDefault();
        const loginCredentials = {
            username: this.state.loginForm.username.value,
            password: this.state.loginForm.password.value
        };
        AxionsInstance.post("/auth/login/", loginCredentials)
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    };

    inputChangedHandler(event, inputIdentifier) {
        const updatedLoginForm = {
            ...this.state.loginForm,
            [inputIdentifier]: {
                ...this.state.loginForm[inputIdentifier],
                value: event.target.value
            }
        };
        this.setState({ loginForm: updatedLoginForm });
    }

    render() {
        let formElements = [];
        for (let key in this.state.loginForm) {
            formElements.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        let form = (
            <form onSubmit={this.loginHandler}>
                {formElements.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={event =>
                            this.inputChangedHandler(event, formElement.id)
                        }
                    />
                ))}
                <button>Login</button>
            </form>
        );

        return <div className={cssClass.Container}>{form}</div>;
    }
}

export default Login;