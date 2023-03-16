import React, { useState, useRef } from 'react';
import { Steps } from 'antd';
import './TypeformStyle.css';
import { CSSTransition } from 'react-transition-group';

const { Step } = Steps;

function MyForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const formRef = useRef(null);

  function handleNameChange(event) {
    setName(event.target.value);
    if (event.target.value === '') {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
    if (event.target.value === '') {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  function handleMessageChange(event) {
    setMessage(event.target.value);
    if (event.target.value === '') {
      setMessageError(true);
    } else {
      setMessageError(false);
    }
  }

  function handleNext() {
    if (currentQuestion === 0 && name === '') {
      setNameError(true);
    }
    if (currentQuestion === 1 && email === '') {
      setEmailError(true);
    }
    if (currentQuestion === 2 && message === '') {
      setMessageError(true);
    }
    if (!nameError && !emailError && !messageError) {
      setCurrentQuestion(currentQuestion + 1);
      formRef.current.scrollTop = 0;
    }
  }

  function handlePrev() {
    setCurrentQuestion(currentQuestion - 1);
    formRef.current.scrollTop = 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name,
      email,
      message,
    };

    console.log(data);
  }

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
                value={name}
                onChange={handleNameChange}
                required
              />
              {nameError && <p className="error-message">Please enter your name</p>}
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
                id="name"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
          </CSSTransition>

          <CSSTransition
            in={currentQuestion === 2}
            timeout={500}
            classNames="typeform-question"
            unmountOnExit
          >
            <div className="typeform-question">
              <label className="typeform-label" htmlFor="name">
                What Is Your Position In Company?
              </label>
              <input
                className="typeform-input"
                type="text"
                id="name"
                value={message}
                onChange={handleMessageChange}
                required
              />
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
            <button className="typeform-button" type="submit">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
    </div>
  );
}
export default MyForm;