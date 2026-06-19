export default function WebList({ isWebListOpen, toggleWebList }) {
  return (
    <main className="webList" id="webList">
      <div className="titleAndButton">
        <h4>More</h4>
        <button
          className="close"
          onClick={isWebListOpen ? toggleWebList : undefined}
        >
          Close
        </button>
      </div>
      <div className="content"></div>
    </main>
  );
}
