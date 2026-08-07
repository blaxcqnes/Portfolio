import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import me from '../images/mainContent_leftOrUpperPart/me.jpg';
import kaffa from '../images/mainContent_rightOrLowerPart/kaffa.jpg';
import veila from '../images/mainContent_rightOrLowerPart/veila.jpg';
import guessGame from '../images/mainContent_rightOrLowerPart/guessGame.jpg';

export default function MainContent({
  isContactFormOpen,
  activeList,
  setActiveList,
  toggleEstimatesList,
  toggleSkillsList,
  toggleEducationList,
  toggleCyberList,
  toggleWebList,
}) {
  return (
    <main className="mainContent">
      <SectionOne
        me={me}
        isContactFormOpen={isContactFormOpen}
        activeList={activeList}
        setActiveList={setActiveList}
        //
        toggleEstimatesList={toggleEstimatesList}
        toggleSkillsList={toggleSkillsList}
        toggleEducationList={toggleEducationList}
      />
      <SectionTwo
        kaffa={kaffa}
        veila={veila}
        guessGame={guessGame}
        isContactFormOpen={isContactFormOpen}
        activeList={activeList}
        setActiveList={setActiveList}
        //
        toggleEstimatesList={toggleEstimatesList}
        toggleCyberList={toggleCyberList}
        toggleWebList={toggleWebList}
      />
    </main>
  );
}

MainContent.assets = [me, kaffa, veila, guessGame];
