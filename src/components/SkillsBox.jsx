import { useState, useEffect, useRef } from 'react';
import SkillsList from './SkillsList';

export default function SkillsBox({
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleSkillsList,
  closeList,
  mobileScreens,
  largeLandscape,
  largePortrait,
}) {
  const timerRef = useRef(null);
  const isInitialLoad = useRef(true);
  //
  const [timeLeft, setTimeLeft] = useState(15);
  const [animationDelay, setAnimationDelay] = useState(6);
  //
  const [skillPage, setSkillPage] = useState(1);

  // Related to skills timer
  useEffect(() => {
    let timerId;
    let timeoutId;

    const startTimer = () => {
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (isContactFormOpen || activeList) {
            return prev;
          }
          if (prev <= 0) {
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    };

    if (isInitialLoad.current) {
      timeoutId = setTimeout(() => {
        startTimer();
        isInitialLoad.current = false;
      }, 6000);
    } else {
      startTimer();
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(timerId);
    };
  }, [isContactFormOpen, activeList]);

  // Related to loader animation delay and glow effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      timerRef.current = setInterval(() => {
        setAnimationDelay((prev) => {
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

  // Related to the skills auto page change
  useEffect(() => {
    if (timeLeft === 0 && skillPage <= 2) {
      setSkillPage((prev) => prev + 1);
      setTimeLeft(15);
    }
    if (skillPage >= 3) return setSkillPage(1);
  }, [timeLeft]);

  return (
    <div className="skillsAndSkillsList">
      <div
        key={timeLeft - { animationDelay }}
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
              : animationDelay
                ? 'skillsBox 0.5s linear 1'
                : !animationDelay &&
                  timeLeft === 15 &&
                  'skillsAlternate 1s ease 1',
        }}
      >
        <div className="titleAndButton">
          <p className="title">Skills</p>
          {activeList || isContactFormOpen ? (
            <button className="fluencyDisabled" onClick={closeList}>
              Fluency
            </button>
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
              opacity: activeList || isContactFormOpen ? 0 : 1,
              ...(animationDelay
                ? { animation: 'nextSkillsStops 1s linear 1' }
                : { animation: 'nextSkillsOval 1.5s linear infinite' }),
              ...(!activeList && !isContactFormOpen && animationDelay
                ? { animation: 'nextSkillsGlow 3s linear infinite' }
                : undefined),
            }}
          ></div>

          {!animationDelay && (
            <div
              className="nextSkillsTimer"
              style={{
                opacity: activeList || isContactFormOpen ? 0 : 1,
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
