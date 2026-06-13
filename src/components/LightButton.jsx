export default function LightButton({ isLightModeOn, toggleLightMode }) {
  return (
    <div
      className={!isLightModeOn ? 'lightButton' : 'darkButton'}
      onClick={toggleLightMode}
    >
      {!isLightModeOn ? (
        <div className="light"></div>
      ) : (
        <div className="dark"></div>
      )}
    </div>
  );
}
