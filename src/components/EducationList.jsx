export default function EducationList({
  isEducationListOpen,
  toggleEducationList,
}) {
  return (
    <main className="educationList" id="educationList">
      <div className="titleAndButton">
        <h4>Courses</h4>
        <button
          className="close"
          onClick={isEducationListOpen ? toggleEducationList : undefined}
        >
          Close
        </button>
      </div>
    </main>
  );
}
