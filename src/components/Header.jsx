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
  // classType,
  activeList,
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
      {/*  */}
      <section
        className="headerContainer"
        id="headerContainer"
        style={
          activeList || isContactFormOpen
            ? {
                filter:
                  'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
              }
            : null
        }
        onClick={handleClick}
      >
        {/*  */}
        <div className="nameAndProfession">
          <p className="name">Mahmoud Taha</p>
          <p className="profession">
            Cybersecurity Professional & Web Developer
          </p>
        </div>
        {/*  */}
        <div className="locationAndContact">
          <p className="location">Riyadh, Saudi Arabia</p>
          {activeList || isContactFormOpen ? (
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
      {/*  */}
      {activeList === 'contactForm' && (
        <ContactForm
          isContactFormOpen={isContactFormOpen}
          toggleContactForm={toggleContactForm}
        />
      )}
    </main>
  );
}
