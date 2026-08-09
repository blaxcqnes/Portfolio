import { useState, useEffect, useRef } from 'react';
import SkillsList from './SkillsList';

export default function SkillsBox({
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleSkillsList,
  mobileScreens,
  largeLandscape,
  largePortrait,
}) {
  const timerRef = useRef(null);
  const isInitialLoad = useRef(true);
  //
  const [timeLeft, setTimeLeft] = useState(15);
  const [isPaused, setIsPaused] = useState(false);
  const [glow, setGlow] = useState(6);
  //
  const [skillPage, setSkillPage] = useState(1);

  // Initial delay only runs once on page start
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isInitialLoad.current = false;
    }, 7000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Related to skills timer
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

  // Related to the skills auto page change
  useEffect(() => {
    if (!timeLeft && skillPage <= 1) {
      setSkillPage((prev) => prev + 1);
      setTimeLeft(15);
    }
    if (!timeLeft && skillPage >= 2) {
      setSkillPage((prev) => prev - 1);
      setTimeLeft(15);
    }
  }, [timeLeft, skillPage]);

  return (
    <div className="skillsAndSkillsList">
      <div
        key={timeLeft - { glow }}
        className="skillsBox"
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
                ? 'skillsBox 0.5s linear 1'
                : !glow && timeLeft === 15 && 'skillsAlternate 1s ease 1',
        }}
        onPointerEnter={() => setIsPaused(true)}
        onPointerLeave={() => setIsPaused(false)}
      >
        <div className="titleAndButton">
          <p className="title">Skills</p>
          {activeList || isContactFormOpen ? (
            <button className="fluencyDisabled">Fluency</button>
          ) : (
            <button
              className="fluency"
              onClick={(e) => {
                e.stopPropagation();
                toggleSkillsList();
              }}
            >
              Fluency
            </button>
          )}
        </div>

        {skillPage === 1 && (
          <div className="skillsContainer">
            <h4 className="skillsTitle">Cybersecurity</h4>
            <ol className="skillsOrder">
              <li>WireShark</li>
              <li>Nmap</li>
              <li>Metasploit</li>
              <li>Burp Suite</li>
            </ol>
          </div>
        )}

        {skillPage === 2 && (
          <div className="skillsContainer">
            <h4 className="skillsTitle">Web Development</h4>
            <ol className="skillsOrder">
              <li>HTML</li>
              <li>CSS & SCSS</li>
              <li>JavaScript</li>
              <li>React</li>
            </ol>
          </div>
        )}

        <div
          className="nextSkillsLoader"
          style={{
            ...(timeLeft === 15
              ? { animation: 'nextSkillsLoader 1s linear 1' }
              : undefined),
          }}
        >
          <div
            className="nextSkillsOval"
            style={{
              ...(glow || isPaused
                ? { animation: 'nextSkillsStops 1s linear 1' }
                : { animation: 'nextSkillsOval 1.5s linear infinite' }),
              ...(activeList || isContactFormOpen || glow || isPaused
                ? { animation: 'nextSkillsGlow 3s linear infinite' }
                : undefined),
            }}
          ></div>

          {!glow && (
            <div
              className="nextSkillsTimer"
              style={{
                opacity: activeList || isContactFormOpen || isPaused ? 0 : 1,
                visibility:
                  activeList || isContactFormOpen || isPaused
                    ? 'hidden'
                    : 'visible',
                ...(!activeList && !isContactFormOpen && timeLeft
                  ? { animation: 'nextSkillsTimer 1s linear 1' }
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
          activeList === 'skillsList' && (
            <SkillsList setActiveList={setActiveList} />
          )}
    </div>
  );
}
