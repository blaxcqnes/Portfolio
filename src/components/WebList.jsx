import { useState, useEffect } from 'react';
import { webListOne, webListTwo } from '../data/webList';
export default function WebList({
  activeList,
  isContactFormOpen,
  setActiveList,
}) {
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setPageNumber((prev) => (prev < 2 ? prev + 1 : prev));
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
    setPageNumber((prev) => (prev < 2 ? prev + 1 : prev));
  }

  return (
    <main className="webList" id="webList" onClick={(e) => e.stopPropagation()}>
      <div className="titleAndButton">
        <h4>More</h4>
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
          <div className="webProjectsContainer">
            {webListOne.map((projects) => (
              <div className={projects.classNameProjects} key={projects.id}>
                <a
                  className={projects.classNameWebLink}
                  href={projects.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={projects.classNameUrlImg}
                    src={projects.srcImg}
                    fetchPriority="high"
                  />
                </a>
                <a
                  className={projects.classNameGitLink}
                  href={projects.git}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={projects.classNameGitImg}>
                    <img
                      className={projects.classNameGitContainer}
                      src={projects.srcGit}
                      fetchPriority="high"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}

        {pageNumber === 2 && (
          <div className="webProjectsContainer">
            {webListTwo.map((projects) => (
              <div className={projects.classNameProjects} key={projects.id}>
                <a
                  className={projects.classNameWebLink}
                  href={projects.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={projects.classNameUrlImg}
                    src={projects.srcImg}
                    fetchPriority="high"
                  />
                </a>
                <a
                  className={projects.classNameGitLink}
                  href={projects.git}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={projects.classNameGitImg}>
                    <img
                      className={projects.classNameGitContainer}
                      src={projects.srcGit}
                      fetchPriority="high"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        )}

        {pageNumber < 2 ? (
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

        <p className="pageNumber">{pageNumber} / 2</p>
      </div>
    </main>
  );
}
