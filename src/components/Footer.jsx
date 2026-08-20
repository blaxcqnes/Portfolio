export default function Footer({
  isContactFormOpen,
  activeList,
  mobileScreens,
}) {
  return (
    <footer
      className="footer"
      style={{
        ...(activeList === 'webList' && mobileScreens
          ? undefined
          : activeList === 'cyberList' || activeList === 'webList'
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
          : undefined),
      }}
    >
      <div className="wrapper">
        <div className="leftPart">
          <a
            href="https://www.linkedin.com/in/blaxcqnes/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              pointerEvents: activeList || isContactFormOpen ? 'none' : 'auto',
            }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/blaxcqnes"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              pointerEvents: activeList || isContactFormOpen ? 'none' : 'auto',
            }}
          >
            GitHub
          </a>
          <a href="https://wa.me/blaxcqnes"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              pointerEvents: activeList || isContactFormOpen ? 'none' : 'auto',
            }}>WhatsApp</a>
          <a
            href="https://www.instagram.com/blaxcqnes"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              pointerEvents: activeList || isContactFormOpen ? 'none' : 'auto',
            }}
          >
            Instagram
          </a>
        </div>
        <div className="separator">
          <p>|</p>
        </div>
        <div className="rightPart">
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              pointerEvents: activeList || isContactFormOpen ? 'none' : 'auto',
            }}
          >
            Resume - Eng
          </a>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              pointerEvents: activeList || isContactFormOpen ? 'none' : 'auto',
            }}
          >
            Resume - Ar
          </a>
        </div>
      </div>
    </footer>
  );
}
