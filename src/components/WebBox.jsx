import { useState, useEffect, useRef, act } from 'react';
import { carousel } from '../data/webBox';
import WebList from './WebList';

export default function WebBox({
  pauseTwo,
  playTwo,
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
  //
  const isInitialLoad = useRef(true);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [glow, setGlow] = useState(6);

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
          if (!prev) {
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

  // Related to images auto scroll timer
  useEffect(() => {
    if (isPaused || isContactFormOpen || activeList) return;

    const timerId = setInterval(() => {
      if (isInitialLoad.current) return;

      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCurrentIndex((i) => (i + 1) % carousel.length);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isPaused, isContactFormOpen, activeList, carousel.length]);

  // Prevents timer from reseting after clicking pause button
  useEffect(() => {
    if (isPaused) return;
    if (!timeLeft) return;
  }, [isPaused, timeLeft]);

  // Carousel images auto scroll logic
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
  }, [isPaused, currentIndex]);

  function pausePlay() {
    setIsPaused((prev) => !prev);
  }

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
          {carousel.map((item, index) => (
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
                transform:
                  isPaused || activeList || isContactFormOpen
                    ? 'none'
                    : undefined,
              }}
            >
              <img src={item.src} fetchPriority="high" />
            </a>
          ))}
        </div>
        {activeList || isContactFormOpen ? (
          <button
            className="more"
            style={{
              pointerEvents: activeList || isContactFormOpen ? 'none' : 'auto',
              backgroundColor: '#1e1e1e',
              boxShadow: 'unset',
            }}
            disabled
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

        <div className="nextWebLoader">
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
                visibility:
                  activeList || isContactFormOpen || isPaused
                    ? 'hidden'
                    : 'visible',
                ...(!activeList && !isContactFormOpen && timeLeft && !isPaused
                  ? { animation: 'nextWebTimer 1s linear 1' }
                  : undefined),
              }}
            >
              {timeLeft}
            </div>
          )}

          {!isContactFormOpen || !activeList ? (
            <div
              className="pausePlay"
              onClick={pausePlay}
              fetchPriority="high"
              style={{
                opacity: activeList || isContactFormOpen || glow ? 0 : 1,
                pointerEvents:
                  activeList || isContactFormOpen || glow ? 'none' : 'auto',
                backgroundImage: isPaused
                  ? `url(${playTwo})`
                  : `url(${pauseTwo})`,
              }}
            ></div>
          ) : undefined}
        </div>
      </div>
      {largeLandscape || largePortrait
        ? undefined
        : mobileScreens &&
          activeList === 'webList' && (
            <WebList
              isContactFormOpen={isContactFormOpen}
              activeList={activeList}
              setActiveList={setActiveList}
            />
          )}
    </div>
  );
}
