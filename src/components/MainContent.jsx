import LeftOrUpperPart from './LeftOrUpperPart';
import RightOrLowerPart from './RightOrLowerPart';
import me from '../images/mainContent_leftOrUpperPart/me.jpg';
import kaffa from '../images/mainContent_rightOrLowerPart/kaffa.png';
import veila from '../images/mainContent_rightOrLowerPart/veila.png';
import guessGame from '../images/mainContent_rightOrLowerPart/guessGame.png';

export default function MainContent({
  isContactFormOpen,
  isSkillListOpen,
  isEducationListOpen,
  isCyberListOpen,
  isWebListOpen,
  toggleContactForm,
  toggleSkillList,
  toggleEducationList,
  toggleCyberList,
  toggleWebList,
  activeList,
}) {
  return (
    <main
      className="mainContent"
      onClick={isContactFormOpen ? toggleContactForm : undefined}
    >
      <LeftOrUpperPart
        me={me}
        isContactFormOpen={isContactFormOpen}
        isSkillListOpen={isSkillListOpen}
        isEducationListOpen={isEducationListOpen}
        isCyberListOpen={isCyberListOpen}
        isWebListOpen={isWebListOpen}
        activeList={activeList}
        //
        toggleContactForm={toggleContactForm}
        toggleSkillList={toggleSkillList}
        toggleEducationList={toggleEducationList}
        toggleCyberList={toggleCyberList}
        toggleWebList={toggleWebList}
      />
      <RightOrLowerPart
        kaffa={kaffa}
        veila={veila}
        guessGame={guessGame}
        isContactFormOpen={isContactFormOpen}
        isSkillListOpen={isSkillListOpen}
        isEducationListOpen={isEducationListOpen}
        isCyberListOpen={isCyberListOpen}
        isWebListOpen={isWebListOpen}
        activeList={activeList}
        //
        toggleSkillList={toggleSkillList}
        toggleEducationList={toggleEducationList}
        toggleCyberList={toggleCyberList}
        toggleWebList={toggleWebList}
      />
    </main>
  );
}

MainContent.assets = [me, kaffa, veila, guessGame];
