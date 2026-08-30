import { useSyncExternalStore, useCallback } from 'react';
import MainImage from './MainImage';
import DescriptionBox from './DescriptionBox';
import ServicesList from './ServicesList';
import SkillsBox from './SkillsBox';
import SkillsList from './SkillsList';
import EducationBox from './EducationBox';
import EducationList from './EducationList';

export default function SectionOne({
  me,
  pauseOne,
  playOne,
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleServicesList,
  toggleSkillsList,
  toggleEducationList,
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

  const mobileScreens = useMediaQuery('(max-width: 599.9px)');
  const largeForServicesLandscape = useMediaQuery(
    '(orientation: landscape) and (min-width: 600px) and (max-width: 1023px)',
  );
  const largeLandscape = useMediaQuery(
    '(orientation: landscape) and (min-width: 600px)',
  );
  const largePortrait = useMediaQuery(
    '(orientation: portrait) and (min-width: 600px)',
  );

  return (
    <main className="sectionOne">
      <section className="bio">
        <div className="imageAndDescription">
          <MainImage
            me={me}
            isContactFormOpen={isContactFormOpen}
            activeList={activeList}
          />

          <DescriptionBox
            isContactFormOpen={isContactFormOpen}
            activeList={activeList}
            setActiveList={setActiveList}
            toggleServicesList={toggleServicesList}
            mobileScreens={mobileScreens}
            largeLandscape={largeLandscape}
            largePortrait={largePortrait}
          />
        </div>

        {/* Services list appears above width: 600px for larger portrait screens */}
        {((largePortrait && activeList === 'servicesList') ||
          (largeForServicesLandscape && activeList === 'servicesList')) && (
          <ServicesList setActiveList={setActiveList} />
        )}
      </section>

      <section className="skillsAndEducation">
        <SkillsBox
          isContactFormOpen={isContactFormOpen}
          activeList={activeList}
          setActiveList={setActiveList}
          pauseOne={pauseOne}
          playOne={playOne}
          toggleSkillsList={toggleSkillsList}
          mobileScreens={mobileScreens}
          largeLandscape={largeLandscape}
          largePortrait={largePortrait}
        />

        <EducationBox
          isContactFormOpen={isContactFormOpen}
          activeList={activeList}
          setActiveList={setActiveList}
          toggleEducationList={toggleEducationList}
          mobileScreens={mobileScreens}
          largeLandscape={largeLandscape}
          largePortrait={largePortrait}
        />
      </section>

      {((largePortrait && activeList === 'skillsList') ||
        (largeLandscape && activeList === 'skillsList')) && (
        <SkillsList
          isContactFormOpen={isContactFormOpen}
          activeList={activeList}
          setActiveList={setActiveList}
        />
      )}

      {((largePortrait && activeList === 'educationList') ||
        (largeLandscape && activeList === 'educationList')) && (
        <EducationList
          isContactFormOpen={isContactFormOpen}
          activeList={activeList}
          setActiveList={setActiveList}
        />
      )}
    </main>
  );
}
