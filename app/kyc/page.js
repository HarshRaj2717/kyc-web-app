"use client";
import React, { useState } from "react";

function FormControl({
  labelText,
  type,
  placeholder,
  name,
  value,
  handleChange,
  handleBlur,
}) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <input
        id={name}
        type={type}
        className="input input-bordered"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
    </div>
  );
}

export default function KYC() {
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    referral: "",
    college: "",
    college_mail: "",
    college_id: "",
  });

  const handleSubmit = (submitBtnClicked = false) => {
    // Handle form submission (e.g., send data to a server, store it, etc.)
    console.log("Form Data:", formData);
  };

  const handleNameSubmit = (e) => {
    if (formData.name.trim() === "") return;
    e.preventDefault();
    setNameSubmitted(true);
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = () => {
    // Automatically submit the form when the user moves from "name" to "email" input
    handleSubmit();
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Fill your KYC!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        {/* Form elements start here... */}
        <div className="card shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
          {!nameSubmitted && (
            <form className="card-body">
              {/* Name */}
              <FormControl
                labelText={"Full Name"}
                type={"text"}
                placeholder={"name"}
                name={"name"}
                value={formData.name}
                handleChange={handleChange}
              />

              {/* submit button */}
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleNameSubmit(e)}
                >
                  Submit
                </button>
              </div>
            </form>
          )}
          {nameSubmitted && (
            <form className="card-body">
              {/* email */}
              <FormControl
                labelText={"Email"}
                type={"email"}
                placeholder={"email@example.com"}
                name={"email"}
                value={formData.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              {/* Whatsapp Number */}
              <FormControl
                labelText={"Whatsapp Number"}
                type={"text"}
                placeholder={"(+91) __________"}
                name={"number"}
                value={formData.number}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              {/* referral code */}
              <FormControl
                labelText={"Referral Code"}
                type={"text"}
                placeholder={"XXXXXX"}
                name={"referral"}
                value={formData.referral}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              {/* College name */}
              <FormControl
                labelText={"College Name"}
                type={"text"}
                placeholder={"college"}
                name={"college"}
                value={formData.college}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              {/* College mail */}
              <FormControl
                labelText={"College Email"}
                type={"email"}
                placeholder={"college email"}
                name={"college_mail"}
                value={formData.college_mail}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              {/* College id */}
              <FormControl
                labelText={"College ID"}
                type={"text"}
                placeholder={"college ID"}
                name={"college_id"}
                value={formData.college_id}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              {/* submit button */}
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  onClick={() => handleSubmit(true)}
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
