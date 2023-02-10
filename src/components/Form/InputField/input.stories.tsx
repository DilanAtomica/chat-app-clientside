import InputField from "./index";

export default {
    title: "InputField",
    component: InputField,
}

type inputFieldProps = {
    label: "Email" | "Password" | "Confirm Password" | "Username",
    showPassword?: boolean,
    setShowPassword?: (showPassword: boolean) => void,
    errorMsg: string | undefined,
}

const Template = (args: inputFieldProps) => <InputField obligated={true} register={() => console.log("")} {...args} />

export const EmailInput = Template.bind({});
// @ts-ignore
EmailInput.args = {
    label: "Email",
    errorMsg: undefined,
}


export const EmailInputError = Template.bind({});
// @ts-ignore
EmailInputError.args = {
    label: "Email",
    errorMsg: "This field is required!",
}

export const PasswordInput = Template.bind({});
// @ts-ignore
PasswordInput.args = {
    label: "Password",
    errorMsg: undefined,
}


export const PasswordInputError = Template.bind({});
// @ts-ignore
PasswordInputError.args = {
    label: "Password",
    errorMsg: "This field is required!",
}

