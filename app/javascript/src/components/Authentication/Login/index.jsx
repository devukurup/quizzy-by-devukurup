import React from "react";

import { Typography, Button } from "@bigbinary/neetoui/v2";
import { Input } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "helpers/storage";

const Login = () => {
  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string().required("Password is required"),
    });
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async data => {
    try {
      const email = data.email;
      const password = data.password;
      const response = await authApi.login({ login: { email, password } });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email,
        userId: response.data.id,
        user_name: `${response.data.first_name} ${response.data.last_name}`,
      });
      setAuthHeaders();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto my-48 space-y-3 w-6/12 p-12 rounded-md bg-gradient-to-r from-green-300 to-blue-400 shadow-lg">
      <Typography className="text-center p-3" style="h1" weight="bold">
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="space-y-2 flex flex-col">
            <div className="w-full">
              <Input name="email" type="email" placeholder="email" />
            </div>
            <div>
              <Input name="password" type="password" placeholder="password" />
            </div>

            <div className="mx-auto p-3">
              <Button type="submit" label="Login" />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
