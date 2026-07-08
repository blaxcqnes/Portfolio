import ContactForm from './ContactForm';

export default function Header({
  isContactFormOpen,
  toggleContactForm,
  activeList,
  setActiveList,
}) {
  function closeList() {
    if (activeList) {
      setActiveList(false);
    } else if (isContactFormOpen) {
      toggleContactForm();
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
        onClick={closeList}
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
            <button className="contact" onClick={toggleContactForm}>
              Contact
            </button>
          )}
        </div>
      </section>
      {/*  */}
      {isContactFormOpen && (
        <ContactForm
          isContactFormOpen={isContactFormOpen}
          toggleContactForm={toggleContactForm}
        />
      )}
    </main>
  );
}
