import { useSyncExternalStore, useCallback } from 'react';
import ServicesList from './ServicesList';
import CyberBox from './CyberBox';
import CyberList from './CyberList';
import WebBox from './WebBox';
import WebList from './WebList';
import Footer from './Footer';

export default function SectionTwo({
  kaffa,
  veila,
  guessGame,
  pauseTwo,
  playTwo,
  select,
  remove,
  reset,
  download,
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleCyberList,
  toggleWebList,
}) {
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

  const largeForServicesLandscape = useMediaQuery(
    '(orientation: landscape) and (min-width: 1023px)',
  );
  const mobileScreens = useMediaQuery('(max-width: 599.9px)');
  const largeLandscape = useMediaQuery(
    '(orientation: landscape) and (min-width: 600px)',
  );
  const largePortrait = useMediaQuery(
    '(orientation: portrait) and (min-width: 600px)',
  );

  return (
    <main className="sectionTwo">
      {largeForServicesLandscape && activeList === 'servicesList' && (
        <ServicesList
          setActiveList={setActiveList}
          select={select}
          remove={remove}
          reset={reset}
          download={download}
        />
      )}
      <div
        className="projectsAndFooter"
        style={
          largeForServicesLandscape && activeList === 'servicesList'
            ? {
                position: 'absolute',
                transform: 'scale(90%)',
                animation: 'servicesActive 0.2s linear 1',
              }
            : null
        }
      >
        <section className="projects">
          <CyberBox
            pauseTwo={pauseTwo}
            playTwo={playTwo}
            isContactFormOpen={isContactFormOpen}
            activeList={activeList}
            toggleCyberList={toggleCyberList}
          />

          <WebBox
            kaffa={kaffa}
            veila={veila}
            guessGame={guessGame}
            pauseTwo={pauseTwo}
            playTwo={playTwo}
            isContactFormOpen={isContactFormOpen}
            activeList={activeList}
            setActiveList={setActiveList}
            toggleWebList={toggleWebList}
            mobileScreens={mobileScreens}
            largeLandscape={largeLandscape}
            largePortrait={largePortrait}
          />
        </section>

        <Footer
          isContactFormOpen={isContactFormOpen}
          activeList={activeList}
          mobileScreens={mobileScreens}
        />
      </div>

      {activeList === 'cyberList' && (
        <CyberList
          isContactFormOpen={isContactFormOpen}
          activeList={activeList}
          setActiveList={setActiveList}
        />
      )}

      {((largePortrait && activeList === 'webList') ||
        (largeLandscape && activeList === 'webList')) && (
        <WebList
          isContactFormOpen={isContactFormOpen}
          activeList={activeList}
          setActiveList={setActiveList}
        />
      )}
    </main>
  );
}
