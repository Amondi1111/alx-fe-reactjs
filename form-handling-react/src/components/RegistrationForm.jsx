import { useState } from 'react';

const ControlledForm = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        

     if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setError("");
    console.log("Submitted Data:", formData);
     
        setError("");
    console.log("Submitted Data:", formData);
    // simulate API call
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("API Response:", data));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold">User Registration (Controlled)</h2>

      {error && <p className="text-red-500">{error}</p>}

            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                />
            <button type="submit">Submit</button>
        </form>
    );
}

export default ControlledForm;