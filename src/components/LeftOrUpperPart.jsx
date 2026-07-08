import { useState, useLayoutEffect } from 'react';
import SkillList from './SkillList';
import EducationList from './EducationList';

export default function LeftOrUpperPart({
  me,
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleSkillList,
  toggleEducationList,
}) {
  function closeList() {
    if (activeList) {
      setActiveList(false);
    }
  }

  const [isNarrowScreen, setIsNarrowScreen] = useState(
    () => window.matchMedia('(max-width: 600px)').matches,
  );

  useLayoutEffect(() => {
    const mediaWatcher = window.matchMedia('(max-width: 600px)');

    const updateScreen = (e) => setIsNarrowScreen(e.matches);
    mediaWatcher.addEventListener('change', updateScreen);

    return () => mediaWatcher.removeEventListener('change', updateScreen);
  }, []);

  return (
    <main
      className="leftOrUpperPart"
      onClick={
        activeList === 'cyberList' || activeList === 'webList'
          ? closeList
          : undefined
      }
    >
      {/*  */}
      <div
        className="leftOrUpperPartContainer"
        id="leftOrUpperPartContainer"
        style={
          activeList || isContactFormOpen
            ? {
                filter:
                  'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
              }
            : null
        }
        onClick={closeList}
      >
        {/*  */}
        <section className="aboutMeAndImage">
          {/*  */}
          <div className="aboutMe">
            <p className="title">About Me</p>
            <p className="aboutMeDescription">
              Highly results-oriented Cybersecurity Analyst with knowledge and
              hands-on experience in network security principles, threat
              analysis, identifying vulnerabilities, performing security
              assessments, and implementing measures to protect sensitive data
              and systems.
              <br />
              <br />
              Web developer with high proficiency in coding, web app testing and
              designing.
            </p>
            <p className="locationForSmallerScreens">Riyadh, Saudi Arabia</p>
          </div>
          {/*  */}
          <div className="forSmallerScreens">
            <img src={me} className="smallerImg" loading="lazy" />
            <p>Cybersecurity Professional & Web Developer</p>
          </div>
          {/*  */}
          <img src={me} className="regularImg" loading="lazy" />
          {/*  */}
        </section>
        {/*  */}
        <section
          className="skillsAndEducation"
          style={
            isNarrowScreen && activeList === 'educationList'
              ? {
                  flexDirection: 'column',
                  rowGap: '1rem',
                  animation: 'skillsAndEducationSwapped 0.5s linear 1',
                }
              : undefined
          }
        >
          <div className="skills">
            {/*  */}
            <div className="titleAndButton">
              <p className="title">Skills</p>
              {activeList || isContactFormOpen ? (
                <button className="fluency" disabled>
                  Fluency
                </button>
              ) : (
                <button className="fluency" onClick={toggleSkillList}>
                  Fluency
                </button>
              )}
            </div>
            {/*  */}
            <p className="skillsDescription">
              HTML CSS & SCSS <br />
              JavaScript & React.js <br />
              <br />
              Ethical Hacking Fundamentals Network Security Threat Analysis &
              Risk Management OWASP TOP 10 Web Application Vulnerabilities
            </p>
            {/*  */}
          </div>
          {/*  */}
          <div className="education" id="education">
            {/*  */}
            <div className="titleAndButton">
              <p className="title">Education</p>
              {activeList || isContactFormOpen ? (
                <button className="courses" disabled>
                  Courses
                </button>
              ) : (
                <button className="courses" onClick={toggleEducationList}>
                  Courses
                </button>
              )}
            </div>
            {/*  */}
            <div className="allInOneEducation">
              <span className="wrapper">
                <h4>Ozone Int. School</h4>
                <p className="location">- RUH, KSA</p>
              </span>
              <p className="degree">High School - 2015</p>
            </div>
            {/*  */}
            <div className="allInOneEducation">
              <span className="wrapper">
                <h4>Osmania University</h4>
                <p className="location">- HYD, INDIA</p>
              </span>
              <p className="degree">
                Bachelor’s of Science (B.Sc. - MSCS) - 2020
              </p>
            </div>
            {/*  */}
            <div className="allInOneEducation">
              <span className="wrapper">
                <h4>RKDF University</h4>
                <p className="location">- BHO, INDIA</p>
              </span>
              <p className="degree">
                Master’s of Computer Applicptions (MCA) - 2025
              </p>
            </div>
            {/*  */}
          </div>
          {/*  */}
        </section>
        {/*  */}
      </div>
      {/*  */}
      {activeList === 'educationList' && (
        <EducationList toggleEducationList={toggleEducationList} />
      )}

      {activeList === 'skillList' && (
        <SkillList toggleSkillList={toggleSkillList} />
      )}
    </main>
  );
}
