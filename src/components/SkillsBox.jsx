import { useState, useEffect } from 'react';
import SkillsList from './SkillsList';

export default function SkillsBox({
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleSkillsList,
  closeList,
  mobileScreens,
  largeLandscape,
  largePortrait
}) {

  const [timeLeft, setTimeLeft] = useState(15);
  const [skillPage, setSkillPage] = useState(1);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (isContactFormOpen || activeList) {
          return 15;
        }
        if (prevTime <= 0) {
          return 15;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isContactFormOpen, activeList]);

  useEffect(() => {
    if (timeLeft === 0 && skillPage <= 2) {
      setSkillPage(prev => prev + 1);
      setTimeLeft(15);
    } if (skillPage >= 3) return setSkillPage(1);
  }, [timeLeft])

  return (
    <div className="skillsAndSkillsList">
      <div
        className="skillsBox"
        style={
          activeList || isContactFormOpen
            ? {
              filter:
                'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
            }
            : null
        }
      >

        <div className="titleAndButton">
          <p className="title">Skills</p>
          {activeList || isContactFormOpen ? (
            <button
              className="fluencyDisabled"
              onClick={closeList}
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

        {skillPage === 1 && (<div className="skillsContainer">
          <h4 className="skillsTitle">Cybersecurity</h4>
          <ol className="skillsOrder">
            <li>Ethical Hacking Fundamentals</li>
            <li>Network Security</li>
            <li>Threat Analysis & Risk Management</li>
            <li>OWASP TOP 10 Web Application Vulnerabilities</li>
          </ol>
        </div>)}

        {skillPage === 2 && (<div className="skillsContainer">
          <h4 className="skillsTitle">Web Development</h4>
          <ol className="skillsOrder">
            <li>HTML</li>
            <li>CSS</li>
            <li>SCSS</li>
            <li>JavaScript</li>
            <li>React.js</li>
          </ol>
        </div>)}

        <div
          className="nextSkillsLoader"
          style={{
            ...(timeLeft === 15 ? { animation: 'nextSkillsLoader 1s linear 1' } : {}),
            display: activeList || isContactFormOpen ? 'none' : 'flex'
          }}>

          <div className="nextSkillsOval" style={timeLeft === 0 ? { animation: 'nextSkillsStops 1s linear 1' } : { animation: 'nextSkillsOval 1.5s linear infinite' }}></div>

          <div className='nextSkillsTimer' style={timeLeft === 0 ? { animation: 'nextSkillsTimer 1s linear 1' } : {}}>{timeLeft}</div>
        </div>
      </div>

      {(largeLandscape || largePortrait) ? undefined : (mobileScreens && activeList === 'skillsList') && (
        <SkillsList setActiveList={setActiveList} />)}
    </div>
  )
}