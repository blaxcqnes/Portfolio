import { useState, useEffect, useRef } from 'react';
import { cyberOne, cyberTwo } from '../data/cyberBox';
export default function CyberBox({
  pauseTwo,
  playTwo,
  isContactFormOpen,
  activeList,
  toggleCyberList,
}) {
  const timerRef = useRef(null);
  const isInitialLoad = useRef(true);
  //
  const [timeLeft, setTimeLeft] = useState(15);
  const [isPaused, setIsPaused] = useState(false);
  const [glow, setGlow] = useState(6);
  //
  const [cyberPage, setCyberPage] = useState(1);

  // Initial delay only runs once on page start
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isInitialLoad.current = false;
    }, 7000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Related to glow animation
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

  // Related to skills timer
  useEffect(() => {
    if (isPaused || isContactFormOpen || activeList) return;

    const timerId = setInterval(() => {
      if (isInitialLoad.current) return;

      setTimeLeft((prev) => {
        if (!prev) {
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isPaused, isContactFormOpen, activeList]);

  // Prevents timer from reseting after clicking pause button
  useEffect(() => {
    if (isPaused) return;
    if (!timeLeft) return;
  }, [isPaused, timeLeft]);

  // Related to the skills auto page change
  useEffect(() => {
    if (isPaused) return;
    if (!timeLeft && cyberPage <= 1) {
      setCyberPage((prev) => prev + 1);
      setTimeLeft(15);
    }
    if (!timeLeft && cyberPage >= 2) {
      setCyberPage((prev) => prev - 1);
      setTimeLeft(15);
    }
  }, [isPaused, timeLeft, cyberPage]);

  function pausePlay() {
    setIsPaused((prev) => !prev);
  }
  return (
    <div
      className="cyberBox"
      key={timeLeft - { glow }}
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
              ? 'cyberBox 0.5s linear 1'
              : !glow && timeLeft === 15 && 'cyberAlternate 1s ease 1',
      }}
    >
      <p className="title">Cybersecurity Projects</p>
      {cyberPage === 1 && (
        <>
          {cyberOne.map((item) => (
            <div className={item.classCyberContainer} key={item.id}>
              <h4 className={item.classCyberTitle}>{item.title}</h4>
              <ol className={item.classCyberOrder}>
                <li>{item.valueOne}</li>
                <li>{item.valueTwo}</li>
                <li>{item.valueThree}</li>
                <li>{item.valueFour}</li>
                <li>{item.valueFive}</li>
              </ol>
            </div>
          ))}

          {cyberTwo.map((item) => (
            <div className={item.classCyberContainer} key={item.id}>
              <h4 className={item.classCyberTitle}>{item.title}</h4>
              <ol className={item.classCyberOrder}>
                <li>{item.valueOne}</li>
                <li>{item.valueTwo}</li>
                <li>{item.valueThree}</li>
              </ol>
            </div>
          ))}
        </>
      )}

      {cyberPage === 2 && (
        <>
          {cyberTwo.map((item) => (
            <div className={item.classCyberContainer} key={item.id}>
              <h4 className={item.classCyberTitle}>{item.title}</h4>
              <ol className={item.classCyberOrder}>
                <li>{item.valueOne}</li>
                <li>{item.valueTwo}</li>
                <li>{item.valueThree}</li>
              </ol>
            </div>
          ))}

          {cyberOne.map((item) => (
            <div className={item.classCyberContainer} key={item.id}>
              <h4 className={item.classCyberTitle}>{item.title}</h4>
              <ol className={item.classCyberOrder}>
                <li>{item.valueOne}</li>
                <li>{item.valueTwo}</li>
                <li>{item.valueThree}</li>
                <li>{item.valueFour}</li>
                <li>{item.valueFive}</li>
              </ol>
            </div>
          ))}
        </>
      )}

      {activeList || isContactFormOpen ? (
        <button
          className="extras"
          style={{
            pointerEvents: activeList || isContactFormOpen ? 'none' : 'auto',
            backgroundColor: '#1e1e1e',
            boxShadow: 'unset',
          }}
          disabled
        >
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

      <div className="nextCyberLoader">
        <div
          className="nextCyberOval"
          style={{
            ...(glow || isPaused
              ? { animation: 'nextCyberStops 1s linear 1' }
              : { animation: 'nextCyberOval 1.5s linear infinite' }),
            ...(activeList || isContactFormOpen || glow || isPaused
              ? { animation: 'nextCyberGlow 3s linear infinite' }
              : undefined),
          }}
        ></div>

        {!glow && (
          <div
            className="nextCyberTimer"
            style={{
              opacity: activeList || isContactFormOpen || isPaused ? 0 : 1,
              visibility:
                activeList || isContactFormOpen || isPaused
                  ? 'hidden'
                  : 'visible',
              ...(!activeList && !isContactFormOpen && timeLeft && !isPaused
                ? { animation: 'nextCyberTimer 1s linear 1' }
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
  );
}
