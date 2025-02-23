import React from 'react';

const Navbar = () => {
  return (
    <div style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img
          src="/images/WiOS_White_NoBG.png" 
          alt="Club Logo"
          style={styles.logo}
        />
      </div>
      <div style={styles.eventName}>
        <h1>Decipher Event</h1>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#262d38', // Customize the background color
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a shadow for better visibility
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '100px', 
    width: 'auto',
  },
  eventName: {
    fontSize: '24px', 
    fontWeight: 'bold',
    color: '#a3aab5',
  },
};

export default Navbar;