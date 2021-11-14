import React, { useState } from "react";

import { Checkmark } from "@bigbinary/neeto-icons";
import {
  Typography,
  Button,
  Label,
  Input,
  Dropdown,
} from "@bigbinary/neetoui/v2";
import { Formik, Field, Form } from "formik";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";

const AddQuestion = () => {
  const { state } = useLocation();
  const [count, setCount] = useState(1);
  const [defaultAnswer, setDefaultAnswer] = useState(1);
  const [optionsList, setOptionsList] = useState([
    { id: 1, value: "Option 1" },
    { id: 2, value: "Option 2" },
  ]);
  const [disableAddOption, setDisableAddOption] = useState(false);
  const validationSchema = () => {
    return Yup.object().shape({
      question: Yup.string().trim().required("Required"),
      option1: Yup.string().trim().required("Required"),
      option2: Yup.string().trim().required("Required"),
    });
  };

  const handleSubmit = () => {
    // handleSubmitRequest(data);
    // use data here
  };

  const initialValues = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  };

  const handleOptions = () => {
    setCount(prevState => prevState + 1);
    const newOptionList = [...optionsList, { id: count + 2, value: "Options" }];
    setOptionsList(newOptionList);
    if (count == 2) {
      setDisableAddOption(true);
    }
  };
  const handleOptionsDelete = index => {
    const newOptionsList = [...optionsList];
    newOptionsList.splice(index, 1);
    setOptionsList(newOptionsList);
    setDisableAddOption(false);
    setCount(prevState => prevState - 1);
  };

  return (
    <div>
      <div className="p-10">
        <Typography style="h1" weight="extrabold" className="text-gray-600">
          {state}
        </Typography>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-4/12 space-y-5 p-10">
          <div className="grid grid-cols-3">
            <Label>Question</Label>
            <Field name="question" type="text">
              {({ field, meta }) => (
                <Input
                  {...field}
                  error={meta.touched && meta.error}
                  className="col-span-2"
                />
              )}
            </Field>
          </div>
          {optionsList.map((item, index) => (
            <div key={index} className="grid grid-cols-3">
              <Label>{`Options ${index + 1}`}</Label>
              {index < 2 && (
                <div className="flex col-span-2 space-x-2">
                  <Field name={`option${index + 1}`} type="text">
                    {({ field, meta }) => (
                      <Input
                        {...field}
                        error={meta.touched && meta.error}
                        placeholder={item.value}
                      />
                    )}
                  </Field>
                  {defaultAnswer === index + 1 && (
                    <Checkmark color="#00ba88" size={30} />
                  )}
                </div>
              )}
              {index >= 2 && (
                <div className="flex col-span-2 space-x-2 ">
                  <Field name={`option${index + 1}`} type="text">
                    {({ field }) => (
                      <Input {...field} placeholder={item.value} />
                    )}
                  </Field>
                  <Button
                    label="Delete"
                    onClick={() => handleOptionsDelete(index)}
                  />
                  {defaultAnswer === index + 1 && (
                    <Checkmark color="#00ba88" size={30} />
                  )}
                </div>
              )}
            </div>
          ))}
          <div className="grid grid-cols-3">
            {!disableAddOption && (
              <Button
                className="col-end-3"
                label="+ Add Option"
                onClick={handleOptions}
              />
            )}
          </div>
          <div className="grid grid-cols-3">
            <Label>Correct answer</Label>
            <Dropdown
              buttonStyle="primary"
              label={`Option ${defaultAnswer}`}
              position="bottom-end"
            >
              {optionsList.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setDefaultAnswer(index + 1)}
                >{`Options ${index + 1}`}</li>
              ))}
            </Dropdown>
          </div>
          <div className="grid grid-cols-3">
            <Button className="col-end-3 " label="Submit" type="submit" />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddQuestion;