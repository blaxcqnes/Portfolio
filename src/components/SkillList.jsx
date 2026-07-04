import { useState, useEffect } from 'react';
export default function SkillList({ toggleSkillList }) {
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    window.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        return setPageNumber(2);
      }
    });
  });

  useEffect(() => {
    window.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        return setPageNumber(1);
      }
    });
  });

  function previous() {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
  }

  function next() {
    if (pageNumber < 2) setPageNumber((prev) => prev + 1);
  }

  return (
    <main className="skillList" id="skillList">
      <div className="titleAndButton">
        <h4>Fluency</h4>
        <button className="close" onClick={toggleSkillList}>
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
            <h4 className="titleOne">Fluency in Cybersecurity</h4>
            <div className="fluencyOne">
              <p className="name">WireShark</p>
              <div className="statusBar">
                <div className="bottom"></div>
                <p className="percentage">70%</p>
                <div
                  // className={isLightModeOn ? 'topOneLight' : 'topOne'}
                  className="topOne"
                ></div>
              </div>
            </div>

            {/* */}

            <div className="fluencyTwo">
              <p className="name">Nmap</p>
              <div className="statusBar">
                <div className="bottom"></div>
                <p className="percentage">80%</p>
                <div
                  // className={isLightModeOn ? 'topTwoLight' : 'topTwo'}
                  className="topTwo"
                ></div>
              </div>
            </div>

            {/* */}

            <div className="fluencyThree">
              <p className="name">Metasploit</p>
              <div className="statusBar">
                <div className="bottom"></div>
                <p className="percentage">65%</p>
                <div
                  // className={isLightModeOn ? 'topThreeLight' : 'topThree'}
                  className="topThree"
                ></div>
              </div>
            </div>

            {/* */}

            <div className="fluencyFour">
              <p className="name">Burp Suite</p>
              <div className="statusBar">
                <div className="bottom"></div>
                <p className="percentage">75%</p>
                <div
                  // className={isLightModeOn ? 'topFourLight' : 'topFour'}
                  className="topFour"
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="titleAndFluencies">
            <h4 className="titleTwo">Fluency in Front-End</h4>
            <div className="fluencyFive">
              <p className="name">HTML</p>
              <div className="statusBar">
                <div className="bottom"></div>
                <p className="percentage">100%</p>
                <div
                  // className={isLightModeOn ? 'topFiveLight' : 'topFive'}
                  className="topFive"
                ></div>
              </div>
            </div>

            {/* */}

            <div className="fluencySix">
              <span className="name">
                CSS&nbsp;<p>&</p>&nbsp;SCSS
              </span>
              <div className="statusBar">
                <div className="bottom"></div>
                <p className="percentage">90%</p>
                <div
                  // className={isLightModeOn ? 'topSixLight' : 'topSix'}
                  className="topSix"
                ></div>
              </div>
            </div>

            {/* */}

            <div className="fluencySeven">
              <p className="name">JavaScript</p>
              <div className="statusBar">
                <div className="bottom"></div>
                <p className="percentage">70%</p>
                <div
                  // className={isLightModeOn ? 'topSevenLight' : 'topSeven'}
                  className="topSeven"
                ></div>
              </div>
            </div>

            {/* */}

            <div className="fluencyEight">
              <p className="name">React</p>
              <div className="statusBar">
                <div className="bottom"></div>
                <p className="percentage">80%</p>
                <div
                  // className={isLightModeOn ? 'topEightLight' : 'topEight'}
                  className="topEight"
                ></div>
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
