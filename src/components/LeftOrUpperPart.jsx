import { useState, useEffect } from 'react';
import SkillList from './SkillList';
import EducationList from './EducationList';

export default function LeftOrUpperPart({
  me,
  isContactFormOpen,
  isSkillListOpen,
  isEducationListOpen,
  isCyberListOpen,
  isWebListOpen,
  toggleSkillList,
  toggleEducationList,
  toggleCyberList,
  toggleWebList,
  classType,
}) {
  function handleClick() {
    if (isCyberListOpen) {
      toggleCyberList();
    } else if (isWebListOpen) {
      toggleWebList();
    }
  }

  function closeLists() {
    if (isSkillListOpen) {
      toggleSkillList();
    } else if (isEducationListOpen) {
      toggleEducationList();
    }
  }

  const [isNarrowScreen, setIsNarrowScreen] = useState(
    () => window.matchMedia('(max-width: 600px)').matches,
  );

  useEffect(() => {
    const mediaWatcher = window.matchMedia('(max-width: 600px)');

    const updateScreen = (e) => setIsNarrowScreen(e.matches);
    mediaWatcher.addEventListener('change', updateScreen);

    return () => mediaWatcher.removeEventListener('change', updateScreen);
  }, []);

  return (
    <main className="leftOrUpperPart" onClick={handleClick}>
      {/*  */}
      <div
        className={
          classType || isContactFormOpen
            ? 'leftOrUpperPartContainerUnfocused'
            : 'leftOrUpperPartContainer'
        }
        onClick={closeLists}
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

        <section
          className={
            isNarrowScreen && isEducationListOpen
              ? 'skillsAndEducationSwapped'
              : 'skillsAndEducation'
          }
        >
          <div className="skills">
            {/*  */}
            <div className="titleAndButton">
              <p className="title">Skills</p>
              {classType || isContactFormOpen ? (
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
              {classType || isContactFormOpen ? (
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
      {/* {isContactFormMobileOpen && (
        <ContactFormMobile
          isContactFormMobileOpen={isContactFormMobileOpen}
          toggleContactFormMobile={toggleContactFormMobile}
        />
      )} */}
      {/*  */}
      {isEducationListOpen && (
        <EducationList
          isEducationListOpen={isEducationListOpen}
          toggleEducationList={toggleEducationList}
        />
      )}
      {isSkillListOpen && (
        <SkillList
          isSkillListOpen={isSkillListOpen}
          toggleSkillList={toggleSkillList}
        />
      )}
    </main>
  );
}
