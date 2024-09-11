import React, { useEffect } from 'react';
import "../styles/footer.css"

function Footer() {
  useEffect(() => {
    let lastScrollTop = 0;
    const footer = document.querySelector('.footerContainer');

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > lastScrollTop && scrollPosition > scrollThreshold) {
        // Scroll down
        footer.style.bottom = '-100px';
      } else {
        // Scroll up or at the top
        footer.style.bottom = '0';
      }
      lastScrollTop = scrollPosition;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);  // Empty dependency array ensures the effect runs only once

  return (
    <div className='footerContainer'>
      <div className='socialIcons'>
        <a href=""><i className="fa-brands fa-facebook"></i></a>
        <a href=""><i className="fa-brands fa-instagram"></i></a>
        <a href=""><i className="fa-brands fa-twitter"></i></a>
      </div>
      <div className='footerNav'>
        <ul>
          <li><a href='/'>Accueil</a></li>
          <li><a href='/subscription'>Nos offres</a></li>
          <li><a href='/sinistre'> Déclarer un sinistre</a></li>
          <li><a href='/contact'>Contacter Nous</a></li>
          <li><a href='/a-propos'>A propos</a></li>
        </ul>
      </div>

      <div className='footerBottom'>
        <p>Copyright &copy;2024</p>
      </div>
    </div>
  );
}

export default Footer;
