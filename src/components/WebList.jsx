export default function WebList({ toggleWebList }) {
  return (
    <main className="webList" id="webList">
      <div className="titleAndButton">
        <h4>More</h4>
        <button className="close" onClick={toggleWebList}>
          Close
        </button>
      </div>
      <div className="content"></div>
    </main>
  );
}
