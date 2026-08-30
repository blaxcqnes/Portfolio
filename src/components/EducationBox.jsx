import EducationList from './EducationList';

export default function EducationBox({
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleEducationList,
  mobileScreens,
  largeLandscape,
  largePortrait,
}) {
  return (
    <div className="educationAndEducationList">
      <div
        className="educationBox"
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
          <p className="title">Education</p>
          {activeList || isContactFormOpen ? (
            <button
              className="courses"
              style={{
                pointerEvents:
                  activeList || isContactFormOpen ? 'none' : 'auto',
                backgroundColor: '#1e1e1e',
                boxShadow: 'unset',
              }}
              disabled
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

        <div className="educationContainer">
          <div className="institutionAndDegree">
            <span className="wrapper">
              <h4 className="institution">Ozone Int. School</h4>
              <p className="location">- RUH, KSA</p>
            </span>
            <p className="degree">High School - 2015</p>
          </div>

          <div className="institutionAndDegree">
            <span className="wrapper">
              <h4 className="institution">Osmania University</h4>
              <p className="location">- HYD, INDIA</p>
            </span>
            <p className="degree">Bachelors of Science (B.Sc - MSCS) - 2020</p>
          </div>

          <div className="institutionAndDegree">
            <span className="wrapper">
              <h4 className="institution">RKDF University</h4>
              <p className="location">- BHO, INDIA</p>
            </span>
            <p className="degree">
              Masters of Computer Applicptions (MCA) - 2025
            </p>
          </div>
        </div>
      </div>

      {largeLandscape || largePortrait
        ? undefined
        : mobileScreens &&
          activeList === 'educationList' && (
            <EducationList
              isContactFormOpen={isContactFormOpen}
              activeList={activeList}
              setActiveList={setActiveList}
            />
          )}
    </div>
  );
}
