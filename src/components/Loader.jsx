export default function Loader({ progress }) {
  return (
    <div className="loaderContainer">
      {/*  */}
      <div className="loader">
        {/*  */}
        <div className="spinnerBrown"></div>
        {/*  */}
        <p className="percentage">{progress}%</p>
        {/*  */}
        <div className="spinnerOlive"></div>
      </div>
      {/*  */}
      <p className="disclaimer">Loading Components</p>
      {/*  */}
    </div>
  );
}
