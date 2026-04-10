"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

// Types
interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const FormValidationPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Handle Input Change (Type-safe)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name in formData) {
      setFormData((prev) => ({
        ...prev,
        [name as keyof FormData]: value
      }));
    }
  };

  // Validation Function
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email Validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password Validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Handle Submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      // Submit Logic
      console.log("Form Submitted:", formData);
      alert("Form submitted successfully!");

      // Reset Form
      setFormData({
        name: "",
        email: "",
        password: ""
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "300px", margin: "auto" }}>
      <h2>Simple Form</h2>

      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormValidationPage;