import { useSyncExternalStore, useCallback } from 'react';
import EstimatesList from './EstimatesList';
import SkillsList from './SkillsList';
import EducationList from './EducationList';

export default function LeftOrUpperPart({
  me,
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleEstimatesList,
  toggleSkillsList,
  toggleEducationList,
}) {
  function closeList() {
    if (activeList) {
      setActiveList(false);
    }
  }

  function useMediaQuery(query) {
    const subscribe = useCallback(
      (callback) => {
        const matchMedia = window.matchMedia(query);
        matchMedia.addEventListener('change', callback);
        return () => matchMedia.removeEventListener('change', callback);
      },
      [query],
    );

    const getSnapshot = () => window.matchMedia(query).matches;

    return useSyncExternalStore(subscribe, getSnapshot);
  }
  const mobileScreens = useMediaQuery('(max-width: 600px)');
  const exactMobileWidth = useMediaQuery('(width: 600px)');
  const tabAndLargeScreensLandscape = useMediaQuery(
    '(orientation: landscape) and (min-width: 600px)',
  );
  const tabAndLargeScreensPortrait = useMediaQuery(
    '(orientation: portrait) and (min-width: 600px)',
  );
  //
  const tabsForEstimatesLandscape = useMediaQuery(
    '(orientation: landscape) and (min-width: 600px) and (max-width: 1023px)',
  );
  const portraitForEstimates = useMediaQuery(
    '(orientation: portrait) and (min-width: 600px)',
  );

  return (
    <main className="leftOrUpperPart" onClick={closeList}>
      {/*  */}
      <section className="aboutMeAndImagesAndEstimatesList">
        <div className="aboutMeAndImage">
          {/*  */}
          <div className="forSmallerScreens">
            <img
              src={me}
              className="smallerImg"
              fetchPriority="high"
              style={
                activeList || isContactFormOpen
                  ? {
                      filter:
                        'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
                    }
                  : null
              }
            />
            <p
              style={
                activeList || isContactFormOpen
                  ? {
                      filter:
                        'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
                    }
                  : null
              }
            >
              Cybersecurity Specialist & Web Developer
            </p>
          </div>
          {/*  */}
          <img
            src={me}
            className="regularImg"
            fetchPriority="high"
            style={
              activeList || isContactFormOpen
                ? {
                    filter:
                      'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
                  }
                : null
            }
          />
          {/*  */}
          <div className="aboutMeAndEstimatesList">
            <div
              className="aboutMe"
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
                <p className="title">About Me</p>
                {activeList || isContactFormOpen ? (
                  <button
                    className="unfocusedAboutMeAndImageButtons"
                    onClick={closeList}
                  >
                    Estimates
                  </button>
                ) : (
                  <button
                    className="estimates"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEstimatesList();
                    }}
                  >
                    Estimates
                  </button>
                )}
              </div>
              <p className="aboutMeDescription">
                Highly results-oriented Cybersecurity Specialist who designs and
                builds websites while keeping them safe. I deliver robust
                solutions by performing security assessments and implementing
                measures to protect sensitive data, all while providing highly
                optimised and responsive digital user experiences.
              </p>
              <p className="locationForSmallerScreens">Riyadh, Saudi Arabia</p>
            </div>
            {/*  */}
            {!exactMobileWidth &&
              mobileScreens &&
              activeList === 'estimatesList' && (
                <EstimatesList setActiveList={setActiveList} />
              )}
            {/*  */}
          </div>
          {/*  */}
        </div>
        {((exactMobileWidth && activeList === 'estimatesList') ||
          (portraitForEstimates && activeList === 'estimatesList') ||
          (tabsForEstimatesLandscape && activeList === 'estimatesList')) && (
          <EstimatesList setActiveList={setActiveList} />
        )}

        {/*  */}
      </section>
      {/*  */}
      <section className="skillsAndEducation">
        {/*  */}
        <div className="skillsAndSkillsList">
          <div
            className="skills"
            style={
              activeList || isContactFormOpen
                ? {
                    filter:
                      'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
                  }
                : null
            }
          >
            {/*  */}
            <div className="titleAndButton">
              <p className="title">Skills</p>
              {activeList || isContactFormOpen ? (
                <button
                  className="unfocusedSkillsAndEducationButtons"
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
            <p className="skillsDescription">
              HTML CSS & SCSS <br />
              JavaScript & React.js <br />
              <br />
              Ethical Hacking Fundamentals Network Security Threat Analysis &
              Risk Management OWASP TOP 10 Web Application Vulnerabilities
            </p>
          </div>
          {/*  */}
          {(exactMobileWidth && activeList === 'skillsList'
            ? undefined
            : mobileScreens && activeList === 'skillsList') && (
            <SkillsList setActiveList={setActiveList} />
          )}
        </div>
        <div className="educationAndEducationList">
          <div
            className="education"
            id="education"
            style={
              activeList || isContactFormOpen
                ? {
                    filter:
                      'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
                  }
                : null
            }
          >
            {/*  */}
            <div className="titleAndButton">
              <p className="title">Education</p>
              {activeList || isContactFormOpen ? (
                <button
                  className="unfocusedSkillsAndEducationButtons"
                  onClick={closeList}
                >
                  Courses
                </button>
              ) : (
                <button
                  className="courses"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleEducationList();
                  }}
                >
                  Courses
                </button>
              )}
            </div>
            {/*  */}
            <div className="allInOneEducationContainer">
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
            </div>
            {/*  */}
          </div>
          {/*  */}
          {(exactMobileWidth && activeList === 'educationList'
            ? undefined
            : mobileScreens && activeList === 'educationList') && (
            <EducationList setActiveList={setActiveList} />
          )}

          {/*  */}
        </div>
      </section>
      {/*  */}
      {((tabAndLargeScreensPortrait && activeList === 'skillsList') ||
        (tabAndLargeScreensLandscape && activeList === 'skillsList')) && (
        <SkillsList setActiveList={setActiveList} />
      )}
      {/*  */}
      {((tabAndLargeScreensPortrait && activeList === 'educationList') ||
        (tabAndLargeScreensLandscape && activeList === 'educationList')) && (
        <EducationList setActiveList={setActiveList} />
      )}
      {/*  */}
    </main>
  );
}
