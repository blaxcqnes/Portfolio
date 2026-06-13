import LeftOrUpperPart from './LeftOrUpperPart';
import RightOrLowerPart from './RightOrLowerPart';

export default function MainContent({
  isLightModeOn,
  isContactFormOpen,
  isContactFormMobileOpen,
  isSkillListOpen,
  isEducationListOpen,
  isCyberListOpen,
  isWebListOpen,
  toggleLightMode,
  toggleContactForm,
  toggleContactFormMobile,
  toggleSkillList,
  toggleEducationList,
  toggleCyberList,
  toggleWebList,
  classType,
}) {
  return (
    <main
      className={isLightModeOn ? 'mainContentLight' : 'mainContent'}
      onClick={isContactFormOpen ? toggleContactForm : undefined}
      style={{
        transform: classType || isContactFormOpen ? 'scale(0.98)' : 'scale(1)',
      }}
    >
      <LeftOrUpperPart
        isLightModeOn={isLightModeOn}
        isContactFormOpen={isContactFormOpen}
        isContactFormMobileOpen={isContactFormMobileOpen}
        isSkillListOpen={isSkillListOpen}
        isEducationListOpen={isEducationListOpen}
        isCyberListOpen={isCyberListOpen}
        isWebListOpen={isWebListOpen}
        classType={classType}
        //
        toggleLightMode={toggleLightMode}
        toggleContactForm={toggleContactForm}
        toggleContactFormMobile={toggleContactFormMobile}
        toggleSkillList={toggleSkillList}
        toggleEducationList={toggleEducationList}
        toggleCyberList={toggleCyberList}
        toggleWebList={toggleWebList}
      />
      <RightOrLowerPart
        isLightModeOn={isLightModeOn}
        isContactFormOpen={isContactFormOpen}
        isContactFormMobileOpen={isContactFormMobileOpen}
        isSkillListOpen={isSkillListOpen}
        isEducationListOpen={isEducationListOpen}
        isCyberListOpen={isCyberListOpen}
        isWebListOpen={isWebListOpen}
        classType={classType}
        //
        toggleLightMode={toggleLightMode}
        toggleContactFormMobile={toggleContactFormMobile}
        toggleSkillList={toggleSkillList}
        toggleEducationList={toggleEducationList}
        toggleCyberList={toggleCyberList}
        toggleWebList={toggleWebList}
      />
    </main>
  );
}
