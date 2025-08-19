import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
    .min(6,'password must be atleast 6 characters')
    .required('Input valid password'),
});

const FormikForm = () => (
    <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
        console.log("Formik Submitted:", values);
        
        // Calling API

        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
          console.log("API Response:", data);

        resetForm();
      })
      .catch((err) => console.error("API error:", err));
    }}

    >
        {() => (
           <Form className="p-4 space-y-4 max-w-sm mx-auto">
        <h2 className="text-xl font-bold">User Registration (Formik)</h2>

        <div>
          <label className="block mb-1">Username</label>
          <Field
            type="text"
            name="username"
            placeholder="Enter your username"
            className="border p-2 w-full"
          />
          <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <Field
            type="email"
            name="email"
            placeholder="Enter your email"
            className="border p-2 w-full"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <Field
            type="password"
            name="password"
            placeholder="Enter your password"
            className="border p-2 w-full"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
        </div>

        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Submit
        </button>
            </Form>
        )}
    </Formik>
);

export default FormikForm;