"use client";
import React, { useState } from "react";
import * as verifiers from "./verifiers";

function FormControl({
  labelText,
  type,
  placeholder,
  name,
  formData,
  handleChange,
  handleBlur,
  verificationNeeded = false,
  handleVerify,
  verificationStatus = false,
}) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <div className="flex">
        <input
          id={name}
          type={type}
          className={
            "input input-bordered flex-grow" +
            " " +
            (verificationStatus && "input-disabled")
          }
          placeholder={placeholder}
          name={name}
          value={formData[name]}
          onChange={(e) => {
            verificationStatus ? null : handleChange(e);
          }}
          onBlur={(e) => {
            verificationStatus ? null : handleBlur ? handleBlur(e) : null;
          }}
          required
        />
        {verificationNeeded && (
          <div
            className={
              "btn btn-warning ml-2" +
              " " +
              (verificationStatus && "btn-disabled")
            }
            onClick={(e) => {
              handleVerify(name);
            }}
          >
            {!verificationStatus && "Verify"}
            {verificationStatus && "Verified ✅"}
          </div>
        )}
      </div>
    </div>
  );
}

export default function KYC() {
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    emailVerified: false,
    number: "",
    numberVerified: false,
    referral: "",
    referralVerified: false,
    college: "",
    college_mail: "",
    college_mailVerified: false,
    college_id: "",
  });

  function handleVerify(name, verificationFun) {
    if (verificationFun(formData[name])) {
      const updatedData = {
        ...formData,
        [`${name}Verified`]: true,
      };
      setFormData(updatedData);
      handleAutoSubmit(updatedData);
    }
  }

  const handleSubmit = () => {
    // Handle form submission (e.g., send data to a server, store it, etc.)
    console.log("Form Data:", formData);
  };

  const handleAutoSubmit = (updatedData = null) => {
    // Handle form submission (e.g., send data to a server, store it, etc.)
    const data = updatedData || formData;
    console.log("Form Data:", data);
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
    handleAutoSubmit();
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
                formData={formData}
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
                formData={formData}
                handleChange={handleChange}
                handleBlur={handleBlur}
                verificationNeeded={true}
                handleVerify={(name) => {
                  handleVerify(name, verifiers.mailVerifier);
                }}
                verificationStatus={formData.emailVerified}
              />

              {/* Number */}
              <FormControl
                labelText={"Whatsapp Number"}
                type={"text"}
                placeholder={"(+91) __________"}
                name={"number"}
                formData={formData}
                handleChange={handleChange}
                handleBlur={handleBlur}
                verificationNeeded={true}
                handleVerify={(name) => {
                  handleVerify(name, verifiers.whatsappVerifier);
                }}
                verificationStatus={formData.numberVerified}
              />

              {/* referral code */}
              <FormControl
                labelText={"Referral Code"}
                type={"text"}
                placeholder={"XXXXXX"}
                name={"referral"}
                formData={formData}
                handleChange={handleChange}
                handleBlur={handleBlur}
                verificationNeeded={true}
                handleVerify={(name) => {
                  handleVerify(name, verifiers.referralVerifier);
                }}
                verificationStatus={formData.referralVerified}
              />

              {/* College name */}
              <FormControl
                labelText={"College Name"}
                type={"text"}
                placeholder={"college"}
                name={"college"}
                formData={formData}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              {/* College mail */}
              <FormControl
                labelText={"College Email"}
                type={"email"}
                placeholder={"college email"}
                name={"college_mail"}
                formData={formData}
                handleChange={handleChange}
                verificationNeeded={true}
                handleVerify={(name) => {
                  handleVerify(name, verifiers.mailVerifier);
                }}
                verificationStatus={formData.college_mailVerified}
                handleBlur={handleBlur}
              />

              {/* College id */}
              <FormControl
                labelText={"College ID"}
                type={"text"}
                placeholder={"college ID"}
                name={"college_id"}
                formData={formData}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />

              {/* submit button */}
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={handleSubmit}>
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
