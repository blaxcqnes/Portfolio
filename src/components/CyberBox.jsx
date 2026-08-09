import { cyberOne, cyberTwo } from '../data/cyberBox';
export default function CyberBox({
  isContactFormOpen,
  activeList,
  toggleCyberList,
}) {
  return (
    <div
      className="cyberBox"
      style={
        activeList || isContactFormOpen
          ? {
              filter:
                'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
            }
          : null
      }
    >
      <p className="title">Cybersecurity Projects</p>
      {cyberOne.map((cyberOne) => (
        <div className={cyberOne.classCyberContainer} key={cyberOne.id}>
          <h4 className={cyberOne.classCyberTitle}>{cyberOne.title}</h4>
          <ol className={cyberOne.classCyberOrder}>
            <li>{cyberOne.valueOne}</li>
            <li>{cyberOne.valueTwo}</li>
            <li>{cyberOne.valueThree}</li>
            <li>{cyberOne.valueFour}</li>
            <li>{cyberOne.valueFive}</li>
          </ol>
        </div>
      ))}
      {cyberTwo.map((cyberTwo) => (
        <div className={cyberTwo.classCyberContainer} key={cyberTwo.id}>
          <h4 className={cyberTwo.classCyberTitle}>{cyberTwo.title}</h4>
          <ol className={cyberTwo.classCyberOrder}>
            <li>{cyberTwo.valueOne}</li>
            <li>{cyberTwo.valueTwo}</li>
            <li>{cyberTwo.valueThree}</li>
          </ol>
        </div>
      ))}
      {activeList || isContactFormOpen ? (
        <button
          className="extras"
          style={{
            pointerEvents: activeList || isContactFormOpen ? 'none' : 'auto',
          }}
          disabled
        >
          Extras
        </button>
      ) : (
        <button
          className="extras"
          onClick={(e) => {
            e.stopPropagation();
            toggleCyberList();
          }}
        >
          Extras
        </button>
      )}
    </div>
  );
}
