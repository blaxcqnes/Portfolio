import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm({
  isLightModeOn,
  isContactFormOpen,
  toggleContactForm,
}) {
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  // ..
  const [firstNameValue, setFirstNameInputValue] = useState('');
  const [lastNameValue, setLastNameInputValue] = useState('');
  const [subjectValue, setSubjectInputValue] = useState('');
  const [emailValue, setEmailInputValue] = useState('');
  const [textAreaValue, setTextAreaInputValue] = useState('');

  const isFormValid =
    firstNameValue.length === 0 &&
    lastNameValue.length === 0 &&
    subjectValue.length === 0 &&
    emailValue.length === 0 &&
    textAreaValue.length === 0;

  const handleReset = () => {
    setFirstNameInputValue('');
    setLastNameInputValue('');
    setSubjectInputValue('');
    setEmailInputValue('');
    setTextAreaInputValue('');
  };

  const form = useRef();
  const sendAnEmail = (e) => {
    e.preventDefault();
    setStatusMessage('Sending...');
    setStatusType('info');
    emailjs
      .sendForm(
        'blaxcqnes',
        'blaxcqnes(Receiving)',
        form.current,
        'Lrj-AC9Iq5Sa72lzI',
        {
          publicKey: 'vGtj7a70yEAqLq5XV7dCM',
        },
      )
      .then(
        () => {
          setStatusMessage('Mail Sent!');
          setStatusType('success');
          handleReset();

          setTimeout(() => {
            setStatusMessage('');
          }, 5000);
        },
        (error) => {
          const errorMessage =
            error?.text ||
            error?.message ||
            JSON.stringify(error) ||
            'Unexpected error';
          setStatusMessage(`Failed... ${errorMessage}`);
          setStatusType('fail');

          setTimeout(() => {
            setStatusMessage('');
          }, 5000);
        },
      );
    e.target.reset();
  };

  return (
    <main
      className={isLightModeOn ? 'contactFormLight' : 'contactForm'}
      id="contactForm"
    >
      {/*  */}
      <div className="titleAndButton">
        <h4>Get in touch</h4>
        {/*  */}
        <button
          className="close"
          onClick={isContactFormOpen ? toggleContactForm : undefined}
        >
          Close
        </button>
        {/*  */}
      </div>
      {/*  */}
      <form ref={form} onSubmit={sendAnEmail}>
        {statusMessage && <p className={statusType}>{statusMessage}</p>}
        <div className="namesAndSubject">
          {/* */}
          <span className="names">
            <label htmlFor="firstName"></label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              className="firstName"
              value={firstNameValue}
              onChange={(e) => setFirstNameInputValue(e.target.value)}
            />
            {/* */}
            <label htmlFor="lastName"></label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="lastName"
              value={lastNameValue}
              onChange={(e) => setLastNameInputValue(e.target.value)}
            />
            {/* */}
          </span>
          <label htmlFor="subject"></label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Subject"
            className="subject"
            value={subjectValue}
            onChange={(e) => setSubjectInputValue(e.target.value)}
          />
          {/* */}
        </div>
        {/*  */}
        <label htmlFor="email"></label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your Email"
          className="email"
          value={emailValue}
          onChange={(e) => setEmailInputValue(e.target.value)}
        />
        {/*  */}
        <textarea
          id="textArea"
          name="textArea"
          placeholder="Your Message"
          className="textArea"
          value={textAreaValue}
          onChange={(e) => setTextAreaInputValue(e.target.value)}
        ></textarea>
        {/*  */}
        <div className="buttons">
          {/*  */}
          {isFormValid ? (
            <button disabled className="sendDisabled">
              Send
            </button>
          ) : (
            <button className="send">Send</button>
          )}
          {/*  */}
          {!isFormValid && (
            <button type="reset" className="reset" onClick={handleReset}>
              Reset
            </button>
          )}
          {/*  */}
        </div>
        {/*  */}
      </form>
      {/*  */}
    </main>
  );
}
