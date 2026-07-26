import { useState, useEffect } from 'react';
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
              <div className="fluencyOne">
                <p className="name">WireShark</p>
                <div className="statusBar">
                  <div className="bottom"></div>
                  <p className="percentage">70%</p>
                  <div className="topOne"></div>
                </div>
              </div>
              {/* */}
              <div className="fluencyTwo">
                <p className="name">Nmap</p>
                <div className="statusBar">
                  <div className="bottom"></div>
                  <p className="percentage">80%</p>
                  <div className="topTwo"></div>
                </div>
              </div>
              {/* */}
              <div className="fluencyThree">
                <p className="name">Metasploit</p>
                <div className="statusBar">
                  <div className="bottom"></div>
                  <p className="percentage">65%</p>
                  <div className="topThree"></div>
                </div>
              </div>
              {/* */}
              <div className="fluencyFour">
                <p className="name">Burp Suite</p>
                <div className="statusBar">
                  <div className="bottom"></div>
                  <p className="percentage">75%</p>
                  <div className="topFour"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="titleAndFluencies">
            <h4 className="title">Fluency in Front-End</h4>
            <div className="fluenciesTwo">
              <div className="fluencyOne">
                <p className="name">HTML</p>
                <div className="statusBar">
                  <div className="bottom"></div>
                  <p className="percentage">100%</p>
                  <div className="topOne"></div>
                </div>
              </div>
              {/* */}
              <div className="fluencyTwo">
                <span className="name">CSS & SCSS</span>
                <div className="statusBar">
                  <div className="bottom"></div>
                  <p className="percentage">90%</p>
                  <div className="topTwo"></div>
                </div>
              </div>
              {/* */}
              <div className="fluencyThree">
                <p className="name">JavaScript</p>
                <div className="statusBar">
                  <div className="bottom"></div>
                  <p className="percentage">70%</p>
                  <div className="topThree"></div>
                </div>
              </div>
              {/* */}
              <div className="fluencyFour">
                <p className="name">React</p>
                <div className="statusBar">
                  <div className="bottom"></div>
                  <p className="percentage">80%</p>
                  <div className="topFour"></div>
                </div>
              </div>
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

        <p>{pageNumber} / 2</p>
      </div>
    </main>
  );
}
