export default function CyberList({ isCyberListOpen, toggleCyberList }) {
  return (
    <main className="cyberList" id="cyberList">
      <div className="titleAndButton">
        <h4>Extras</h4>
        <button
          className="close"
          onClick={isCyberListOpen ? toggleCyberList : undefined}
        >
          Close
        </button>
      </div>
    </main>
  );
}
