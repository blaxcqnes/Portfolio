import { useState, useLayoutEffect } from 'react';
import CyberList from './CyberList';
import WebList from './WebList';

export default function RightOrLowerPart({
  kaffa,
  veila,
  guessGame,
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleCyberList,
  toggleWebList,
}) {
  function closeList() {
    if (activeList) {
      setActiveList(false);
    }
  }

  const [isNarrowScreen, setIsNarrowScreen] = useState(
    () => window.matchMedia('(max-width: 600px)').matches,
  );

  useLayoutEffect(() => {
    const mediaWatcher = window.matchMedia('(max-width: 600px)');

    const updateScreen = (e) => setIsNarrowScreen(e.matches);
    mediaWatcher.addEventListener('change', updateScreen);

    return () => mediaWatcher.removeEventListener('change', updateScreen);
  }, []);

  return (
    <main
      className="rightOrLowerPart"
      onClick={
        activeList === 'educationList' || activeList === 'skillList'
          ? closeList
          : undefined
      }
    >
      {/*  */}
      <div
        className="rightOrLowerPartContainer"
        id="rightOrLowerPartContainer"
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
        <section
          className="projects"
          style={
            isNarrowScreen && activeList === 'webList'
              ? {
                  flexDirection: 'column',
                  rowGap: '1rem',
                  animation: 'projectsSwapped 0.5s linear 1',
                }
              : undefined
          }
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
            {activeList || isContactFormOpen ? (
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
            <div
              className="carousel"
              style={
                activeList
                  ? {
                      overflowY: 'hidden',
                      overscrollBehaviorY: 'unset',
                    }
                  : undefined
              }
            >
              {/*  */}
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="firstImg"
              >
                <img src={kaffa} loading="lazy" />
              </a>
              {/*  */}
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="secondImg"
              >
                <img src={veila} loading="lazy" />
              </a>
              {/*  */}
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="thirdImg"
              >
                <img src={guessGame} loading="lazy" />
              </a>
              {/*  */}
            </div>
            {/*  */}
            {activeList || isContactFormOpen ? (
              <button className="more" disabled>
                More
              </button>
            ) : (
              <button className="more" onClick={toggleWebList}>
                More
              </button>
            )}
            {/*  */}
          </div>
          {/*  */}
        </section>
        {/*  */}
        <footer
          className="footer"
          style={
            activeList === 'cyberList' || activeList === 'webList'
              ? {
                  display: 'none',
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
                href="https://www.linkedin.com/in/blaxcqnes/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              {/*  */}
              <a
                href="https://github.com/blaxcqnes"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              {/*  */}
              <a>WhatsApp</a>
              {/*  */}
              <a
                href="https://www.instagram.com/blaxcqnes/"
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
      {activeList === 'cyberList' && (
        <CyberList toggleCyberList={toggleCyberList} />
      )}

      {activeList === 'webList' && <WebList toggleWebList={toggleWebList} />}
    </main>
  );
}
