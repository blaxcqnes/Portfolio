export default function EstimatesList({ setActiveList }) {
  return (
    <main
      className="estimatesList"
      id="estimatesList"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="titleAndButton">
        <h4>Estimates</h4>
        <button
          className="close"
          onClick={(e) => {
            e.stopPropagation();
            setActiveList(false);
          }}
        >
          Close
        </button>
      </div>
      <div className="content"></div>
    </main>
  );
}
