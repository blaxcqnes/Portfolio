import kaffa from '../images/mainContent_rightOrLowerPart/kaffa.png';
import veila from '../images/mainContent_rightOrLowerPart/veila.png';
import guessGame from '../images/mainContent_rightOrLowerPart/guessGame.png';
import CyberList from './CyberList';
import WebList from './WebList';

export default function RightOrLowerPart({
  isContactFormOpen,
  isSkillListOpen,
  isEducationListOpen,
  isCyberListOpen,
  isWebListOpen,
  toggleSkillList,
  toggleEducationList,
  toggleCyberList,
  toggleWebList,
  classType,
}) {
  function handleClick() {
    if (isSkillListOpen) {
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
    <main className="rightOrLowerPart" onClick={handleClick}>
      {/*  */}
      <div
        className={
          classType
            ? 'rightOrLowerPartContainerUnfocused'
            : 'rightOrLowerPartContainer'
        }
      >
        <section
          className={isWebListOpen ? 'projectsSwapped' : 'projects'}
          onClick={closeLists}
        >
          {/*  */}
          <div className="cyber">
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
            {isContactFormOpen ||
            isSkillListOpen ||
            isEducationListOpen ||
            isCyberListOpen ||
            isWebListOpen ? (
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
          <div className="web">
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
            {isContactFormOpen ||
            isSkillListOpen ||
            isEducationListOpen ||
            isCyberListOpen ||
            isWebListOpen ? (
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
          className={
            isCyberListOpen || isWebListOpen ? 'footerHidden' : 'footer'
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
