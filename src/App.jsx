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

  // Related to screen sizes
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

  const fixedLargeForContactFormAndServicesLandscape = useMediaQuery(
    '(orientation: landscape) and (min-width: 1023px)',
  );
  const autoLargeForContactFormAndServicesLandscape = useMediaQuery(
    '(orientation: landscape) and (min-width: 300px) and (max-width: 1023px)',
  );
  const fixedContactFormPortrait = useMediaQuery(
    '(orientation: portrait) and (min-width: 1100px) and (min-height: 1470px)',
  );
  const autoContactFormPortrait = useMediaQuery(
    '(orientation: portrait) and (max-width: 1100px) and (max-height: 1470px)',
  );
  const exactLargeWidth = useMediaQuery('(width: 1023px)');
  // End

  // Loading screen, completes when all images are loaded and after 3 second delay.
  useLayoutEffect(() => {
    let isMounted = true;
    const totalImages = IMAGES_TO_PRELOAD.length;
    let loadedCount = 0;
    const updateProgress = () => {
      if (!isMounted) return;
      loadedCount++;
      const percentage =
        totalImages === 0 ? 100 : Math.round((loadedCount / totalImages) * 100);
      setProgress(Math.min(percentage, 100));
    };
    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        let completed = false;
        const finish = async () => {
          if (completed) return;
          completed = true;
          try {
            if (img.decode) {
              await img.decode();
            }
          } catch {}
          updateProgress();
          resolve();
        };
        img.onload = finish;
        img.onerror = finish;
        img.src = src;
        if (img.complete) {
          finish();
        }
      });
    };
    const minDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const loadAssets = async () => {
      try {
        if (totalImages === 0) {
          setProgress(100);
          await minDelay(3000);
          if (isMounted) {
            setLoading(false);
          }
          return;
        }
        await Promise.all([
          ...IMAGES_TO_PRELOAD.map(preloadImage),
          minDelay(3000),
        ]);
        await new Promise((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
          });
        });
        if (isMounted) {
          setProgress(100);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error during asset loading:', error);
        if (isMounted) {
          setProgress(100);
          setLoading(false);
        }
      }
    };
    loadAssets();
    return () => {
      isMounted = false;
    };
  }, []);
  // End

  // Cloases all lists and contact form
  function closeList() {
    if (activeList || isContactFormOpen) {
      setIsContactFormOpen(false);
      setActiveList(false);
    }
  }
  // End

  // Toggle functions
  function toggleContactForm() {
    setIsContactFormOpen((prev) => !prev);
  }

  function toggleServicesList() {
    setActiveList((prev) => (prev === 'servicesList' ? false : 'servicesList'));
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
  // End

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
  // End

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
  // End

  return (
    <section
      className="container"
      onClick={closeList}
      style={
        activeList || isContactFormOpen
          ? {
              height: autoLargeForContactFormAndServicesLandscape
                ? 'auto'
                : (!exactLargeWidth &&
                      fixedLargeForContactFormAndServicesLandscape &&
                      activeList === 'servicesList') ||
                    (fixedLargeForContactFormAndServicesLandscape &&
                      isContactFormOpen) ||
                    (fixedContactFormPortrait && isContactFormOpen) ||
                    (!autoContactFormPortrait && isContactFormOpen)
                  ? '100dvh'
                  : 'auto',
              overflowY:
                activeList === 'servicesList' || isContactFormOpen
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
            //
            toggleContactForm={toggleContactForm}
            closeList={closeList}
          />
          <MainContent
            isContactFormOpen={isContactFormOpen}
            activeList={activeList}
            setActiveList={setActiveList}
            //
            toggleServicesList={toggleServicesList}
            toggleSkillsList={toggleSkillsList}
            toggleEducationList={toggleEducationList}
            toggleCyberList={toggleCyberList}
            toggleWebList={toggleWebList}
          />
        </>
      )}
    </section>
  );
}
