import kaffa from '../images/mainContent_rightOrLowerPart/kaffa.png';
import veila from '../images/mainContent_rightOrLowerPart/veila.png';
import guessGame from '../images/mainContent_rightOrLowerPart/guessGame.png';
import CyberList from './CyberList';
import WebList from './WebList';

export default function RightOrLowerPart({
  isLightModeOn,
  isContactFormOpen,
  isContactFormMobileOpen,
  isSkillListOpen,
  isEducationListOpen,
  isCyberListOpen,
  isWebListOpen,
  toggleContactFormMobile,
  toggleSkillList,
  toggleEducationList,
  toggleCyberList,
  toggleWebList,
  classType,
}) {
  function handleClick() {
    if (isContactFormMobileOpen) {
      toggleContactFormMobile();
    } else if (isSkillListOpen) {
      toggleSkillList();
    } else if (isEducationListOpen) {
      toggleEducationList();
    }
  }

  function closeLists() {
    if (isCyberListOpen) {
      toggleCyberList();
    } else if (isWebListOpen) {
      toggleWebList();
    }
  }
  return (
    <main
      className={isLightModeOn ? 'rightOrLowerPartLight' : 'rightOrLowerPart'}
      onClick={handleClick}
    >
      {/*  */}
      <div
        className={
          classType || isContactFormOpen
            ? 'rightOrLowerPartContainerUnfocused'
            : 'rightOrLowerPartContainer'
        }
      >
        <section
          className={isWebListOpen ? 'projectsSwapped' : 'projects'}
          onClick={closeLists}
        >
          {/*  */}
          <div className={isLightModeOn ? 'cyberLight' : 'cyber'}>
            <p className="title">Cybersecurity Projects</p>
            <div className="allInOneCyber">
              <h4>Securing Systems & Networks</h4>
              <ol className="points">
                <li>Prevention for Advanced Digital attacks</li>
                <li>Design Secure own System</li>
                <li>Prevent outside attacks using VPN & load balancing</li>
                <li>Design PFSense Firewall network</li>
                <li>Make your secure lab</li>
              </ol>
            </div>
            {/*  */}
            <div className="allInOneCyber">
              <h4>Cryptography & Stegnography</h4>
              <ol className="points">
                <li>Avoiding Malware Detections-100% FUD</li>
                <li>Cryptting service</li>
                <li>Stenography</li>
              </ol>
            </div>
            {/*  */}
            {classType || isContactFormOpen ? (
              <button className="extras" disabled>
                Extras
              </button>
            ) : (
              <button className="extras" onClick={toggleCyberList}>
                Extras
              </button>
            )}
            {/*  */}
          </div>
          {/*  */}
          <div className={isLightModeOn ? 'webLight' : 'web'}>
            <p className="title">Web Dev. Projects</p>
            {/*  */}
            <div className="carousel">
              {/*  */}
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="firstImg"
              >
                <img src={kaffa} />
              </a>
              {/*  */}
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="secondImg"
              >
                <img src={veila} />
              </a>
              {/*  */}
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="thirdImg"
              >
                <img src={guessGame} />
              </a>
              {/*  */}
            </div>
            {/*  */}
            {classType || isContactFormOpen ? (
              <button className="more" disabled>
                More
              </button>
            ) : (
              <button className="more" onClick={toggleWebList}>
                More
              </button>
            )}
            {/*  */}
            {/*  */}
          </div>
          {/*  */}
          {/*  */}
        </section>
        {/*  */}
        <footer
          className={isLightModeOn ? 'footerLight' : 'footer'}
          style={
            isWebListOpen || isCyberListOpen
              ? {
                  display: 'hidden',
                  width: '100%',
                  height: '0',
                  padding: '0',
                  borderRadius: '0',
                  transition: 'all 0.2s ease',
                  opacity: '0',
                }
              : {
                  display: 'flex',
                  width: '100%',
                  padding: '1.5rem 1rem',
                  transition: 'all 0.2s ease',
                  borderRadius: '0.5rem',
                  opacity: '1',
                }
          }
        >
          <div className="wrapper">
            {/*  */}
            <div className="leftPart">
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              {/*  */}
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              {/*  */}
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              {/*  */}
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              {/*  */}
            </div>
            {/*  */}
            <div className="separator">
              <p>|</p>
            </div>
            {/*  */}
            <div className="rightPart">
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume - Eng
              </a>
              {/*  */}
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume - Ar
              </a>
              {/*  */}
            </div>
            {/*  */}
          </div>
        </footer>
        {/*  */}
      </div>
      {/*  */}
      {isCyberListOpen && (
        <CyberList
          isCyberListOpen={isCyberListOpen}
          toggleCyberList={toggleCyberList}
        />
      )}
      {isWebListOpen && (
        <WebList isWebListOpen={isWebListOpen} toggleWebList={toggleWebList} />
      )}
    </main>
  );
}
