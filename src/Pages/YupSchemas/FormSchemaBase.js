import * as yup from "yup";

const formSchemaBase = () => {
    return yup.object().shape({
        userName:
            yup.string().matches(/^([^0-9]*)$/, "User Name should not contain numbers")
                .required("Please enter your User Name"),
        message:
            yup.string().required("Please enter your message"),
        item_ids: yup.array()
            .transform(ids => {
                return ids.filter(id => {
                    return id === 0 || id;
                });
            })
            .min(1, "Please choose atleast one platform for the message to be broadcasted")
    })
}

export default formSchemaBase
