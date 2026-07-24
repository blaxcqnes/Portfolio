import { useState, useEffect } from 'react';
export default function CyberList({ toggleCyberList }) {
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setPageNumber(2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setPageNumber(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function previous() {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
  }

  function next() {
    if (pageNumber < 2) setPageNumber((prev) => prev + 1);
  }

  return (
    <main className="cyberList" id="cyberList">
      <div className="titleAndButton">
        <h4>Extras</h4>
        <button className="close" onClick={toggleCyberList}>
          Close
        </button>
      </div>
      <div className="content">
        {pageNumber < 2 ? (
          <button className="previousDisabled" disabled>
            &lt;
          </button>
        ) : (
          <button className="previous" onClick={previous}>
            &lt;
          </button>
        )}

        {/*  */}

        {pageNumber > 1 ? (
          <button className="nextDisabled" disabled>
            &gt;
          </button>
        ) : (
          <button className="next" onClick={next}>
            &gt;
          </button>
        )}

        <p>{pageNumber} / 2</p>
      </div>
    </main>
  );
}
