import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm({ isContactFormOpen, toggleContactForm }) {
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const [nameValue, setNameInputValue] = useState('');
  const [subjectValue, setSubjectInputValue] = useState('');
  const [emailValue, setEmailInputValue] = useState('');
  const [textAreaValue, setTextAreaInputValue] = useState('');

  const isFormValid =
    nameValue.length === 0 &&
    subjectValue.length === 0 &&
    emailValue.length === 0 &&
    textAreaValue.length === 0;

  const handleReset = () => {
    setNameInputValue('');
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
    <main className="contactForm" id="contactForm">
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
      <form ref={form} onSubmit={sendAnEmail} autoComplete="on">
        {statusMessage && <p className={statusType}>{statusMessage}</p>}
        {/* <p className="fail">{statusMessage}</p> */}
        <div className="allInOneForm">
          {/* */}
          <label htmlFor="name"></label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            className="name"
            value={nameValue}
            onChange={(e) => setNameInputValue(e.target.value)}
          />
          {/* */}
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
        </div>
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
