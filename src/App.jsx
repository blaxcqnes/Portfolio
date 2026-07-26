import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
  useCallback,
} from 'react';
import Loader from './components/Loader';
import Header from './components/Header';
import MainContent from './components/MainContent';

const IMAGES_TO_PRELOAD = [...(MainContent.assets || [])];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [activeList, setActiveList] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const activeListRef = useRef(null);
  const originalScrollRef = useRef({ x: 0, y: 0 });

  function useMediaQuery(query) {
    const subscribe = useCallback(
      (callback) => {
        const matchMedia = window.matchMedia(query);
        matchMedia.addEventListener('change', callback);
        return () => matchMedia.removeEventListener('change', callback);
      },
      [query],
    );

    const getSnapshot = () => window.matchMedia(query).matches;

    return useSyncExternalStore(subscribe, getSnapshot);
  }

  const forContactFormAndEstimatesLandscapeLargeFixed = useMediaQuery(
    '(orientation: landscape) and (min-width: 1023px)',
  );
  const forContactFormPortraitFixed = useMediaQuery(
    '(orientation: portrait) and (min-width: 1100px) and (min-height: 1500px)',
  );
  const forContactFormPortraitAuto = useMediaQuery(
    '(orientation: portrait) and (max-width: 1100px) and (max-height: 1500px)',
  );
  const exactTabAndLargeWidth = useMediaQuery('(width: 1023px)');

  // True dynamic Image Preloader
  // useLayoutEffect(() => {
  //   const preloadImage = (src) => {
  //     return new Promise((resolve, reject) => {
  //       const img = new Image();
  //       img.onload = resolve;
  //       img.onerror = reject;
  //       img.src = src;
  //     });
  //   };

  //   const minDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //   const loadAssets = async () => {
  //     try {
  //       await Promise.all([
  //         ...IMAGES_TO_PRELOAD.map((src) => preloadImage(src)),
  //         minDelay(3000),
  //       ]);
  //     } catch (error) {
  //       console.error('One or more images failed to preload safely:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadAssets();
  // }, []);

  useLayoutEffect(() => {
    let loadedCount = 0;
    const totalImages = IMAGES_TO_PRELOAD.length;

    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();

        const handleImageCounter = () => {
          loadedCount++;
          const percentage = Math.round((loadedCount / totalImages) * 100);
          setProgress(percentage);
          resolve();
        };

        img.onload = handleImageCounter;
        img.onerror = handleImageCounter;
        img.src = src;
      });
    };

    const minDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const loadAssets = async () => {
      try {
        await Promise.all([
          ...IMAGES_TO_PRELOAD.map((src) => preloadImage(src)),
          minDelay(3000),
        ]);
      } catch (error) {
        console.error('Error during asset loading:', error);
      } finally {
        setProgress(100);
        setLoading(false);
      }
    };

    loadAssets();
  }, []);

  // Toggle functions
  function toggleContactForm() {
    setIsContactFormOpen((prev) => !prev);
  }

  function toggleEstimatesList() {
    setActiveList((prev) =>
      prev === 'estimatesList' ? false : 'estimatesList',
    );
  }

  function toggleSkillsList() {
    setActiveList((prev) => (prev === 'skillsList' ? false : 'skillsList'));
  }

  function toggleEducationList() {
    setActiveList((prev) =>
      prev === 'educationList' ? false : 'educationList',
    );
  }

  function toggleCyberList() {
    setActiveList((prev) => (prev === 'cyberList' ? false : 'cyberList'));
  }

  function toggleWebList() {
    setActiveList((prev) => (prev === 'webList' ? false : 'webList'));
  }
  // End

  // Related to scrollIntoView for lists
  useLayoutEffect(() => {
    if (!activeList) return;
    originalScrollRef.current = {
      x: window.scrollX,
      y: window.scrollY,
    };

    const currentActive = activeList;
    activeListRef.current = currentActive;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const targetElement = document.getElementById(currentActive);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }
    }, 50);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      window.scrollTo({
        top: originalScrollRef.current.y,
        left: originalScrollRef.current.x,
        behavior: 'auto',
      });

      activeListRef.current = null;
    };
  }, [activeList]);

  // Auto closes lists when scrolled to the top
  useEffect(() => {
    let isLoggedActive = true;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop <= 1) {
        if (isLoggedActive) {
          setActiveList(false);
          isLoggedActive = false;
        }
      } else {
        isLoggedActive = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Escape key event handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsContactFormOpen(false);
        setActiveList(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      className="container"
      style={
        activeList || isContactFormOpen
          ? {
              height:
                (!exactTabAndLargeWidth &&
                  forContactFormAndEstimatesLandscapeLargeFixed &&
                  activeList === 'estimatesList') ||
                (forContactFormAndEstimatesLandscapeLargeFixed &&
                  isContactFormOpen) ||
                (forContactFormPortraitFixed && isContactFormOpen) ||
                (!forContactFormPortraitAuto && isContactFormOpen)
                  ? '100vh'
                  : 'auto',
              overflowY:
                activeList === 'estimatesList' || isContactFormOpen
                  ? 'unset'
                  : 'auto',
              transform: 'scale(98%)',
              animation: 'activeLists 0.2s linear 1',
            }
          : {
              animation: 'nonActiveLists 0.2s linear 1',
            }
      }
    >
      {loading ? (
        <Loader progress={progress} />
      ) : (
        <>
          <Header
            isContactFormOpen={isContactFormOpen}
            activeList={activeList}
            setActiveList={setActiveList}
            setIsContactFormOpen={setIsContactFormOpen}
            //
            toggleContactForm={toggleContactForm}
          />
          <MainContent
            isContactFormOpen={isContactFormOpen}
            activeList={activeList}
            setActiveList={setActiveList}
            //
            toggleContactForm={toggleContactForm}
            toggleEstimatesList={toggleEstimatesList}
            toggleSkillsList={toggleSkillsList}
            toggleEducationList={toggleEducationList}
            toggleCyberList={toggleCyberList}
            toggleWebList={toggleWebList}
          />
        </>
      )}
    </div>
  );
}
