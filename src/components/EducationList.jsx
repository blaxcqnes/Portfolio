export default function EducationList({ toggleEducationList }) {
  return (
    <main className="educationList" id="educationList">
      <div className="titleAndButton">
        <h4>Courses</h4>
        <button className="close" onClick={toggleEducationList}>
          Close
        </button>
      </div>
      <div className="content"></div>
    </main>
  );
}
