"use client";
import React, { useState, useEffect } from "react";
import * as verifiers from "./verifiers";
import * as sheet from "./sheet";

function FormControl({
  labelText,
  type,
  placeholder,
  name,
  formData,
  handleChange,
  handleBlur,
  isRequired = true,
  verificationNeeded = false,
  handleVerify,
  verificationStatus = false,
}) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">
          {labelText + (isRequired ? " *" : "")}
        </span>
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
          {...{ required: isRequired }}
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
            {verificationStatus && "Verification Link Sent ✅"}
          </div>
        )}
      </div>
    </div>
  );
}

export default function KYC() {
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [curRowNumber, setCurRowNumber] = useState(0);
  const [nameBtnLoading, setNameBtnLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    emailVerified: false,
    number: "",
    numberVerified: false,
    referral: "",
    // referralVerified: false,
    college: "",
    college_mail: "",
    college_mailVerified: false,
    college_id: "",
  });

  // function handleVerify(name, verificationFun) {
  //   if (verificationFun(formData[name], curRowNumber)) {
  //     const updatedData = {
  //       ...formData,
  //       [`${name}Verified`]: true,
  //     };
  //     setFormData(updatedData);
  //     handleAutoSubmit(updatedData);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = formData;
    await sheet.updateCurData(data, curRowNumber);
    await verifiers.whatsappVerifier(data.number, curRowNumber);
    await verifiers.mailVerifier(data.email, curRowNumber);
    await verifiers.collegeMailVerifier(data.college_mail, curRowNumber);
  };

  const handleAutoSubmit = async (updatedData = null) => {
    const data = updatedData || formData;
    await sheet.updateCurData(data, curRowNumber);
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.trim() === "") return;
    setNameBtnLoading(true);
    const tempRowNumber = await sheet.setName(formData);
    setCurRowNumber(tempRowNumber);
  };

  useEffect(() => {
    if (curRowNumber != 0) setNameSubmitted(true);
  }, [curRowNumber]);

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
                  className={
                    "btn btn-primary" +
                    " " +
                    (nameBtnLoading ? "btn-disabled" : "")
                  }
                  onClick={(e) => handleNameSubmit(e)}
                >
                  {nameBtnLoading && (
                    <span className="loading loading-spinner"></span>
                  )}
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
                // verificationNeeded={true}
                // handleVerify={(name) => {
                //   handleVerify(name, verifiers.mailVerifier);
                // }}
                // verificationStatus={formData.emailVerified}
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
                // verificationNeeded={true}
                // handleVerify={(name) => {
                //   handleVerify(name, verifiers.whatsappVerifier);
                // }}
                // verificationStatus={formData.numberVerified}
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
                isRequired={false}
                // verificationNeeded={true}
                // handleVerify={(name) => {
                //   handleVerify(name, verifiers.referralVerifier);
                // }}
                // verificationStatus={formData.referralVerified}
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
                handleBlur={handleBlur}
                // verificationNeeded={true}
                // handleVerify={(name) => {
                //   handleVerify(name, verifiers.collegeMailVerifier);
                // }}
                // verificationStatus={formData.college_mailVerified}
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
