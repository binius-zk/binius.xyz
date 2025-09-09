import { useEffect, useState } from "react";

import ArrowIcon from "./ArrowIcon";
import SVG from "react-inlinesvg";

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
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <h1 className="text-center !mt-24 !mb-6">
        Binary Proofs, <br className="lg:hidden" />
        Blazing Fast
      </h1>

      <p className="text-center text-[20px]">
        Unlock the full potential of high-performance ZK with Binius
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
        <a href="/basics">
          <div className="bg-green hover:brightness-110 transition-all p-8 flex flex-col h-full dark:text-slate ">
            <img
              src="books-icon.svg"
              alt="Books Icon"
              className="mb-6"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="flex flex-col gap-4 flex-grow">
              <h2>Basics</h2>
              <p className="mb-4">
                Understand Binius fundamentals and core concepts
              </p>
            </div>
            <ArrowIcon />
          </div>
        </a>

        <a href="/building">
          <div className="bg-orange hover:brightness-110 transition-all p-8 flex flex-col h-full dark:text-slate">
            <img
              src="power-button-icon.svg"
              alt="Building Icon"
              className="mb-6"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="flex flex-col gap-4 flex-grow">
              <h2>Building</h2>
              <p className="mb-4">Learn how to write a SNARK with Binius</p>
            </div>
            <ArrowIcon />
          </div>
        </a>

        <a href="/blueprint">
          <div className="bg-blue hover:brightness-110 transition-all p-8 flex flex-col h-full dark:text-slate">
            <img
              src="blueprint-icon.svg"
              alt="Blueprint Icon"
              className="mb-6"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="flex flex-col gap-4 flex-grow">
              <h2>Blueprint</h2>
              <p className="mb-4">
                Learn how Binius proofs are generated and verified
              </p>
            </div>
            <ArrowIcon />
          </div>
        </a>

        <a href="/benchmarks">
          <div className="bg-red hover:brightness-110 transition-all p-8 flex flex-col h-full dark:text-slate">
            <img
              src="chart-icon.svg"
              alt="Chart Icon"
              className="mb-6"
              style={{ width: "40px", height: "40px" }}
            />
            <div className="flex flex-col gap-4 flex-grow">
              <h2>Benchmarks</h2>
              <p className="mb-4">Explore up-to-date comparative benchmarks</p>
            </div>
            <ArrowIcon />
          </div>
        </a>
      </div>

      <footer className="w-screen absolute left-1/2 -translate-x-1/2 mt-20">
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

        <div className="lp-footer flex flex-col md:flex-row justify-center md:justify-between mt-8 md:px-8">
          {" "}
          <div className="text-sm text-gunmetal md:text-left text-center mb-2 md:mb-0">
            Binius is developed by{" "}
            <a
              href="https://www.irreducible.com/"
              className="underline"
              target="_blank"
            >
              Irreducible.
            </a>{" "}
            <br className="lg:hidden" />
            &copy; 2025 Irreducible, Inc. All rights reserved.
          </div>
          <div className="flex md:justify-end justify-center md:mb-0 mb-4">
            <a href="https://x.com/IrreducibleHW" target="_blank">
              <SVG
                src="x-icon.svg"
                className="mr-6"
                style={{ width: "20px", height: "20px" }}
              />
            </a>
            <a href="https://github.com/IrreducibleOSS" target="_blank">
              <SVG
                src="github-icon.svg"
                style={{ width: "20px", height: "20px" }}
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
