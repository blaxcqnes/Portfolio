import EstimatesList from './EstimatesList';

export default function DescriptionBox({
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleEstimatesList,
  mobileScreens,
  largeLandscape,
  largePortrait,
}) {
  return (
    <div className="descriptionAndEstimatesList">
      <div
        className="descriptionBox"
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
          {(mobileScreens && activeList) ||
          (mobileScreens && isContactFormOpen) ? undefined : (largeLandscape &&
              activeList) ||
            (largeLandscape && isContactFormOpen) ||
            (largePortrait && activeList) ||
            (largePortrait && isContactFormOpen) ||
            activeList ||
            isContactFormOpen ? (
            <button
              className="estimates"
              style={{
                pointerEvents:
                  activeList || isContactFormOpen ? 'none' : 'auto',
              }}
              disabled
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

        <p className="description">
          Highly results-oriented Cybersecurity Specialist who designs and
          builds websites while keeping them safe. I deliver robust solutions by
          performing security assessments and implementing measures to protect
          sensitive data, all while providing highly optimised and responsive
          digital user experiences.
        </p>

        <div className="locationAndEstimatesButton">
          <p className="location">Riyadh, Saudi Arabia</p>
          {activeList || isContactFormOpen ? (
            <button
              className="estimates"
              style={{
                pointerEvents:
                  activeList || isContactFormOpen ? 'none' : 'auto',
              }}
              disabled
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
      </div>

      {largeLandscape || largePortrait ? undefined : mobileScreens &&
        activeList === 'estimatesList' ? (
        <EstimatesList setActiveList={setActiveList} />
      ) : undefined}
    </div>
  );
}
