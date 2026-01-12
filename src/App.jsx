import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);

  // 1. INTRO ANIMATION (Mask Effect)
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          if (document.querySelector(".svg")) {
            document.querySelector(".svg").remove();
          }
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  // 2. MAIN CONTENT ANIMATIONS
  useGSAP(() => {
    if (!showContent) return;

    // Animate the rotation/scale reset slightly for effect
    gsap.to(".main", {
      scale: 1, // Resets to normal size relative to container
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    // Background Parallax Entry
    gsap.to([".sky", ".bg"], {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    // Character Pop-up Animation
    gsap.fromTo(
      ".character",
      {
        scale: 1.5,
        y: "20%", // Start slightly lower
        rotate: -10,
      },
      {
        scale: 1,
        y: "0%", // Land exactly at bottom
        rotate: 0,
        duration: 2,
        delay: "-.8",
        ease: "Expo.easeInOut",
      }
    );

    // Text Entry
    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    // Mouse Move Parallax Effect
    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", { x: `${xMove * 0.4}%` });
      gsap.to(".sky", { x: xMove });
      gsap.to(".bg", { x: xMove * 1.7 });
    });
  }, [showContent]);

  return (
    <>
      {/* --- INTRO LOADING SCREEN --- */}
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {/* --- MAIN APP CONTENT --- */}
      {showContent && (
        <div className="main w-full bg-black overflow-x-hidden origin-center rotate-[-10deg] scale-[1.7]">
          {/* SECTION 1: LANDING */}
          <div className="landing relative w-full h-screen overflow-hidden">
            {/* Navbar */}
            <div className="navbar absolute top-0 left-0 z-[20] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white font-bold">
                  Rockstar
                </h3>
              </div>
            </div>

            {/* Hero Images Container */}
            <div className="imagesdiv relative w-full h-full flex justify-center items-end">
              {/* Sky Background */}
              <img
                className="absolute sky scale-[1.5] rotate-[-20deg] min-w-[110%] min-h-[110%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
                src="./sky.png"
                alt="sky"
              />
              {/* City Background */}
              <img
                className="absolute bg scale-[1.8] rotate-[-3deg] min-w-[110%] min-h-[110%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
                src="./bg.png"
                alt="bg"
              />

              {/* GTA Text */}
              <div className="text text-white flex flex-col gap-3 absolute top-[10%] left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg] z-[1]">
                <h1 className="text-[12rem] leading-none -ml-40 font-black tracking-tighter">
                  grand
                </h1>
                <h1 className="text-[12rem] leading-none ml-20 font-black tracking-tighter">
                  theft
                </h1>
                <h1 className="text-[12rem] leading-none -ml-40 font-black tracking-tighter">
                  auto
                </h1>
              </div>

              {/* Character Image (The Key Fix) */}
              <img
                className="absolute character z-[10] bottom-0 left-1/2 -translate-x-1/2 h-[90vh] w-auto object-contain pointer-events-none"
                src="./girlbg.png"
                alt="character"
              />
            </div>

            {/* Bottom Bar */}
            <div className="btmbar text-white absolute bottom-0 left-0 z-[20] w-full py-10 px-10 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl font-helvetica">Scroll Down</h3>
              </div>
              <img
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt="ps5"
              />
            </div>
          </div>

          {/* SECTION 2: CONTENT DETAILS */}
          <div className="w-full h-screen flex items-center justify-center bg-black relative z-[30]">
            <div className="cntnr flex text-white w-full h-[80%] max-w-[1400px] mx-auto px-10">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[1.2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain h-full"
                  src="./imag.png"
                  alt="Feature"
                />
              </div>
              <div className="rg w-1/2 flex flex-col justify-center py-20 px-10">
                <h1 className="text-7xl font-bold leading-tight">
                  Still Running,
                </h1>
                <h1 className="text-7xl font-bold leading-tight text-gray-400">
                  Not Hunting
                </h1>
                <p className="mt-8 text-xl text-gray-300 font-helvetica leading-relaxed">
                  Experience the next chapter of the saga. With immersive
                  worlds, dynamic characters, and a story that grips you from
                  the start.
                </p>
                <p className="mt-5 text-xl text-gray-300 font-helvetica leading-relaxed">
                  Join millions of players in the ultimate open-world
                  experience. Pre-order now to get exclusive in-game bonuses.
                </p>
                <button className="bg-yellow-500 hover:bg-yellow-400 transition-colors px-10 py-4 text-black mt-10 text-2xl font-black uppercase tracking-wider rounded-sm w-fit">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
