import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Formik Registration:", values);
  };

  return (
    <div>
      <h2>Register (Formik Form)</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="username" placeholder="Username" />
          <ErrorMessage name="username" component="div" />

          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" />

          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="div" />

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default FormikForm;
