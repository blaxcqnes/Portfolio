import ContactForm from './ContactForm';

export default function Header({
  isContactFormOpen,
  activeList,
  toggleContactForm,
}) {
  return (
    <main className="header">
      <section
        className="headerContainer"
        style={
          activeList || isContactFormOpen
            ? {
              filter:
                'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
            }
            : null
        }
      >
        <div className="nameAndProfession">
          <p className="name">Mahmoud Taha</p>
          <p className="profession">Cybersecurity Specialist & Web Developer</p>
        </div>

        <div className="locationAndContact">
          <p className="location">Riyadh, Saudi Arabia</p>
          {activeList || isContactFormOpen ? (
            <button
              className="contact"
              style={{
                pointerEvents:
                  activeList || isContactFormOpen ? 'none' : 'auto',
                backgroundColor: '#1e1e1e',
                boxShadow: 'unset',
              }}
              disabled
            >
              Contact
            </button>
          ) : (
            <button
              className="contact"
              onClick={(e) => {
                e.stopPropagation();
                toggleContactForm();
              }}
            >
              Contact
            </button>
          )}
        </div>
      </section>

      {isContactFormOpen && (
        <ContactForm
          isContactFormOpen={isContactFormOpen}
          activeList={activeList}
          toggleContactForm={toggleContactForm}
        />
      )}
    </main>
  );
}
