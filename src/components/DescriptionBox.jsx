import ServicesList from './ServicesList';

export default function DescriptionBox({
  select,
  remove,
  reset,
  download,
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleServicesList,
  mobileScreens,
  largeLandscape,
  largePortrait,
}) {
  return (
    <div className="descriptionAndServicesList">
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
              className="services"
              style={{
                pointerEvents:
                  activeList || isContactFormOpen ? 'none' : 'auto',
                backgroundColor: '#1e1e1e',
                boxShadow: 'unset',
              }}
              disabled
            >
              Services
            </button>
          ) : (
            <button
              className="services"
              onClick={(e) => {
                e.stopPropagation();
                toggleServicesList();
              }}
            >
              Services
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

        <div className="locationAndServicesButton">
          <p className="location">Riyadh, Saudi Arabia</p>
          {activeList || isContactFormOpen ? (
            <button
              className="services"
              style={{
                pointerEvents:
                  activeList || isContactFormOpen ? 'none' : 'auto',
                backgroundColor: '#1e1e1e',
                boxShadow: 'unset',
              }}
              disabled
            >
              Services
            </button>
          ) : (
            <button
              className="services"
              onClick={(e) => {
                e.stopPropagation();
                toggleServicesList();
              }}
            >
              Services
            </button>
          )}
        </div>
      </div>

      {/* Services list appears below width: 600px for smaller portrait screens */}
      {largeLandscape || largePortrait ? undefined : mobileScreens &&
        activeList === 'servicesList' ? (
        <ServicesList
          setActiveList={setActiveList}
          select={select}
          remove={remove}
          reset={reset}
          download={download}
        />
      ) : undefined}
    </div>
  );
}
