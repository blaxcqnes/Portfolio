import me from '../images/mainContent_leftOrUpperPart/me.jpg';
import meLight from '../images/mainContent_leftOrUpperPart/meLight.jpg';
import ContactFormMobile from './ContaceFormMobile';
import SkillList from './SkillList';
import EducationList from './EducationList';

export default function LeftOrUpperPart({
  isLightModeOn,
  isContactFormOpen,
  isContactFormMobileOpen,
  isSkillListOpen,
  isEducationListOpen,
  isCyberListOpen,
  isWebListOpen,
  toggleContactFormMobile,
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
    if (isContactFormMobileOpen) {
      toggleContactFormMobile();
    } else if (isSkillListOpen) {
      toggleSkillList();
    } else if (isEducationListOpen) {
      toggleEducationList();
    }
  }
  return (
    <main
      className={isLightModeOn ? 'leftOrUpperPartLight' : 'leftOrUpperPart'}
      onClick={handleClick}
    >
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
          <div className={isLightModeOn ? 'aboutMeLight' : 'aboutMe'}>
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
            <div className="locationAndContactForm">
              <p className="locationForSmallerScreens">Riyadh, Saudi Arabia</p>

              {classType || isContactFormOpen ? (
                <button className="contact" disabled>
                  Contact
                </button>
              ) : (
                <button
                  className="contact"
                  onClick={
                    !isContactFormMobileOpen
                      ? toggleContactFormMobile
                      : undefined
                  }
                >
                  Contact
                </button>
              )}
            </div>
          </div>
          {/*  */}
          <div
            className={
              isLightModeOn ? 'forSmallerScreensLight' : 'forSmallerScreens'
            }
          >
            {isLightModeOn ? (
              <img src={meLight} className="smallerImgLight" />
            ) : (
              <img src={me} className="smallerImg" />
            )}
            <p>Cybersecurity Professional & Web Developer</p>
          </div>
          {/*  */}
          {isLightModeOn ? (
            <img src={meLight} className="regularImgLight" />
          ) : (
            <img src={me} className="regularImg" />
          )}
          {/*  */}
        </section>

        <section
          className={
            isEducationListOpen
              ? 'skillsAndEducationSwapped'
              : 'skillsAndEducation'
          }
        >
          <div className={isLightModeOn ? 'skillsLight' : 'skills'}>
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
          <div
            className={isLightModeOn ? 'educationLight' : 'education'}
            id="education"
          >
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
      {isContactFormMobileOpen && (
        <ContactFormMobile
          isContactFormMobileOpen={isContactFormMobileOpen}
          toggleContactFormMobile={toggleContactFormMobile}
        />
      )}
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
