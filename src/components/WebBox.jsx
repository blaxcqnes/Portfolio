import { useState, useEffect, useRef, act } from 'react';
import WebList from './WebList';

export default function WebBox({
  kaffa,
  veila,
  guessGame,
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleWebList,
  mobileScreens,
  largeLandscape,
  largePortrait,
}) {
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  //
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselData = [
    {
      id: 1,
      src: kaffa,
      className: 'activeImg',
      url: 'https://example.com',
    },
    {
      id: 2,
      src: veila,
      className: 'activeImg',
      url: 'https://example.com',
    },
    {
      id: 3,
      src: guessGame,
      className: 'activeImg',
      url: 'https://example.com',
    },
  ];
  //
  const currentItem = carouselData[currentIndex];
  //
  const isInitialLoad = useRef(true);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [glow, setGlow] = useState(6);
  //
  const [nextImg, setNextImg] = useState(1);

  // Initial delay only runs once on page start
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isInitialLoad.current = false;
    }, 7000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Related to loader animation delay and glow effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      timerRef.current = setInterval(() => {
        setGlow((prev) => {
          if (prev <= 0) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    });

    return () => {
      clearTimeout(timeoutId);
      clearInterval(timerRef.current);
    };
  }, []);

  // Related to web timer
  useEffect(() => {
    if (isPaused || isContactFormOpen || activeList) return;

    const timerId = setInterval(() => {
      if (isInitialLoad.current) return;

      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCurrentIndex((i) => (i + 1) % carouselData.length);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isPaused, isContactFormOpen, activeList, carouselData.length]);

  // Carousel images auto scroll
  useEffect(() => {
    if (isPaused) return;

    const container = containerRef.current;
    const targetImage = imageRefs.current[currentIndex];

    if (container && targetImage) {
      const scrollPosition =
        targetImage.offsetTop -
        container.clientHeight / 2 +
        targetImage.clientHeight / 2;

      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [isPaused, nextImg, currentIndex]);

  return (
    <div className="webAndWebList">
      <div
        key={timeLeft - { glow }}
        className="webBox"
        style={{
          ...(activeList || isContactFormOpen
            ? {
                filter:
                  'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
              }
            : null),
          animation:
            activeList || isContactFormOpen
              ? undefined
              : glow
                ? 'webBox 0.5s linear 1'
                : !glow && timeLeft === 5 && 'webAlternate 1s ease 1',
        }}
        onPointerEnter={() => setIsPaused(true)}
        onPointerLeave={() => setIsPaused(false)}
      >
        <p className="title">Web Dev. Projects</p>
        <div
          ref={containerRef}
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
          {carouselData.map((item, index) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={
                isPaused || activeList || isContactFormOpen
                  ? 'linkActive'
                  : index === currentIndex
                    ? 'linkActive'
                    : 'linkNonActive'
              }
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              style={{
                scrollSnapAlign:
                  isPaused || isContactFormOpen || activeList
                    ? 'unset'
                    : 'start',
                pointerEvents:
                  isContactFormOpen || activeList ? 'none' : 'auto',
              }}
            >
              <img src={item.src} fetchPriority="high" />
            </a>
          ))}
        </div>
        {activeList || isContactFormOpen ? (
          <button className="moreDisabled">More</button>
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

        <div
          className="nextWebLoader"
          style={{
            ...(timeLeft === 5
              ? { animation: 'nextWebLoader 1s linear 1' }
              : undefined),
          }}
        >
          <div
            className="nextWebOval"
            style={{
              ...(glow || isPaused
                ? { animation: 'nextWebStops 1s linear 1' }
                : { animation: 'nextWebOval 1.5s linear infinite' }),
              ...(activeList || isContactFormOpen || glow || isPaused
                ? { animation: 'nextWebGlow 3s linear infinite' }
                : undefined),
            }}
          ></div>

          {!glow && (
            <div
              className="nextWebTimer"
              style={{
                opacity: activeList || isContactFormOpen || isPaused ? 0 : 1,
                ...(!activeList && !isContactFormOpen && timeLeft
                  ? { animation: 'nextWebTimer 1s linear 1' }
                  : undefined),
              }}
            >
              {timeLeft}
            </div>
          )}
        </div>
      </div>
      {largeLandscape || largePortrait
        ? undefined
        : mobileScreens &&
          activeList === 'webList' && <WebList setActiveList={setActiveList} />}
    </div>
  );
}
