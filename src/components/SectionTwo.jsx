import { useSyncExternalStore, useCallback } from 'react';
import EstimatesList from './EstimatesList';
import CyberBox from './CyberBox';
import CyberList from './CyberList';
import WebBox from './WebBox';
import WebList from './WebList';
import Footer from './Footer';

export default function SectionTwo({
  kaffa,
  veila,
  guessGame,
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

  const largeForEstimatesLandscape = useMediaQuery(
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
      {largeForEstimatesLandscape && activeList === 'estimatesList' && (
        <EstimatesList setActiveList={setActiveList} />
      )}
      <div
        className="projectsAndFooter"
        style={
          largeForEstimatesLandscape && activeList === 'estimatesList'
            ? {
                position: 'absolute',
                transform: 'scale(90%)',
                animation: 'estimatesActive 0.2s linear 1',
              }
            : null
        }
      >
        <section className="projects">
          <CyberBox
            isContactFormOpen={isContactFormOpen}
            activeList={activeList}
            toggleCyberList={toggleCyberList}
          />

          <WebBox
            kaffa={kaffa}
            veila={veila}
            guessGame={guessGame}
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
        <CyberList setActiveList={setActiveList} />
      )}

      {((largePortrait && activeList === 'webList') ||
        (largeLandscape && activeList === 'webList')) && (
        <WebList setActiveList={setActiveList} />
      )}
    </main>
  );
}
