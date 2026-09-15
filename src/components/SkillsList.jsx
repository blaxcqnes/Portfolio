import { useState, useEffect, Fragment } from 'react';
import { cyberOne, cyberTwo, webOne, webTwo } from '../data/skillsList';
export default function SkillsList({
  isContactFormOpen,
  activeList,
  setActiveList,
}) {
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setPageNumber((prev) => (prev < 4 ? prev + 1 : prev));
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
    setPageNumber((prev) => (prev < 4 ? prev + 1 : prev));
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
        )}

        {pageNumber === 2 && (
          <div className="titleAndFluencies">
            <h4 className="title">Fluency in Cybersecurity</h4>
            <div className="fluenciesTwo">
              {cyberTwo.map((skills) => (
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
        )}

        {pageNumber === 3 && (
          <div className="titleAndFluencies">
            <h4 className="title">Fluency in Web Dev.</h4>
            <div className="fluenciesThree">
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

        {pageNumber === 4 && (
          <div className="titleAndFluencies">
            <h4 className="title">Fluency in Web Dev.</h4>
            <div className="fluenciesFour">
              {webTwo.map((web) => (
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

        {pageNumber < 4 ? (
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

        <p className="pageNumber">{pageNumber} / 4</p>
      </div>
    </main>
  );
}
