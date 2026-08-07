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
      <div className="cyberContainer">
        <h4 className="cyberTitle">Securing Systems & Networks</h4>
        <ol className="cyberOrder">
          <li>Prevention for Advanced Digital attacks</li>
          <li>Design Secure own System</li>
          <li>Prevent outside attacks using VPN & load balancing</li>
          <li>Design PFSense Firewall network</li>
          <li>Make your secure lab</li>
        </ol>
      </div>
      <div className="cyberContainer">
        <h4 className="cyberTitle">Cryptography & Stegnography</h4>
        <ol className="cyberOrder">
          <li>Avoiding Malware Detections-100% FUD</li>
          <li>Cryptting service</li>
          <li>Stenography</li>
        </ol>
      </div>
      {activeList || isContactFormOpen ? (
        <button className="extrasDisabled">Extras</button>
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
