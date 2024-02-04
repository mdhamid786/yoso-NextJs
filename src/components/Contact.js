"use client";
import React from "react";
import { postWithToken } from "@/Helper/common";
import { useState } from "react";
import ContactInfo from "./ContactInfo";
import toast, { Toaster } from "react-hot-toast";
const Contact = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    message: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    if (!name.trim()) {
      newErrors.name = "Name is required *";
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(name)) {
      newErrors.name = "Name should contain letters";
      isValid = false;
    } else {
      newErrors.name = "";
    }
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required *";
      isValid = false;
    } else if (mobile.length !== 10) {
      newErrors.mobile = "Phone number should be 10 digits";
    } else {
      newErrors.mobile = "";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required *";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }
    if (!subject.trim()) {
      newErrors.subject = "subject is required *";
      isValid = false;
    } else {
      newErrors.subject = "";
    }

    if (!message.trim()) {
      newErrors.message = "message is required *";
      isValid = false;
    } else {
      newErrors.message = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  // @Des contact api calling 
  const contactForm = async (event) => {
    const apiData = JSON.stringify({ name, mobile, email, subject, message });
    event.preventDefault();
    if (validateForm()) {
      try {
        const data = await postWithToken("contact-form-submit", apiData);
        if (data.error == false) {
          setEmail("");
          setName("");
          setSubject("");
          setMobile("");
          setMessage("");
          toast.success(data.message,{
            position:"top-left"
          });
        } else {
          toast.error(data.message,{
            position:"top-left"
          });
        }
      } catch (errorData) {
        toast.error(errorData.message,{
          position:"top-left"
        });
      }
    }
  };

  return (
    <div>
      <section className="contact__section section--padding">
        <div className="container">
          <div className="section__heading mb-40">
            <h2 className="section__heading--maintitle contact__section--hrading mb-10">
              Get In Touch
            </h2>
            <p className="contact__section--hrading__desc">
            We YATAS INDIA Jewellery design studio , with a huge range of designer Jewellery, bracelets and bang ss
            </p>
          </div>
          <div className="main__contact--area">
            <div className="row align-items-center row-md-reverse">
              <div className="col-lg-5">
                <ContactInfo />
              </div>
              <div className="col-lg-7">
                <div className="contact__form">
                  <form
                    onSubmit={contactForm}
                    className="contact__form--inner"
                    action="#"
                  >
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="contact__form--list mb-20">
                          <label
                            className="contact__form--label"
                            htmlFor="input1"
                          >
                            Name{" "}
                            <span className="contact__form--label__star">
                              *
                            </span>
                          </label>
                          <input
                            className="contact__form--input"
                            name="firstname"
                            id="input1"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your First Name"
                            type="text"
                          />
                          {errors.name && (
                            <span
                              style={{ color: "tomato", fontWeight: "bolder" , marginBottom:"10px"}}
                              className="error-message"
                            >
                              {errors.name}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="contact__form--list mb-20">
                          <label
                            className="contact__form--label"
                            htmlFor="input3"
                          >
                            Phone Number{" "}
                            <span className="contact__form--label__star">
                              *
                            </span>
                          </label>
                          <input
                            className="contact__form--input"
                            name="number"
                            id="input3"
                            minLength={10}
                            maxLength={10}
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Phone number"
                            type="text"
                          />
                          {errors.mobile && (
                            <span
                              style={{ fontWeight: "bolder", color: "tomato" ,marginBottom:"10px"}}
                              className="error-message"
                            >
                              {errors.mobile}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="contact__form--list mb-20">
                          <label
                            className="contact__form--label"
                            htmlFor="input4"
                          >
                            Email{" "}
                            <span className="contact__form--label__star">
                              *
                            </span>
                          </label>
                          <input
                            className="contact__form--input"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="input4"
                            placeholder="Email"
                            type="text"
                          />
                          {errors.email && (
                            <span
                              style={{ fontWeight: "bolder", color: "tomato" , marginBottom:"10px"}}
                              className="error-message"
                            >
                              {errors.email}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="contact__form--list mb-20">
                          <label
                            className="contact__form--label"
                            htmlFor="input2"
                          >
                            Subject{" "}
                            <span className="contact__form--label__star">
                              *
                            </span>
                          </label>
                          <input
                            className="contact__form--input"
                            name="lastname"
                            id="input2"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Your Last Name"
                            type="text"
                          />
                          {errors.subject && (
                            <span
                              style={{ fontWeight: "bolder", color: "tomato",marginBottom:"10px" }}
                              className="error-message"
                            >
                              {errors.subject}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="contact__form--list mb-10">
                          <label
                            className="contact__form--label"
                            htmlFor="input5"
                          >
                            Write Your Message{" "}
                            <span className="contact__form--label__star">
                              *
                            </span>
                          </label>
                          <textarea
                            className="contact__form--textarea"
                            name="message"
                            id="input5"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write Your Message"
                            defaultValue={""}
                          />
                          {errors.message && (
                            <span
                              style={{ fontWeight: "bolder", color: "tomato",marginBottom:"10px" }}
                              className="error-message"
                            >
                              {errors.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      className="contact__form--btn primary__btn"
                      type="submit"
                    >
                      Submit Now
                    </button>
                    <p className="form-messege" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
