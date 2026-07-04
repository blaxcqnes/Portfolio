import LeftOrUpperPart from './LeftOrUpperPart';
import RightOrLowerPart from './RightOrLowerPart';

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
  classType,
}) {
  return (
    <main
      className="mainContent"
      onClick={isContactFormOpen ? toggleContactForm : undefined}
    >
      <LeftOrUpperPart
        isContactFormOpen={isContactFormOpen}
        isSkillListOpen={isSkillListOpen}
        isEducationListOpen={isEducationListOpen}
        isCyberListOpen={isCyberListOpen}
        isWebListOpen={isWebListOpen}
        classType={classType}
        //
        toggleContactForm={toggleContactForm}
        toggleSkillList={toggleSkillList}
        toggleEducationList={toggleEducationList}
        toggleCyberList={toggleCyberList}
        toggleWebList={toggleWebList}
      />
      <RightOrLowerPart
        isContactFormOpen={isContactFormOpen}
        isSkillListOpen={isSkillListOpen}
        isEducationListOpen={isEducationListOpen}
        isCyberListOpen={isCyberListOpen}
        isWebListOpen={isWebListOpen}
        classType={classType}
        //
        toggleSkillList={toggleSkillList}
        toggleEducationList={toggleEducationList}
        toggleCyberList={toggleCyberList}
        toggleWebList={toggleWebList}
      />
    </main>
  );
}
