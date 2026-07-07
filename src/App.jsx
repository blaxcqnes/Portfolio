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
  const [activeList, setActiveList] = useState(null);

  // True dynamic Image Preloader
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
    setActiveList((prev) => (prev === 'contactForm' ? null : 'contactForm'));
  }

  function toggleEducationList() {
    setIsEducationListOpen((prev) => !prev);
    setActiveList((prev) =>
      prev === 'educationList' ? null : 'educationList',
    );
    setClassType((prev) => !prev);
  }

  function toggleSkillList() {
    setIsSkillListOpen((prev) => !prev);
    setActiveList((prev) => (prev === 'skillList' ? null : 'skillList'));
    setClassType((prev) => !prev);
  }

  function toggleCyberList() {
    setIsCyberListOpen((prev) => !prev);
    setActiveList((prev) => (prev === 'cyberList' ? null : 'cyberList'));
    setClassType((prev) => !prev);
  }

  function toggleWebList() {
    setIsWebListOpen((prev) => !prev);
    setActiveList((prev) => (prev === 'webList' ? null : 'webList'));
    setClassType((prev) => !prev);
  }
  // End

  // 1 Related to allowing background to be scrollable
  useEffect(() => {
    activeList
      ? (document.getElementById('root').style.height = 'auto')
      : document.getElementById('root').removeAttribute('style');
  }, [activeList]);

  // 2 Related to root scaling and elements getting unfocused
  useEffect(() => {
    activeList
      ? (document.getElementById('root').style.transform = 'scale(98%)')
      : document.getElementById('root').removeAttribute('style');
  }, [activeList]);

  // 3 Related to scrollIntoView for lists
  useEffect(() => {
    if (!activeList) return;

    const originalScrollY = window.scrollY;
    const originalScrollX = window.scrollX;

    const targetElement = document.getElementById(activeList);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    return () => {
      window.scrollTo({
        top: originalScrollY,
        left: originalScrollX,
        behavior: 'smooth',
      });
    };
  }, [activeList]);

  // 4 Auto close when scrolled to the top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop <= 1) {
        setIsSkillListOpen(false);
        setIsEducationListOpen(false);
        setIsCyberListOpen(false);
        setIsWebListOpen(false);
        setClassType(false);
        setActiveList(null);
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
    activeList,
  ]);

  // 5 Escape key event handler

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsContactFormOpen(false);
        setIsSkillListOpen(false);
        setIsEducationListOpen(false);
        setIsCyberListOpen(false);
        setIsWebListOpen(false);
        setClassType(false);
        setActiveList(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isContactFormOpen,
    isSkillListOpen,
    isEducationListOpen,
    isCyberListOpen,
    isWebListOpen,
    classType,
    activeList,
  ]);

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
            activeList={activeList}
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
            activeList={activeList}
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
