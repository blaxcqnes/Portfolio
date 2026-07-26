import { useSyncExternalStore, useCallback } from 'react';
import EstimatesList from './EstimatesList';
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

  function useMediaQuery(query) {
    const subscribe = useCallback(
      (callback) => {
        const matchMedia = window.matchMedia(query);
        matchMedia.addEventListener('change', callback);
        return () => matchMedia.removeEventListener('change', callback);
      },
      [query],
    );

    const getSnapshot = () => window.matchMedia(query).matches;

    return useSyncExternalStore(subscribe, getSnapshot);
  }

  const mobileScreens = useMediaQuery('(max-width: 600px)');
  const exactMobileWidth = useMediaQuery('(width: 600px)');
  const tabAndLargeScreensLandscape = useMediaQuery(
    '(orientation: landscape) and (min-width: 600px)',
  );
  const tabAndLargeScreensPortrait = useMediaQuery(
    '(orientation: portrait) and (min-width: 600px)',
  );
  const largeScreensLandscape = useMediaQuery(
    '(orientation: landscape) and (min-width: 1023px)',
  );

  return (
    <main className="rightOrLowerPart" onClick={closeList}>
      {/*  */}
      {largeScreensLandscape && activeList === 'estimatesList' && (
        <EstimatesList setActiveList={setActiveList} />
      )}
      {/*  */}
      <div
        className="rightOrLowerPartContainer"
        style={
          largeScreensLandscape && activeList === 'estimatesList'
            ? {
                position: 'absolute',
                transform: 'scale(90%)',
                animation: 'estimatesActive 0.2s linear 1',
              }
            : null
        }
        onClick={closeList}
      >
        {/*  */}
        <section className="projects">
          {/*  */}
          <div
            className="cyber"
            style={
              activeList || isContactFormOpen
                ? {
                    filter:
                      'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
                  }
                : null
            }
          >
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
              <button className="unfocusedProjectsButtons" onClick={closeList}>
                Extras
              </button>
            ) : (
              <button
                className="extras"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCyberList();
                }}
              >
                Extras
              </button>
            )}
            {/*  */}
          </div>
          {/*  */}
          <div className="webAndWebList">
            <div
              className="web"
              style={
                activeList || isContactFormOpen
                  ? {
                      filter:
                        'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
                    }
                  : null
              }
            >
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
                  <img src={kaffa} fetchPriority="high" />
                </a>
                {/*  */}
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondImg"
                >
                  <img src={veila} fetchPriority="high" />
                </a>
                {/*  */}
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="thirdImg"
                >
                  <img src={guessGame} fetchPriority="high" />
                </a>
                {/*  */}
              </div>
              {/*  */}
              {activeList || isContactFormOpen ? (
                <button
                  className="unfocusedProjectsButtons"
                  onClick={closeList}
                >
                  More
                </button>
              ) : (
                <button
                  className="more"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWebList();
                  }}
                >
                  More
                </button>
              )}
              {/*  */}
            </div>
            {/*  */}
            {(exactMobileWidth && activeList === 'webList'
              ? undefined
              : mobileScreens && activeList === 'webList') && (
              <WebList setActiveList={setActiveList} />
            )}
            {/*  */}
          </div>
          {/*  */}
        </section>
        {/*  */}
        <footer
          className="footer"
          style={{
            ...(activeList === 'cyberList' || activeList === 'webList'
              ? {
                  display: 'none',
                  width: '100%',
                  height: '0',
                  padding: '0',
                  borderRadius: '0',
                  animation: 'footerHidden 0.5s linear 1',
                  transition: 'all 0.2s ease',
                  opacity: '0',
                }
              : undefined),
            ...(activeList || isContactFormOpen
              ? {
                  filter:
                    'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
                }
              : null),
          }}
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
      {((exactMobileWidth && activeList === 'cyberList') ||
        (mobileScreens && activeList === 'cyberList') ||
        (tabAndLargeScreensPortrait && activeList === 'cyberList') ||
        (tabAndLargeScreensLandscape && activeList === 'cyberList')) && (
        <CyberList setActiveList={setActiveList} />
      )}

      {((exactMobileWidth && activeList === 'webList') ||
        (mobileScreens && activeList === 'webList') ||
        (tabAndLargeScreensPortrait && activeList === 'webList') ||
        (tabAndLargeScreensLandscape && activeList === 'webList')) && (
        <WebList setActiveList={setActiveList} />
      )}
    </main>
  );
}
