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
        className={
          classType || isContactFormOpen
            ? 'headerContainerUnfocused'
            : 'headerContainer'
        }
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
          {classType || isContactFormOpen ? (
            <button className="contact" disabled>
              Contact
            </button>
          ) : (
            <button
              className="contact"
              onClick={!isContactFormOpen ? toggleContactForm : undefined}
            >
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
