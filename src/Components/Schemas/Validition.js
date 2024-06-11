import * as Yup from 'yup'

export const registrationSchema = Yup.object({
    name : Yup.string().min(2).max(20).required("Please enter name field."),
    email : Yup.string().email().required("Please enter email."),
    password : Yup.string()
                    .min(6, "Password must be at least 6 characters long")
                    .required("Please enter password")
                    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
                    .matches(/[0-9]/, "Password must contain at least one number")
                    .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
    mobileNumber : Yup.string().min(10).max(10).required("Please enter Mobile Number"),
    confirm_password : Yup.string().min(6).oneOf([Yup.ref('password')], "Password must match.")
})
