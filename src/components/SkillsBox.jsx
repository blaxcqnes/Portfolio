import { useState, useEffect, useRef } from 'react';
import { skillsOne, skillsTwo } from '../data/skillsBox';
import SkillsList from './SkillsList';

export default function SkillsBox({
  isContactFormOpen,
  activeList,
  setActiveList,
  pauseOne,
  playOne,
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
    if (!timeLeft && skillPage <= 1) {
      setSkillPage((prev) => prev + 1);
      setTimeLeft(15);
    }
    if (!timeLeft && skillPage >= 2) {
      setSkillPage((prev) => prev - 1);
      setTimeLeft(15);
    }
  }, [isPaused, timeLeft, skillPage]);

  function pausePlay() {
    setIsPaused((prev) => !prev);
  }

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
      >
        <div className="titleAndButton">
          <p className="title">Skills</p>
          {activeList || isContactFormOpen ? (
            <button
              className="fluency"
              style={{
                pointerEvents:
                  activeList || isContactFormOpen ? 'none' : 'auto',
              }}
              disabled
            >
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

        {skillPage === 1 &&
          skillsOne.map((skillsOne) => (
            <div className={skillsOne.classSkillsContainer} key={skillsOne.id}>
              <h4 className={skillsOne.classSkillsTitle}>{skillsOne.title}</h4>
              <ol className={skillsOne.classSkillsOrder}>
                <li>{skillsOne.valueOne}</li>
                <li>{skillsOne.valueTwo}</li>
                <li>{skillsOne.valueThree}</li>
                <li>{skillsOne.valueFour}</li>
              </ol>
            </div>
          ))}

        {skillPage === 2 &&
          skillsTwo.map((skillsTwo) => (
            <div className={skillsTwo.classSkillsContainer} key={skillsTwo.id}>
              <h4 className={skillsTwo.classSkillsTitle}>{skillsTwo.title}</h4>
              <ol className={skillsTwo.classSkillsOrder}>
                <li>{skillsTwo.valueOne}</li>
                <li>{skillsTwo.valueTwo}</li>
                <li>{skillsTwo.valueThree}</li>
                <li>{skillsTwo.valueFour}</li>
              </ol>
            </div>
          ))}

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

          {!isContactFormOpen || !activeList ? (
            <div
              className="pausePlay"
              onClick={pausePlay}
              style={{
                opacity: activeList || isContactFormOpen ? 0 : 1,
                backgroundImage: isPaused
                  ? `url(${playOne})`
                  : `url(${pauseOne})`,
              }}
            ></div>
          ) : undefined}
        </div>
      </div>

      {largeLandscape || largePortrait
        ? undefined
        : mobileScreens &&
          activeList === 'skillsList' && (
            <SkillsList
              isContactFormOpen={isContactFormOpen}
              activeList={activeList}
              setActiveList={setActiveList}
            />
          )}
    </div>
  );
}
