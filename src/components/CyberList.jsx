import { useState, useEffect, Fragment } from 'react';
import { cyberListOne, cyberListTwo, cyberListThree } from '../data/cyberList';
export default function CyberList({
  isContactFormOpen,
  activeList,
  setActiveList,
}) {
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setPageNumber((prev) => (prev < 3 ? prev + 1 : prev));
      }
      if (e.key === 'ArrowLeft') {
        setPageNumber((prev) => (prev > 1 ? prev - 1 : prev));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  function previous() {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : prev));
  }

  function next() {
    setPageNumber((prev) => (prev < 3 ? prev + 1 : prev));
  }

  return (
    <main
      className="cyberList"
      id="cyberList"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="titleAndButton">
        <h4>Extras</h4>
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
        {pageNumber > 1 ? (
          <button className="previous" onClick={previous}>
            &lt;
          </button>
        ) : (
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
        )}

        {pageNumber === 1 && (
          <div className="titleAndLists">
            <h4 className="title">Securing Systems & Networks</h4>
            {cyberListOne.map((projects) => (
              <Fragment key={projects.id}>
                <div className={projects.classProjectsContainer}>
                  <ol>
                    <li className={projects.classProject}>
                      {projects.project}
                    </li>
                  </ol>
                  <span className={projects.classDescription}>
                    {projects.description}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        )}

        {pageNumber === 2 && (
          <div className="titleAndLists">
            <h4 className="title">Securing Systems & Networks</h4>
            {cyberListTwo.map((projects) => (
              <Fragment key={projects.id}>
                <div className={projects.classProjectsContainer}>
                  <ol>
                    <li className={projects.classProject}>
                      {projects.project}
                    </li>
                  </ol>
                  <span className={projects.classDescription}>
                    {projects.description}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        )}

        {pageNumber === 3 && (
          <div className="titleAndLists">
            <h4 className="title">Cryptography & Steganography</h4>
            {cyberListThree.map((projects) => (
              <Fragment key={projects.id}>
                <div className={projects.classProjectsContainer}>
                  <ol>
                    <li className={projects.classProject}>
                      {projects.project}
                    </li>
                  </ol>
                  <span className={projects.classDescription}>
                    {projects.description}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        )}

        {pageNumber < 3 ? (
          <button className="next" onClick={next}>
            &gt;
          </button>
        ) : (
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
        )}

        <p className="pageNumber">{pageNumber} / 3</p>
      </div>
    </main>
  );
}
