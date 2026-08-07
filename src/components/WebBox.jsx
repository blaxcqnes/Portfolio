import WebList from './WebList';
export default function WebBox({
  kaffa,
  veila,
  guessGame,
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleWebList,
  closeList,
  mobileScreens,
  largeLandscape,
  largePortrait,
}) {
  return (
    <div className="webAndWebList">
      <div
        className="webBox"
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
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="firstImg"
          >
            <img src={kaffa} fetchPriority="high" />
          </a>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="secondImg"
          >
            <img src={veila} fetchPriority="high" />
          </a>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="thirdImg"
          >
            <img src={guessGame} fetchPriority="high" />
          </a>
        </div>
        {activeList || isContactFormOpen ? (
          <button className="moreDisabled" onClick={closeList}>
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
      </div>
      {largeLandscape || largePortrait
        ? undefined
        : mobileScreens &&
          activeList === 'webList' && <WebList setActiveList={setActiveList} />}
    </div>
  );
}
