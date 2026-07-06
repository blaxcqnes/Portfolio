import { useState, useEffect } from 'react';
export default function EducationList({ toggleEducationList }) {
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
    <main className="educationList" id="educationList">
      <div className="titleAndButton">
        <h4>Courses</h4>
        <button className="close" onClick={toggleEducationList}>
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

        {pageNumber < 2 ? (
          <ol className="pageOne">
            <li>
              <span>Cybersecurity Professional</span> - (Hacker School - HYD,
              INDIA) - 2026
            </li>
            <li>
              <span>React</span> - (SCRIMBA) - 2026
            </li>
            <li>
              <span>Advanced React</span> - (SCRIMBA) - 2026
            </li>
            <li>
              <span>Backend Path</span> - (SCRIMBA) - 2026
            </li>
            <li>
              <span>SQL</span> - (SCRIMBA) - 2026
            </li>
          </ol>
        ) : (
          <ol className="pageTwo">
            <li>
              <span>Express.JS</span> - (SCRIMBA) - 2026
            </li>
            <li>
              <span>Node.JS</span> - (SCRIMBA) - 2026
            </li>
            <li>
              <span>FullStack Web Development</span> - (Udemy) - 2025
            </li>
            <li>
              <span>JavaScript</span> - (Udemy) - 2025
            </li>
            <li>
              <span>MongoDB</span> - (Udemy) - 2025
            </li>
          </ol>
        )}

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
