// Asset Preloader
let loadedAssets = 0;
const totalAssets = 2; // 1 image + 1 audio

function updateProgress() {
  loadedAssets++;
  const progress = (loadedAssets / totalAssets) * 100;
  document.getElementById("loadingProgress").style.width = progress + "%";
  document.getElementById("loadingText").textContent = `Loading... ${Math.round(
    progress
  )}%`;

  if (loadedAssets === totalAssets) {
    setTimeout(() => {
      document.getElementById("preloader").classList.add("loaded");
      document.getElementById("cardOverlay").classList.add("visible");
    }, 500);
  }
}

// Preload image
const img = new Image();
img.onload = updateProgress;
img.onerror = updateProgress;
img.src = "./img/desire.jpg";

// Preload audio
const audio = document.getElementById("bgMusic");
audio.addEventListener("canplaythrough", updateProgress, { once: true });
audio.addEventListener("error", updateProgress, { once: true });
audio.load();

// Main variables
const card = document.getElementById("birthdayCard");
const cardOverlay = document.getElementById("cardOverlay");
const openBtn = document.getElementById("openBtn");
const timelineContainer = document.getElementById("timelineContainer");
const musicControl = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");
const bgMusic = audio;

let musicPlaying = false;
let tl = null;

const iconVolumeOn = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 10v4h4l5 4V6l-5 4z" />
    <path d="M16 8.5a5 5 0 0 1 0 7" />
    <path d="M18.5 6a8.5 8.5 0 0 1 0 12" />
  </svg>
`;

const iconVolumeOff = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 10v4h4l5 4V6l-5 4z" />
    <path d="M18 9l-5 6" />
    <path d="M13 9l5 6" />
  </svg>
`;

function setMusicIcon(isPlaying) {
  musicIcon.innerHTML = isPlaying ? iconVolumeOn : iconVolumeOff;
}

setMusicIcon(false);

// Card flip animation
card.addEventListener("click", function () {
  if (!card.classList.contains("opened")) {
    card.classList.add("opened");
  }
});

// Open button - start the experience
openBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  cardOverlay.classList.add("hidden");

  setTimeout(() => {
    timelineContainer.classList.add("active");
    musicControl.style.display = "flex";

    // Reset and play music
    bgMusic.currentTime = 0;
    bgMusic
      .play()
      .then(() => {
        musicPlaying = true;
        setMusicIcon(true);
      })
      .catch(() => {
        console.log("Music autoplay prevented");
      });

    startBalloons();
    startConfetti();
    startFireworks();
    animationTimeline();
  }, 800);
});

// Music control
musicControl.addEventListener("click", function () {
  if (musicPlaying) {
    bgMusic.pause();
    setMusicIcon(false);
    musicPlaying = false;
  } else {
    bgMusic.play();
    setMusicIcon(true);
    musicPlaying = true;
  }
});

// Main GSAP Animation Timeline
function animationTimeline() {
  const textBoxChars = document.querySelector(".hbd-chatbox");
  const hbd = document.querySelector(".wish-hbd");

  if (textBoxChars) {
    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
      .split("")
      .join("</span><span>")}</span>`;
  }

  if (hbd) {
    hbd.querySelectorAll(".wish-line").forEach((line) => {
      line.innerHTML = `<span class="char">${line.textContent
        .split("")
        .join('</span><span class="char">')}</span>`;
    });
  }

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  tl = gsap.timeline();

  tl.to(".timeline-container", 0.6, { visibility: "visible" })
    .from(".section-one", 0.7, { opacity: 0, y: 10 })
    .to(".section-one", 0.7, { opacity: 0, y: 10 }, "+=2.4")
    .from(".section-two", 0.5, { opacity: 0, y: 10 })
    .to(".section-two", 0.7, { opacity: 0, y: 10 }, "+=2.1")
    .from(".section-three", 0.7, { opacity: 0, y: 10 })
    .to(".section-three", 0.7, { opacity: 0, y: 10 }, "+=2.5")
    .from(".section-four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 1, opacity: 1 })
    .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.05)
    .to(
      ".fake-btn",
      0.1,
      {
        background:
          "linear-gradient(135deg, oklch(82% 0.14 78) 0%, oklch(70% 0.17 15) 100%)",
        scale: 0.95,
        y: 2,
        boxShadow: "0 2px 5px oklch(54% 0.16 8 / 0.4)",
        ease: "power2.inOut",
      },
      "+=3.5"
    )
    .to(
      ".fake-btn",
      0.2,
      {
        scale: 1,
        y: 0,
        boxShadow: "0 5px 15px oklch(54% 0.16 8 / 0.4)",
        ease: "back.out(1.7)",
      },
      "+=0.1"
    )
    .to(".section-four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      boxShadow: "0 10px 30px oklch(54% 0.16 8 / 0.5)",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=1"
    )
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
      },
      0.2,
      "+=1.5"
    )
    .from(".section-six .profile-picture", 0.5, {
      scale: 3.5,
      opacity: 0,
      x: 25,
      y: -25,
      rotationZ: -45,
    })
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
    })
    .staggerFrom(
      ".wish-hbd .char",
      0.7,
      {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd .char",
      0.7,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "oklch(70% 0.17 15)",
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
      },
      "party"
    )
    .to(".section-six", 0.5, { opacity: 0, y: 30 }, "+=2")
    .from(".section-eighteen", 0.7, { opacity: 0, scale: 0.88, y: 16 })
    .from(".eighteen-orbit span", 0.8, {
      opacity: 0,
      scale: 0,
      stagger: 0.035,
    }, "-=0.2")
    .from(".eighteen-orbit strong", 0.7, {
      opacity: 0,
      scale: 0.65,
      rotation: -10,
    }, "-=0.45")
    .from(".eighteen-kicker", 0.45, { opacity: 0, y: 12 }, "-=0.15")
    .from(".eighteen-title", 0.55, { opacity: 0, y: 18 }, "-=0.1")
    .from(".eighteen-copy", 0.55, { opacity: 0, y: 14 }, "-=0.2")
    .to(".section-eighteen", 0.5, { opacity: 0, y: -20 }, "+=5")
    .to(".section-nine", 0.7, { opacity: 1 })
    .from(".section-nine p", 0.7, {
      opacity: 0,
      y: 20,
      scale: 0.5,
      stagger: { amount: 1, from: "start" },
      clearProps: "all",
    });

  document.getElementById("replay").addEventListener("click", () => {
    // Reset and play music again
    bgMusic.currentTime = 0;
    bgMusic
      .play()
      .then(() => {
        musicPlaying = true;
        setMusicIcon(true);
      })
      .catch(() => {
        console.log("Music autoplay prevented");
      });

    tl.restart();
  });
}

// Balloons effect
function startBalloons() {
  setInterval(() => {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.innerHTML = `
      <svg viewBox="0 0 48 72" aria-hidden="true">
        <path class="balloon-body" d="M24 4c10.5 0 18 8.7 18 20.6 0 14.4-10.3 25.6-18 25.6S6 39 6 24.6C6 12.7 13.5 4 24 4z" />
        <path class="balloon-knot" d="M20 50h8l-4 7z" />
        <path class="balloon-string" d="M24 57c-6 6 6 8 0 13" />
      </svg>
    `;
    balloon.style.left = Math.random() * 100 + "%";
    balloon.style.animationDuration = 12 + Math.random() * 8 + "s";
    balloon.style.animationDelay = Math.random() * 3 + "s";
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 15000);
  }, 1200);
}

// Confetti effect
function startConfetti() {
  const colors = [
    "oklch(70% 0.17 15)",
    "oklch(82% 0.14 78)",
    "oklch(76% 0.095 152)",
    "oklch(52% 0.14 332)",
  ];
  setInterval(() => {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = 3 + Math.random() * 2 + "s";
    confetti.style.animationDelay = Math.random() + "s";
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 6000);
  }, 150);
}

// Fireworks effect
function createFirework(x, y) {
  const colors = [
    "oklch(70% 0.17 15)",
    "oklch(82% 0.14 78)",
    "oklch(76% 0.095 152)",
    "oklch(52% 0.14 332)",
  ];
  for (let i = 0; i < 40; i++) {
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = x + "px";
    firework.style.top = y + "px";
    firework.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    const angle = (Math.PI * 2 * i) / 40;
    const velocity = 2 + Math.random() * 3;
    document.body.appendChild(firework);

    let posX = x,
      posY = y;
    let velocityX = Math.cos(angle) * velocity;
    let velocityY = Math.sin(angle) * velocity;

    const animation = setInterval(() => {
      velocityY += 0.15;
      posX += velocityX;
      posY += velocityY;
      firework.style.left = posX + "px";
      firework.style.top = posY + "px";

      if (posY > window.innerHeight) {
        clearInterval(animation);
        firework.remove();
      }
    }, 16);
  }
}

function startFireworks() {
  setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight / 2);
    createFirework(x, y);
  }, 2500);
}
