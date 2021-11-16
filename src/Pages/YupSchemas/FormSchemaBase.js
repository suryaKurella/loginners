import * as yup from "yup";

const formSchemaBase = () => {
    return yup.object().shape({
        userName:
            yup.string().matches(/^([^0-9]*)$/, "User Name should not contain numbers")
                .required("Please enter your User Name"),
        message:
            yup.string().required("Please enter your message")
    })
}

export default formSchemaBase
