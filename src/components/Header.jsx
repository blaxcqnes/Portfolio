import ContactForm from './ContactForm';

export default function Header({
  isContactFormOpen,
  isSkillListOpen,
  isEducationListOpen,
  isCyberListOpen,
  isWebListOpen,
  toggleContactForm,
  toggleSkillList,
  toggleEducationList,
  toggleCyberList,
  toggleWebList,
  classType,
}) {
  function handleClick() {
    if (isContactFormOpen) {
      toggleContactForm();
    } else if (isSkillListOpen) {
      toggleSkillList();
    } else if (isEducationListOpen) {
      toggleEducationList();
    } else if (isCyberListOpen) {
      toggleCyberList();
    } else if (isWebListOpen) {
      toggleWebList();
    }
  }
  return (
    <main className="header">
      <section
        className={classType ? 'headerConatinerUnfocused' : 'headerConatiner'}
        onClick={handleClick}
      >
        <div className="nameAndProfession">
          <p className="name">Mahmoud Taha</p>
          <p className="profession">
            Cybersecurity Professional & Web Developer
          </p>
        </div>

        <div className="locationAndContact">
          <p className="location">Riyadh, Saudi Arabia</p>
          {isContactFormOpen ||
          isSkillListOpen ||
          isEducationListOpen ||
          isCyberListOpen ||
          isWebListOpen ? (
            <button className="contact" onClick={toggleContactForm} disabled>
              Contact
            </button>
          ) : (
            <button className="contact" onClick={toggleContactForm}>
              Contact
            </button>
          )}
        </div>
      </section>

      {isContactFormOpen && (
        <ContactForm
          isContactFormOpen={isContactFormOpen}
          toggleContactForm={toggleContactForm}
        />
      )}
    </main>
  );
}
