import { useState, useEffect } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import Button from '@mui/material/Button';
import Messenger from '../../assets/images/logo/messenger.png';

const TapToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div style={{ position: 'fixed', bottom: '90px', right: '20px', zIndex: 1000 }}>
        {isVisible && (
          <Button 
            variant="contained" 
            color="success"
            onClick={scrollToTop}
            style={{ minWidth: '40px', minHeight: '40px', padding: '10px', borderRadius: '8px' }}
          >
            <MdKeyboardArrowUp className="text-2xl"/>
          </Button>
        )}
      </div>
      <a href="https://m.me/353628511170589" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <img src={Messenger} alt="M" style={{ width: '40px', height: '40px' }} />
      </a>
    </div>
  );
};

export default TapToTop;
