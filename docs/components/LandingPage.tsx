import { useEffect, useState } from "react";

import ArrowIcon from "./ArrowIcon";

const footerShapes = [
  { primary: "01.png", alt: "01-dark.png", hiddenMobile: false },
  { primary: "02.png", alt: "02-dark.png", hiddenMobile: false },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: null, alt: null, hiddenMobile: true },
  { primary: "03.png", alt: "03-dark.png", hiddenMobile: false },
  { primary: "04.png", alt: "04-dark.png", hiddenMobile: false },
  { primary: "05.png", alt: "05-dark.png", hiddenMobile: true },
  { primary: "06.png", alt: "06-dark.png", hiddenMobile: false },
  { primary: "07.png", alt: "07-dark.png", hiddenMobile: false },
  { primary: "08.png", alt: "08-dark.png", hiddenMobile: true },
  { primary: "09.png", alt: "09-dark.png", hiddenMobile: true },
  { primary: "06.png", alt: "06-dark.png", hiddenMobile: true },
  { primary: "10.png", alt: "10-dark.png", hiddenMobile: true },
  { primary: "11.png", alt: "11-dark.png", hiddenMobile: true },
  { primary: "12.png", alt: "12-dark.png", hiddenMobile: true },
  { primary: "03.png", alt: "03-dark.png", hiddenMobile: true },
  { primary: "13.png", alt: "13-dark.png", hiddenMobile: false },
  { primary: "06.png", alt: "06-dark.png", hiddenMobile: false },
  { primary: "14.png", alt: "14-dark.png", hiddenMobile: true },
  { primary: "15.png", alt: "15-dark.png", hiddenMobile: true },
  { primary: "06.png", alt: "06-dark.png", hiddenMobile: true },
  { primary: "03.png", alt: "03-dark.png", hiddenMobile: true },
  { primary: "16.png", alt: "16-dark.png", hiddenMobile: false },
  { primary: "17.png", alt: "17-dark.png", hiddenMobile: false },
];

const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(() => {
      checkDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <h1 className="text-center mt-24 mb-6">
        Binary Proofs, <br className="lg:hidden"/>Blazing Fast
      </h1>

      <p className="text-center text-[20px]">
        Unlock the full potential of high-performance ZK with Binius      
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginTop: '64px'
      }}>
        <a href="/basics" style={{ textDecoration: 'none' }}>
          <div style={{ 
            backgroundColor: '#ACE5B9',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            color: isDarkMode ? '#1D272A' : 'inherit',
            transition: 'filter 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}>
            <img
              src="books-icon.svg"
              alt="Books Icon"
              style={{ width: '40px', height: '40px', marginBottom: '24px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}>
              <h2>Basics</h2>
              <p style={{ marginBottom: '16px' }}>
                Understand Binius fundamentals and core concepts
              </p>
            </div>
            <ArrowIcon />
          </div>
        </a>

        <a href="/building" style={{ textDecoration: 'none' }}>
          <div style={{ 
            backgroundColor: '#F6C956',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            color: isDarkMode ? '#1D272A' : 'inherit',
            transition: 'filter 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}>
            <img
              src="power-button-icon.svg"
              alt="Building Icon"
              style={{ width: '40px', height: '40px', marginBottom: '24px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}>
              <h2>Building</h2>
              <p style={{ marginBottom: '16px' }}>Learn how to write a SNARK with Binius</p>
            </div>
            <ArrowIcon />
          </div>
        </a>

        <a href="/blueprint" style={{ textDecoration: 'none' }}>
          <div style={{ 
            backgroundColor: '#7BCDE6',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            color: isDarkMode ? '#1D272A' : 'inherit',
            transition: 'filter 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}>
            <img
              src="blueprint-icon.svg"
              alt="Blueprint Icon"
              style={{ width: '40px', height: '40px', marginBottom: '24px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}>
              <h2>Blueprint</h2>
              <p style={{ marginBottom: '16px' }}>
                Learn how Binius proofs are generated and verified
              </p>
            </div>
            <ArrowIcon />
          </div>
        </a>

        <a href="/benchmarks" style={{ textDecoration: 'none' }}>
          <div style={{ 
            backgroundColor: '#F45A2A',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            color: isDarkMode ? '#1D272A' : 'inherit',
            transition: 'filter 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}>
            <img
              src="chart-icon.svg"
              alt="Chart Icon"
              style={{ width: '40px', height: '40px', marginBottom: '24px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}>
              <h2>Benchmarks</h2>
              <p style={{ marginBottom: '16px' }}>Explore up-to-date comparative benchmarks</p>
            </div>
            <ArrowIcon />
          </div>
        </a>

      </div>

      <footer className="w-full absolute left-0 mt-20">
        <div className="shape-grid">
          {footerShapes.map((shape, index) => (
            <div
              key={index}
              className={shape.hiddenMobile ? "hidden-mobile" : ""}
            >
              {shape.primary && (
                <img
                  src={
                    isDarkMode
                      ? `shapes/${shape.alt}`
                      : `shapes/${shape.primary}`
                  }
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>

        <div className="lp-footer flex flex-col mb-6 md:flex-row py-6 justify-center md:justify-between my-8">
          {" "}
          <p className="text-sm text-gunmetal pl-6">
            Binius is developed by{" "}
            <a
              href="https://www.irreducible.com/"
              className="underline"
              target="_blank"
            >
              Irreducible.
            </a>{" "}
            &copy; 2025 Irreducible, Inc. All rights reserved.
          </p>
          <div className="flex pr-6 md:justify-end justify-center mt-6 md:mt-0">
            <a href="https://x.com/IrreducibleHW" target="_blank">
              <img src="x-icon.svg" className="mr-6" style={{ width: '20px', height: '20px' }} />
            </a>
            <a href="https://github.com/IrreducibleOSS" target="_blank">
              <img src="github-icon.svg" style={{ width: '20px', height: '20px' }} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
