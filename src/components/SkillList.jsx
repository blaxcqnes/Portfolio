export default function SkillList({ isSkillListOpen, toggleSkillList }) {
  return (
    <main className="skillList" id="skillList">
      <div className="titleAndButton">
        <h4>Fluency</h4>
        <button
          className="close"
          onClick={isSkillListOpen ? toggleSkillList : undefined}
        >
          Close
        </button>
      </div>
      <div className="content"></div>
    </main>
  );
}
