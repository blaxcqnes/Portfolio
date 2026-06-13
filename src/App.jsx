import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Header from './components/Header';
import MainContent from './components/MainContent';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLightModeOn, setIsLightModeOn] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isContactFormMobileOpen, setIsContactFormMobileOpen] = useState(false);
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

  // Toggle functions for lightMode, contactForm, contactFormMobile, skillList, educationList, cyberList and webList
  function toggleLightMode() {
    setIsLightModeOn((prev) => !prev);
  }
  //
  function toggleContactForm() {
    setIsContactFormOpen((prev) => !prev);
  }
  //
  function toggleContactFormMobile() {
    setIsContactFormMobileOpen((prev) => !prev);
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

  // 1 Related to lightMode, switches UI to a lighter theme
  useEffect(() => {
    isLightModeOn
      ? (document.body.style.cssText =
          'background-color: #d9d9d9; transition: all 0.2s ease-in-out;')
      : document.body.removeAttribute('style');

    return () => {};
  }, [isLightModeOn]);
  //

  // 2 Related to allowing background to be scrollable

  useEffect(() => {
    classType
      ? (document.getElementById('root').style.height = 'auto')
      : document.getElementById('root').removeAttribute('style');

    return () => {};
  }, [classType]);
  //

  // 3 Related to contactForm, when displayed, it can be closed when the user scrolls to the top of the page, and when closed, it scrolls back to the original position before the form was displayed
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
  //

  // 4 Related to skillList, when displayed, it allows background scrolling, and can be closed when the user scrolls to the top of the page, and when closed, it scrolls back to the original position before the form was displayed
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

  // 5 Related to educationList, when displayed, it allows background scrolling, and can be closed when the user scrolls to the top of the page, and when closed, it scrolls back to the original position before the form was displayed
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

  // 6 Related to cyberList, when displayed, it allows background scrolling, and can be closed when the user scrolls to the top of the page, and when closed, it scrolls back to the original position before the form was displaye
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

  // 7 Related to educationList, when displayed, it allows background scrolling, and can be closed when the user scrolls to the top of the page, and when closed, it scrolls back to the original position before the form was displayed
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

  // 8 Related to lightMode, contactForm, contactFormMobile, skillList, educationList, cyberList and webList, all of them get closed when the user scrolls back to the top of the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop <= 1) {
        setIsContactFormOpen(false);
        setIsContactFormMobileOpen(false);
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
    isContactFormMobileOpen,
    isContactFormOpen,
    isSkillListOpen,
    isEducationListOpen,
    isCyberListOpen,
    isWebListOpen,
  ]);
  //

  //  9 Closes contactForm, contactFormMobile, skillList, educationList, cyberList and webList when the user presses the Escape key
  useEffect(() => {
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        return (
          setIsContactFormOpen(false),
          setIsContactFormMobileOpen(false),
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
            isLightModeOn={isLightModeOn}
            isContactFormOpen={isContactFormOpen}
            isContactFormMobileOpen={isContactFormMobileOpen}
            isSkillListOpen={isSkillListOpen}
            isEducationListOpen={isEducationListOpen}
            isCyberListOpen={isCyberListOpen}
            isWebListOpen={isWebListOpen}
            classType={classType}
            //
            toggleLightMode={toggleLightMode}
            toggleContactForm={toggleContactForm}
            toggleContactFormMobile={toggleContactFormMobile}
            toggleSkillList={toggleSkillList}
            toggleEducationList={toggleEducationList}
            toggleCyberList={toggleCyberList}
            toggleWebList={toggleWebList}
          />
          <MainContent
            isLightModeOn={isLightModeOn}
            isContactFormOpen={isContactFormOpen}
            isContactFormMobileOpen={isContactFormMobileOpen}
            isSkillListOpen={isSkillListOpen}
            isEducationListOpen={isEducationListOpen}
            isCyberListOpen={isCyberListOpen}
            isWebListOpen={isWebListOpen}
            classType={classType}
            //
            toggleLightMode={toggleLightMode}
            toggleContactForm={toggleContactForm}
            toggleContactFormMobile={toggleContactFormMobile}
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
