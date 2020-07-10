import { Form, Input, Button, Checkbox,message} from 'antd';
import React from 'react';
import {login} from "../services/userService";
// import { browserHistory } from "react-router-dom";
import {history} from '../utils/history';
import '../css/LoginView.css'
import object from "../utils/constant";

export class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            myState: "",
        }
    }
        onFinish = values => {
            console.log(values);
            const callback = (data) => {
                console.log(data);
                if(data.myState === 0)
                    message.error('username or password is incorrect !');
                else if(data.myState === 1)
                    message.error("the account has been blocked !");
                else{
                    object.userID = data.userID;
                    object.userType = data.myState - 2;
                    if(object.userType === 0)
                        history.push("/user");
                    else if(object.userType === 1)
                        history.push("/admin");
                }
            };

            login({"username":values.username, "password":values.password}/*values*/,callback);
        };

        onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        handleRegister = () => {
            history.push("/register");
        };
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        return (
            <div>
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
                <Button
                    onClick = {this.handleRegister}
                    type = "primary"
                    style ={{marginBottom: 16,}}
                >
                    Register
                </Button>
            </div>
        );
    }
}
