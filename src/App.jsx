import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Header from './components/Header';
import MainContent from './components/MainContent';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isSkillListOpen, setIsSkillListOpen] = useState(false);
  const [isEducationListOpen, setIsEducationListOpen] = useState(false);
  const [isCyberListOpen, setIsCyberListOpen] = useState(false);
  const [isWebListOpen, setIsWebListOpen] = useState(false);
  const [classType, setClassType] = useState(false);

  // Simulate loading state for 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  // End

  // Toggle functions for contact form, educationList and skillList
  function toggleContactForm() {
    setIsContactFormOpen((prev) => !prev);
    setClassType((prev) => !prev);
  }
  //
  function toggleSkillList() {
    setIsSkillListOpen((prev) => !prev);
    setClassType((prev) => !prev);
  }
  //
  function toggleEducationList() {
    setIsEducationListOpen((prev) => !prev);
    setClassType((prev) => !prev);
  }
  //
  function toggleCyberList() {
    setIsCyberListOpen((prev) => !prev);
    setClassType((prev) => !prev);
  }
  //
  function toggleWebList() {
    setIsWebListOpen((prev) => !prev);
    setClassType((prev) => !prev);
  }
  // End

  // Handle side effects when contactForm, educationList, skillList, cyberList and webList are open

  // 1 contact form open: prevent background scrolling
  useEffect(() => {
    isContactFormOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.removeProperty('overflow'),
        document.getElementById('root').removeAttribute('style'));
    return () => {};
  }, [isContactFormOpen]);
  // End

  // 2 Related to skillList, when it's displayed, allowing background scrolling, and can be closed when the user scrolls to the top of the page, and when closed, it scrolls back to the original position before the list button was clicked
  useEffect(() => {
    isSkillListOpen
      ? (document.getElementById('root').style.height = 'auto')
      : document.getElementById('root').removeAttribute('style');

    return () => {};
  }, [isSkillListOpen]);
  //
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
  //

  // 3 Related to educationList, when it's displayed, allowing background scrolling, and can be closed when the user scrolls to the top of the page, and when closed, it scrolls back to the original position before the list button was clicked
  useEffect(() => {
    isEducationListOpen
      ? (document.getElementById('root').style.height = 'auto')
      : document.getElementById('root').removeAttribute('style');

    return () => {};
  }, [isEducationListOpen]);
  //
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
  //

  // 4 Related to cyberList, when it's displayed, allowing background scrolling, and can be closed when the user scrolls to the top of the page, and when closed, it scrolls back to the original position before the list button was clicked
  useEffect(() => {
    isCyberListOpen
      ? (document.getElementById('root').style.height = 'auto')
      : document.getElementById('root').removeAttribute('style');

    return () => {};
  }, [isCyberListOpen]);
  //
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
  //

  // 5 Related to webList, when it's displayed, allowing background scrolling, and can be closed when the user scrolls to the top of the page, and when closed, it scrolls back to the original position before the list button was clicked
  useEffect(() => {
    isWebListOpen
      ? (document.getElementById('root').style.height = 'auto')
      : document.getElementById('root').removeAttribute('style');

    return () => {};
  }, [isWebListOpen]);
  //
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
  //

  // 6 Related to both skillList and educationList, allows them to close when the user scrolls back to the top of the page
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
  }, [isSkillListOpen, isEducationListOpen, isCyberListOpen, isWebListOpen]);
  // End

  // Close contactForm, skillList, educationList, cyberList and webList when the user presses the Escape key
  useEffect(() => {
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        return (
          setIsContactFormOpen(false),
          setIsSkillListOpen(false),
          setIsEducationListOpen(false),
          setIsCyberListOpen(false),
          setIsWebListOpen(false),
          setClassType(false)
        );
      }
    });
  });
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
