



const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const FormikForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        alert("Registration successful with Formik!");
        resetForm();
      }
    } catch (err) {
      alert("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };