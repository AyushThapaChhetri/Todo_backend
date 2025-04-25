import BaseYup from "../contract/baseValidator.contract";

export const signupValidationSchema = BaseYup.object({
  fullName: BaseYup.string()
    .min(2, "Too short")
    .max(30, "Too long")
    .required("Please Enter Name"),
  emailName: BaseYup.email("Please Enter Valid Email").required(
    "Please Enter Email"
  ),
  emailPassword: BaseYup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain at least 1 lower case letter") // for lowercase letters
    .matches(/[A-Z]/, "Password must contain at least 1 upper case letter") // for uppercase letters
    .matches(/\d/, "Password must contain at least 1 number") // for numbers
    .matches(/[\W_]/, "Password must contain at least 1 special character") // for special characters
    .required("Please Enter Password"),
  emailConfirmPassword: BaseYup.string()
    .oneOf([BaseYup.ref("emailPassword")], "Password must match")
    .required("Enter Confirm Password"),
  gender: BaseYup.string()
    .oneOf(["male", "female", "other"], "Invalid gender selection")
    .required("Please Enter Your Gender"),
  emailDob: BaseYup.date()
    .required("Please select your date of birth")
    .max(new Date(), "Date of birth cannot be in the future"),
});

export const loginValidationSchema = BaseYup.object({
  emailName: BaseYup.email("Please Enter Valid Email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please Enter Valid Email"
    )
    .required("Please Enter Email"),
  emailPassword: BaseYup.string().required("Please Enter Password"),
  emailRemember: BaseYup.bool(),
});

export const refreshTokenValidationSchema = BaseYup.object({
  refreshToken: BaseYup.string().required("Refresh token is required"),
});
