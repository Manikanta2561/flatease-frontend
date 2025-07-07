import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import logo from "./logo.png";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Home() {
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setShowLogo(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setShowLogo(prev => !prev);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCustomerLogin = () => navigate("/client/clientlogin");
  const handleAdminLogin = () => navigate("/admin/adminlogin");

  // Dynamic styles
  const dynamicStyles = {
    contentContainer: {
      flexDirection: isMobile ? 'column' : 'row',
      padding: isMobile ? '20px 15px' : '40px',
      width: isMobile ? '95%' : '85%',
      margin: '0 auto',
    },
    title: {
      fontSize: isMobile ? '2rem' : '3rem',
    },
    animationContainer: {
      height: isMobile ? 250 : 400,
      marginBottom: isMobile ? 20 : 0,
    },
    buttonGroup: {
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '15px' : '30px',
    }
  };

  return (
    <div style={styles.homeContainer}>
      {/* Animated Background Elements */}
      <div style={styles.backgroundAnimation}>
        <DotLottieReact
          src="https://lottie.host/be9abc05-b321-4290-be40-792fc365e457/20MnlhDMCi.lottie" // Working Lottie URL
          autoplay
          loop
          style={styles.bgLottie}
        />
      </div>
      
      <div style={{ 
        ...styles.mainContent, 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}>
        <div style={{...styles.contentContainer, ...dynamicStyles.contentContainer}}>
          {/* Animation Section */}
          <div style={{...styles.animationContainer, ...dynamicStyles.animationContainer}}>
            {showLogo ? (
              <img 
                src={logo} 
                alt="FlatEase Logo"
                style={{
                  ...styles.logo,
                  opacity: showLogo ? 1 : 0,
                  transform: showLogo ? 'scale(1)' : 'scale(0.95)',
                }}
              />
            ) : (
              <DotLottieReact
                src="https://lottie.host/8ecf52a3-18ea-4e4d-86e2-d1af5021c652/qdewKwEqet.lottie" // Working Lottie URL
                loop
                autoplay
                style={{
                  opacity: showLogo ? 0 : 1,
                  transform: showLogo ? 'scale(0.95)' : 'scale(1)',
                }}
              />
            )}
          </div>

          {/* Content Section */}
          <div style={styles.rightContainer}>
            <h1 style={{...styles.title, ...dynamicStyles.title}}>
              <span style={styles.titleAccent}>Welcome to</span>
              FlatEase
            </h1>
            <p style={styles.subtitle}>Modern Community Living Redefined</p>
            
            <div style={{...styles.buttonGroup, ...dynamicStyles.buttonGroup}}>
              <button 
                style={styles.customerLoginBtn} 
                onClick={handleCustomerLogin}
              >
                Tenant Portal
              </button>
              <button 
                style={styles.adminLoginBtn} 
                onClick={handleAdminLogin}
              >
                Management Hub
              </button>
            </div>

            <div style={styles.contactSection}>
              <a 
                href="mailto:flateaseservices@gmail.com" 
                style={styles.contactLink}
              >
                <FiMail style={styles.contactIcon} />
                Connect With Us
              </a>
              <div style={styles.contactText}>
                Experience Smarter Community Living
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  homeContainer: {
    background: 'linear-gradient(45deg, #0f0c29, #302b63, #24243e)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundAnimation: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
    opacity: 0.15,
  },
  bgLottie: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  mainContent: {
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    width: '100%',
    maxWidth: 1400,
    padding: 20,
    zIndex: 2,
    position: 'relative',
  },
  contentContainer: {
    background: 'rgba(255, 255, 255, 0.97)',
    borderRadius: '30px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  animationContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  logo: {
    width: '80%',
    height: 'auto',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1))',
  },
  rightContainer: {
    padding: '30px',
    textAlign: 'center',
    flex: 1,
    position: 'relative',
    zIndex: 2,
  },
  title: {
    color: '#2a2a2a',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: '20px',
    transition: 'all 0.3s ease',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  titleAccent: {
    display: 'block',
    color: '#6b46c1',
    fontSize: '0.6em',
    fontWeight: 500,
    letterSpacing: '3px',
    textTransform: 'uppercase',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '1.1rem',
    marginBottom: '40px',
    fontWeight: 400,
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  customerLoginBtn: {
    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    color: 'white',
    border: 'none',
    padding: '18px 35px',
    borderRadius: '15px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.2)',
    flex: 1,
    maxWidth: 300,
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px -1px rgba(99, 102, 241, 0.3)',
    },
  },
  adminLoginBtn: {
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
    border: 'none',
    padding: '18px 35px',
    borderRadius: '15px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)',
    flex: 1,
    maxWidth: 300,
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px -1px rgba(16, 185, 129, 0.3)',
    },
  },
  contactSection: {
    marginTop: '40px',
    paddingTop: '30px',
    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
  },
  contactLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    color: '#4f46e5',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    padding: '12px 25px',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    background: 'rgba(79, 70, 229, 0.05)',
    '&:hover': {
      background: 'rgba(79, 70, 229, 0.1)',
      transform: 'translateY(-1px)',
    },
  },
  contactIcon: {
    fontSize: '1.2rem',
    color: '#4f46e5',
  },
  contactText: {
    color: '#6b7280',
    fontSize: '0.9rem',
    marginTop: '15px',
  },
};

export default Home;