export default function MainImage({ me, isContactFormOpen, activeList }) {
  const protectedImage = document.getElementById('me');

  protectedImage.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  });

  return (
    <div className="imageAndTitle">
      <img
        id="me"
        src={me}
        className="mainImage"
        fetchPriority="high"
        oncontextmenu="return false;"
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
