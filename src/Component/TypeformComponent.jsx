import React, { useState, useRef } from 'react';
import { Steps } from 'antd';
import './TypeformStyle.css';
import { CSSTransition } from 'react-transition-group';
import emailjs from 'emailjs-com';

const { Step } = Steps;

function MyForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateField = (fieldName) => {
    const fieldValue = formData[fieldName];
    if (fieldValue.trim() === '') {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        [fieldName]: true,
      }));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    const currentField = Object.keys(formData)[currentQuestion];
    if (!validateField(currentField)) {
      return;
    }
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    formRef.current.scrollTop = 0;
  };

  const handlePrev = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    formRef.current.scrollTop = 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentQuestion === 2) {
      // Sending email using EmailJS
      emailjs
        .sendForm('service_ry8t3lq', 'template_byotioq', event.target, '7kmzbl1P9fO1neMlR')
        .then((response) => {
          console.log('Email sent successfully!', response);
          setIsSubmitted(true); // Set the submission status to true
          setTimeout(() => {
            setIsSubmitted(false); // Reset the submission status after a delay
            setFormData({
              name: '',
              email: '',
              message: '',
            }); // Reset form data
            setFormErrors({
              name: false,
              email: false,
              message: false,
            });
            setCurrentQuestion(0);
            formRef.current.scrollTop = 0;
          }, 3000); // Delay in milliseconds (e.g., 3000 = 3 seconds)
        })
        .catch((error) => {
          console.error('Email sending failed:', error);
        });
    }
  };

  return (
    <div className="typeform-container">
      <Steps current={currentQuestion}>
        <Step title="Step 1" />
        <Step title="Step 2" />
        <Step title="Step 3" />
      </Steps>

      <div className="typeform-question-container" ref={formRef}>
        <form onSubmit={handleSubmit}>
          <CSSTransition
            in={currentQuestion === 0}
            timeout={500}
            classNames="typeform-question"
            unmountOnExit
          >
            <div className="typeform-question">
              <label className="typeform-label" htmlFor="name">
                What Is Your Full-Name?
              </label>
              <input
                className="typeform-input"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {formErrors.name && <p className="error-message">Please enter your name</p>}
            </div>
          </CSSTransition>

          <CSSTransition
            in={currentQuestion === 1}
            timeout={500}
            classNames="typeform-question"
            unmountOnExit
          >
            <div className="typeform-question">
              <label className="typeform-label" htmlFor="email">
                Company Details
              </label>
              <input
                className="typeform-input"
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && <p className="error-message">Please enter your email</p>}
            </div>
          </CSSTransition>

          <CSSTransition
            in={currentQuestion === 2}
            timeout={500}
            classNames="typeform-question"
            unmountOnExit
          >
            <div className="typeform-question">
              <label className="typeform-label" htmlFor="message">
                What Is Your Position In Company?
              </label>
              <input
                className="typeform-input"
                type="text"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              {formErrors.message && <p className="error-message">Please enter your position</p>}
            </div>
          </CSSTransition>

          <div className="typeform-buttons">
            {currentQuestion > 0 && (
              <button className="typeform-button" type="button" onClick={handlePrev}>
                Previous
              </button>
            )}

            {currentQuestion < 2 ? (
              <button className="typeform-button" type="button" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button className="typeform-button" type="submit">Submit</button>
            )}
          </div>
        </form>

        {isSubmitted && <p className="thank-you-message">Thank you for submitting the form!</p>}
      </div>
    </div>
  );
}

export default MyForm;
