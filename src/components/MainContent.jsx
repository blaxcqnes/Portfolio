import LeftOrUpperPart from './LeftOrUpperPart';
import RightOrLowerPart from './RightOrLowerPart';
import me from '../images/mainContent_leftOrUpperPart/me.jpg';
import kaffa from '../images/mainContent_rightOrLowerPart/kaffa.png';
import veila from '../images/mainContent_rightOrLowerPart/veila.png';
import guessGame from '../images/mainContent_rightOrLowerPart/guessGame.png';

export default function MainContent({
  isContactFormOpen,
  toggleContactForm,
  toggleSkillList,
  toggleEducationList,
  toggleCyberList,
  toggleWebList,
  activeList,
  setActiveList,
}) {
  return (
    <main
      className="mainContent"
      onClick={isContactFormOpen ? toggleContactForm : undefined}
    >
      <LeftOrUpperPart
        me={me}
        isContactFormOpen={isContactFormOpen}
        activeList={activeList}
        setActiveList={setActiveList}
        //
        toggleSkillList={toggleSkillList}
        toggleEducationList={toggleEducationList}
      />
      <RightOrLowerPart
        kaffa={kaffa}
        veila={veila}
        guessGame={guessGame}
        isContactFormOpen={isContactFormOpen}
        activeList={activeList}
        setActiveList={setActiveList}
        //
        toggleCyberList={toggleCyberList}
        toggleWebList={toggleWebList}
      />
    </main>
  );
}

MainContent.assets = [me, kaffa, veila, guessGame];
