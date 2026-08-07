export default function MainImage({ me, isContactFormOpen, activeList }) {
  return (
    <div className="imageAndTitle">
      <img
        src={me}
        className="mainImage"
        fetchPriority="high"
        style={
          activeList || isContactFormOpen
            ? {
                filter:
                  'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
              }
            : null
        }
      />
      <p
        className="title"
        style={
          activeList || isContactFormOpen
            ? {
                filter:
                  'opacity(0.5) grayscale(10%) blur(0.05rem) brightness(80%)',
              }
            : null
        }
      >
        Cybersecurity Specialist & Web Developer
      </p>
    </div>
  );
}
