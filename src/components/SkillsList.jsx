import { useState, useEffect, Fragment } from 'react';
import { cyberOne, webOne } from '../data/skillsList';
export default function SkillsList({ setActiveList }) {
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
      className="skillsList"
      id="skillsList"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="titleAndButton">
        <h4>Fluency</h4>
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
          <button className="previousDisabled" disabled>
            &lt;
          </button>
        ) : (
          <button className="previous" onClick={previous}>
            &lt;
          </button>
        )}

        {pageNumber < 2 ? (
          <div className="titleAndFluencies">
            <h4 className="title">Fluency in Cybersecurity</h4>
            <div className="fluenciesOne">
              {cyberOne.map((skills) => (
                <Fragment key={skills.id}>
                  <div className={skills.classFluency}>
                    <p className={skills.className}>{skills.name}</p>
                    <div className={skills.classStatusBar}>
                      <div className={skills.classBottom}></div>
                      <p className={skills.classPercentage}>{skills.value}</p>
                      <div className={skills.classTop}></div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        ) : (
          <div className="titleAndFluencies">
            <h4 className="title">Fluency in Front-End</h4>
            <div className="fluenciesTwo">
              {webOne.map((web) => (
                <Fragment key={web.id}>
                  <div className={web.classFluency}>
                    <p className={web.className}>{web.name}</p>
                    <div className={web.classStatusBar}>
                      <div className={web.classBottom}></div>
                      <p className={web.classPercentage}>{web.value}</p>
                      <div className={web.classTop}></div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
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

        <p className="pageNumber">{pageNumber} / 2</p>
      </div>
    </main>
  );
}
