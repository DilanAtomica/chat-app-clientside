import Button from "./index";
import {MouseEventHandler, ReactNode} from "react";

export default {
    title: "Button",
    component: Button,
}

type buttonProps =  | ({
    buttonType: "submit",
    onClick?: never,
} | {
    buttonType: "button",
    onClick: MouseEventHandler<HTMLButtonElement>,
}) & {
    children: ReactNode,
    disabled: boolean,
    width: string,
    margin?: string,
};

const Template = (args: buttonProps) => <Button {...args}>{args.children}</Button>

export const Login = Template.bind({})
export const Register = Template.bind({})

// @ts-ignore
Login.args = {
    children: "Login",
    buttonType: "submit",
    disabled: false,
}

// @ts-ignore
Register.args = {
    children: "Register",
    buttonType: "submit",
    disabled: false,
}
