import { useState, useEffect, Fragment } from 'react';
import { pageOne, pageTwo } from '../data/educationList';
export default function EducationList({
  isContactFormOpen,
  activeList,
  setActiveList,
}) {
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
    <main
      className="educationList"
      id="educationList"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="titleAndButton">
        <h4>Courses</h4>
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
      <div className="content">
        {pageNumber < 2 ? (
          <button
            className="previous"
            style={{
              ...(activeList || isContactFormOpen
                ? {
                    pointerEvents: 'none',
                    backgroundColor: '#1e1e1e',
                    boxShadow: 'unset',
                    border: 'none',
                    color: '#000000',
                    cursor: 'default',
                  }
                : undefined),
            }}
            disabled
          >
            &lt;
          </button>
        ) : (
          <button className="previous" onClick={previous}>
            &lt;
          </button>
        )}

        {pageNumber < 2 ? (
          <ol className="pageOne">
            {pageOne.map((one) => (
              <Fragment key={one.id}>
                <li>
                  <span>{one.eduName}</span> - ({one.where}) - {one.year}
                </li>
              </Fragment>
            ))}
          </ol>
        ) : (
          <ol className="pageTwo">
            {pageTwo.map((two) => (
              <Fragment key={two.id}>
                <li>
                  <span>{two.eduName}</span> - ({two.where}) - {two.year}
                </li>
              </Fragment>
            ))}
          </ol>
        )}

        {pageNumber > 1 ? (
          <button
            className="next"
            style={{
              ...(activeList || isContactFormOpen
                ? {
                    pointerEvents: 'none',
                    backgroundColor: '#1e1e1e',
                    boxShadow: 'unset',
                    border: 'none',
                    color: '#000000',
                    cursor: 'default',
                  }
                : undefined),
            }}
            disabled
          >
            &gt;
          </button>
        ) : (
          <button className="next" onClick={next}>
            &gt;
          </button>
        )}

        <p className="pageNumber">{pageNumber} / 2</p>
      </div>
    </main>
  );
}
