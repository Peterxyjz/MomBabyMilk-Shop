import { useState, useEffect } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import Button from '@mui/material/Button';

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
  );
};

export default TapToTop;
