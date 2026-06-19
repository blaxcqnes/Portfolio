export default function SkillList({ toggleSkillList }) {
  return (
    <main className="skillList" id="skillList">
      <div className="titleAndButton">
        <h4>Fluency</h4>
        <button className="close" onClick={toggleSkillList}>
          Close
        </button>
      </div>
      <div className="content"></div>
    </main>
  );
}
