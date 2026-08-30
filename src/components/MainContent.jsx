import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import me from '../images/sectionOne/me.jpg';
import kaffa from '../images/sectionTwo/kaffa.jpg';
import veila from '../images/sectionTwo/veila.jpg';
import guessGame from '../images/sectionTwo/guessGame.jpg';
import pauseOne from '../images/sectionOne/svgs/pause.svg';
import playOne from '../images/sectionOne/svgs/play.svg';
import pauseTwo from '../images/sectionTwo/svgs/pause.svg';
import playTwo from '../images/sectionTwo/svgs/play.svg';

export default function MainContent({
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleServicesList,
  toggleSkillsList,
  toggleEducationList,
  toggleCyberList,
  toggleWebList,
}) {
  return (
    <main className="mainContent">
      <SectionOne
        me={me}
        pauseOne={pauseOne}
        playOne={playOne}
        isContactFormOpen={isContactFormOpen}
        activeList={activeList}
        setActiveList={setActiveList}
        //
        toggleServicesList={toggleServicesList}
        toggleSkillsList={toggleSkillsList}
        toggleEducationList={toggleEducationList}
      />
      <SectionTwo
        kaffa={kaffa}
        veila={veila}
        guessGame={guessGame}
        pauseTwo={pauseTwo}
        playTwo={playTwo}
        isContactFormOpen={isContactFormOpen}
        activeList={activeList}
        setActiveList={setActiveList}
        //
        toggleServicesList={toggleServicesList}
        toggleCyberList={toggleCyberList}
        toggleWebList={toggleWebList}
      />
    </main>
  );
}

MainContent.assets = [
  me,
  kaffa,
  veila,
  guessGame,
  pauseOne,
  playOne,
  pauseTwo,
  playTwo,
];
