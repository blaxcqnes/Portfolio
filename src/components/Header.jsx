import LightButton from './LightButton';
import ContactForm from './ContactForm';

export default function Header({
  isLightModeOn,
  isContactFormOpen,
  isContactFormMobileOpen,
  isSkillListOpen,
  isEducationListOpen,
  isCyberListOpen,
  isWebListOpen,
  toggleLightMode,
  toggleContactForm,
  toggleContactFormMobile,
  toggleSkillList,
  toggleEducationList,
  toggleCyberList,
  toggleWebList,
  classType,
}) {
  function handleClick() {
    if (isContactFormOpen) {
      toggleContactForm();
    } else if (isContactFormMobileOpen) {
      toggleContactFormMobile();
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
    <main className={isLightModeOn ? 'headerLight' : 'header'}>
      <section
        className={classType ? 'headerContainerUnfocused' : 'headerContainer'}
        onClick={handleClick}
        style={{ marginBottom: isContactFormMobileOpen ? '0.2rem' : '0' }}
      >
        <div className="nameAndProfession">
          <p className="name">Mahmoud Taha</p>
          <p className="profession">
            Cybersecurity Professional & Web Developer
          </p>
        </div>
        <div className="locationAndContact">
          <LightButton
            isLightModeOn={isLightModeOn}
            toggleLightMode={toggleLightMode}
          />

          <p className="location">Riyadh, Saudi Arabia</p>
          {isContactFormOpen ||
          isContactFormMobileOpen ||
          isSkillListOpen ||
          isEducationListOpen ||
          isCyberListOpen ||
          isWebListOpen ? (
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
