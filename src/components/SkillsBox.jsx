import { useState, useEffect, useRef } from 'react';
import { skillsOne, skillsTwo } from '../data/skillsBox';
import SkillsList from './SkillsList';

export default function SkillsBox({
  isContactFormOpen,
  activeList,
  setActiveList,
  nextOne,
  previousOne,
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
  const [timeLeft, setTimeLeft] = useState(10);
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
          return 10;
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
      setTimeLeft(10);
    }
    if (!timeLeft && skillPage >= 2) {
      setSkillPage((prev) => prev - 1);
      setTimeLeft(10);
    }
  }, [isPaused, timeLeft, skillPage]);

  function pausePlay() {
    setIsPaused((prev) => !prev);
  }

  function next() {
    if (skillPage <= 1) {
      setSkillPage((prev) => prev + 1);
      setIsPaused(true);
      setTimeLeft(10);
    }
  }

  function previous() {
    if (skillPage >= 2) {
      setSkillPage((prev) => prev - 1);
      setIsPaused(true);
      setTimeLeft(10);
    }
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
                : !glow && timeLeft === 10 && 'skillsAlternate 1s ease 1',
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
                backgroundColor: '#1e1e1e',
                boxShadow: 'unset',
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
              <div className={skillsOne.classListContainer}>
                <ol className={skillsOne.classSkillsOrder}>
                  <li>{skillsOne.valueOne}</li>
                  <li>{skillsOne.valueTwo}</li>
                  <li>{skillsOne.valueThree}</li>
                  <li>{skillsOne.valueFour}</li>
                </ol>
                <ol className={skillsOne.classSkillsOrder}>
                  <li>{skillsOne.valueFive}</li>
                  <li>{skillsOne.valueSix}</li>
                  <li>{skillsOne.valueSeven}</li>
                  <li>{skillsOne.valueEight}</li>
                </ol>
              </div>
            </div>
          ))}

        {skillPage === 2 &&
          skillsTwo.map((skillsTwo) => (
            <div className={skillsTwo.classSkillsContainer} key={skillsTwo.id}>
              <h4 className={skillsTwo.classSkillsTitle}>{skillsTwo.title}</h4>
              <div className={skillsTwo.classListContainer}>
                <ol className={skillsTwo.classSkillsOrder}>
                  <li>{skillsTwo.valueOne}</li>
                  <li>{skillsTwo.valueTwo}</li>
                  <li>{skillsTwo.valueThree}</li>
                  <li>{skillsTwo.valueFour}</li>
                </ol>
                <ol className={skillsTwo.classSkillsOrder}>
                  <li>{skillsTwo.valueOne}</li>
                  <li>{skillsTwo.valueTwo}</li>
                  <li>{skillsTwo.valueThree}</li>
                  <li>{skillsTwo.valueFour}</li>
                </ol>
              </div>
            </div>
          ))}

        <div className="pages">
          {!isContactFormOpen || !activeList ? (
            <img
              className="previousOne"
              onClick={skillPage <= 1 ? undefined : previous}
              src={previousOne}
              style={{
                opacity:
                  activeList || isContactFormOpen || glow
                    ? 0
                    : skillPage <= 1
                      ? 0.5
                      : 1,

                pointerEvents:
                  activeList || isContactFormOpen || glow || skillPage <= 1
                    ? 'none'
                    : 'auto',
              }}
              fetchPriority="high"
            />
          ) : undefined}
          <p
            className="pageNumber"
            style={{
              opacity: activeList || isContactFormOpen || glow ? 0 : 1,
            }}
          >
            {skillPage} / 2
          </p>
          {!isContactFormOpen || !activeList ? (
            <img
              className="nextOne"
              onClick={skillPage >= 2 ? undefined : next}
              src={nextOne}
              style={{
                opacity:
                  activeList || isContactFormOpen || glow
                    ? 0
                    : skillPage >= 2
                      ? 0.5
                      : 1,
                pointerEvents:
                  activeList || isContactFormOpen || glow || skillPage >= 2
                    ? 'none'
                    : 'auto',
              }}
              fetchPriority="high"
            />
          ) : undefined}
        </div>
        <div className="nextSkillsLoader">
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
                ...(!activeList && !isContactFormOpen && timeLeft && !isPaused
                  ? { animation: 'nextSkillsTimerVisible 1s linear 1' }
                  : { animation: 'nextSkillsTimerHidden 0.2s linear 1' }),
              }}
            >
              {timeLeft}
            </div>
          )}

          {!isContactFormOpen || !activeList ? (
            <img
              className="pausePlay"
              onClick={pausePlay}
              src={isPaused ? playOne : pauseOne}
              style={{
                opacity: activeList || isContactFormOpen || glow ? 0 : 1,
                pointerEvents:
                  activeList || isContactFormOpen || glow ? 'none' : 'auto',
              }}
              fetchPriority="high"
            />
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
