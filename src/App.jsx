import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Loader from './components/Loader';
import Header from './components/Header';
import MainContent from './components/MainContent';

const IMAGES_TO_PRELOAD = [...(MainContent.assets || [])];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [activeList, setActiveList] = useState(false);
  const activeListRef = useRef(activeList);
  const scrollTimeoutRef = useRef(null);

  // True dynamic Image Preloader
  useLayoutEffect(() => {
    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
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
        console.error('One or more images failed to preload safely:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAssets();
  }, []);
  // End

  // Toggle functions
  function toggleContactForm() {
    setIsContactFormOpen((prev) => !prev);
  }

  function toggleEducationList() {
    setActiveList((prev) =>
      prev === 'educationList' ? false : 'educationList',
    );
  }

  function toggleSkillList() {
    setActiveList((prev) => (prev === 'skillList' ? false : 'skillList'));
  }

  function toggleCyberList() {
    setActiveList((prev) => (prev === 'cyberList' ? false : 'cyberList'));
  }

  function toggleWebList() {
    setActiveList((prev) => (prev === 'webList' ? false : 'webList'));
  }
  // End

  // 3 Related to scrollIntoView for lists
  useLayoutEffect(() => {
    if (!activeList) return;
    const originalScrollY = window.scrollY;
    const originalScrollX = window.scrollX;
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

      if (!activeListRef.current) {
        window.scrollTo({
          top: originalScrollY,
          left: originalScrollX,
          behavior: 'auto',
        });
      }
    };
  }, [activeList]);

  // 4 Auto close when scrolled to the top
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

  // 5 Escape key event handler

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
      style={{
        ...(activeList && { height: 'auto', transform: 'scale(98%)' }),
        ...(isContactFormOpen && { transform: 'scale(98%)' }),
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header
            isContactFormOpen={isContactFormOpen}
            activeList={activeList}
            setActiveList={setActiveList}
            //
            toggleContactForm={toggleContactForm}
          />
          <MainContent
            isContactFormOpen={isContactFormOpen}
            activeList={activeList}
            setActiveList={setActiveList}
            //
            toggleContactForm={toggleContactForm}
            toggleEducationList={toggleEducationList}
            toggleSkillList={toggleSkillList}
            toggleCyberList={toggleCyberList}
            toggleWebList={toggleWebList}
          />
        </>
      )}
    </div>
  );
}
