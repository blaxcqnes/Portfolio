export default function CyberList({ toggleCyberList }) {
  return (
    <main className="cyberList" id="cyberList">
      <div className="titleAndButton">
        <h4>Extras</h4>
        <button className="close" onClick={toggleCyberList}>
          Close
        </button>
      </div>
      <div className="content"></div>
    </main>
  );
}
