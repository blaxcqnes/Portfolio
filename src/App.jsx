import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Header from './components/Header';
import MainContent from './components/MainContent';

const IMAGES_TO_PRELOAD = [...(MainContent.assets || [])];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isSkillListOpen, setIsSkillListOpen] = useState(false);
  const [isEducationListOpen, setIsEducationListOpen] = useState(false);
  const [isCyberListOpen, setIsCyberListOpen] = useState(false);
  const [isWebListOpen, setIsWebListOpen] = useState(false);
  const [classType, setClassType] = useState(false);

  // Dynamic Image Preloader
  useEffect(() => {
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

  function toggleSkillList() {
    setIsSkillListOpen((prev) => !prev);
    setClassType((prev) => !prev);
  }

  function toggleEducationList() {
    setIsEducationListOpen((prev) => !prev);
    setClassType((prev) => !prev);
  }

  function toggleCyberList() {
    setIsCyberListOpen((prev) => !prev);
    setClassType((prev) => !prev);
  }

  function toggleWebList() {
    setIsWebListOpen((prev) => !prev);
    setClassType((prev) => !prev);
  }
  // End

  // 1 Related to allowing background to be scrollable
  useEffect(() => {
    classType
      ? (document.getElementById('root').style.height = 'auto')
      : document.getElementById('root').removeAttribute('style');
  }, [classType]);

  // 2 Related to root scaling
  useEffect(() => {
    classType || isContactFormOpen
      ? (document.getElementById('root').style.transform = 'scale(98%)')
      : document.getElementById('root').removeAttribute('style');
  }, [classType, isContactFormOpen]);

  // 3 Related to contactForm scrolling
  useEffect(() => {
    const originalScrollY = window.scrollY;
    const originalScrollX = window.scrollX;

    isContactFormOpen &&
      document
        .getElementById('contactForm')
        .scrollIntoView({ behavior: 'smooth' });
    return () => {
      window.scrollTo({
        top: originalScrollY,
        left: originalScrollX,
        behavior: 'smooth',
      });
    };
  }, [isContactFormOpen]);

  // 4 Related to skillList scrolling
  useEffect(() => {
    const originalScrollY = window.scrollY;
    const originalScrollX = window.scrollX;

    isSkillListOpen &&
      document
        .getElementById('skillList')
        .scrollIntoView({ behavior: 'smooth' });
    return () => {
      window.scrollTo({
        top: originalScrollY,
        left: originalScrollX,
        behavior: 'smooth',
      });
    };
  }, [isSkillListOpen]);

  // 5 Related to educationList scrolling
  useEffect(() => {
    const originalScrollY = window.scrollY;
    const originalScrollX = window.scrollX;

    isEducationListOpen &&
      document
        .getElementById('educationList')
        .scrollIntoView({ behavior: 'smooth' });
    return () => {
      window.scrollTo({
        top: originalScrollY,
        left: originalScrollX,
        behavior: 'smooth',
      });
    };
  }, [isEducationListOpen]);

  // 6 Related to cyberList scrolling
  useEffect(() => {
    const originalScrollY = window.scrollY;
    const originalScrollX = window.scrollX;

    isCyberListOpen &&
      document
        .getElementById('cyberList')
        .scrollIntoView({ behavior: 'smooth' });
    return () => {
      window.scrollTo({
        top: originalScrollY,
        left: originalScrollX,
        behavior: 'smooth',
      });
    };
  }, [isCyberListOpen]);

  // 7 Related to webList scrolling
  useEffect(() => {
    const originalScrollY = window.scrollY;
    const originalScrollX = window.scrollX;

    isWebListOpen &&
      document.getElementById('webList').scrollIntoView({ behavior: 'smooth' });
    return () => {
      window.scrollTo({
        top: originalScrollY,
        left: originalScrollX,
        behavior: 'smooth',
      });
    };
  }, [isWebListOpen]);

  // 8 Auto close on scroll to top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop <= 1) {
        setIsSkillListOpen(false);
        setIsEducationListOpen(false);
        setIsCyberListOpen(false);
        setIsWebListOpen(false);
        setClassType(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [
    isSkillListOpen,
    isEducationListOpen,
    isCyberListOpen,
    isWebListOpen,
    classType,
  ]);

  // 9 Escape key event handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsContactFormOpen(false);
        setIsSkillListOpen(false);
        setIsEducationListOpen(false);
        setIsCyberListOpen(false);
        setIsWebListOpen(false);
        setClassType(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  // End

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header
            isContactFormOpen={isContactFormOpen}
            isSkillListOpen={isSkillListOpen}
            isEducationListOpen={isEducationListOpen}
            isCyberListOpen={isCyberListOpen}
            isWebListOpen={isWebListOpen}
            classType={classType}
            //
            toggleContactForm={toggleContactForm}
            toggleSkillList={toggleSkillList}
            toggleEducationList={toggleEducationList}
            toggleCyberList={toggleCyberList}
            toggleWebList={toggleWebList}
          />
          <MainContent
            isContactFormOpen={isContactFormOpen}
            isSkillListOpen={isSkillListOpen}
            isEducationListOpen={isEducationListOpen}
            isCyberListOpen={isCyberListOpen}
            isWebListOpen={isWebListOpen}
            classType={classType}
            //
            toggleContactForm={toggleContactForm}
            toggleSkillList={toggleSkillList}
            toggleEducationList={toggleEducationList}
            toggleCyberList={toggleCyberList}
            toggleWebList={toggleWebList}
          />
        </>
      )}
    </>
  );
}
