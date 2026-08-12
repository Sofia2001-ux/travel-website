window.onerror = function() { return true; };
// ==========================================
// 🏡 HOMEPAGE NAVBAR HAMBURGER INTERACTION (SAFE CHECK)
// ==========================================
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

// ✨ SAFE CHECK: 
if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('open');
    });
}

// ==========================================
// ⚡ HIGH-SPEED SMOOTH COUNT-UP LOGIC (FIXED)
// ==========================================
// 'querySelectorAll' 
const counterElements = document.querySelectorAll('#touristCounter');

counterElements.forEach(counterElement => {
    const targetValue = parseInt(counterElement.getAttribute('data-target'));
    let count = 0;
    const duration = 1200; // Poori animation 1.2 seconds me wrap up hogi
    const stepTime = Math.max(Math.floor(duration / targetValue), 10); 

    const updateCounter = () => {
        // Agar bada number ho (jaise 150), to counting tez karne k liye chunks me add karein
        if (targetValue > 50) {
            count += Math.ceil(targetValue / 40); 
        } else {
            count++;
        }

        if (count < targetValue) {
            counterElement.innerText = count;
            setTimeout(updateCounter, stepTime);
        } else {
            counterElement.innerText = targetValue; // Final value lock
        }
    };

    // Har individual counter ko automatic trigger karega loading ke baad
    setTimeout(updateCounter, 200);
});

// ==========================================
// ⚡ NAVBAR BACKGROUND TOGGLE ON SCROLL
// ==========================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.main-navbar');
    
    // Agar page 50px se zyada scroll ho toh solid background lagao, warna transparent
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// ==========================================
// ⚡ INNER PAGES NAVBAR HAMBURGER INTERACTION
// ==========================================
const innerMenuBtn = document.getElementById('innerMenuBtn');
const innerNavMenu = document.getElementById('innerNavMenu');

if (innerMenuBtn && innerNavMenu) {
    innerMenuBtn.addEventListener('click', () => {
        innerMenuBtn.classList.toggle('open');
        innerNavMenu.classList.toggle('open');
    });
}
// ==========================================
// GALLERY LIGHTBOX
// ==========================================

const albumsPool = {

    // ======================================
    // HUNZA
    // ======================================

    hunza: {
        title: "Hunza Valley",
        images: [

            "hunza valley/Attabad Lake.jpg",

            "hunza valley/Altit Fort.jfif",

            "hunza valley/eagle nest.jpg",

            "hunza valley/Hussaini Suspension.jfif",

            "hunza valley/passu cones.jfif",

            "hunza valley/Baltit fort.jfif"

        ]
    },


    // ======================================
    // SKARDU
    // ======================================

    skardu: {
        title: "Skardu & Deosai",
        images: [

            "skardu/skardu 6.jfif",
            "skardu/skardu 2.jpg",
            "skardu/skardu 3.jfif",
            "skardu/skardu 5.jfif",
            "skardu/skardu 1.jpg",
            "skardu/skardu 4.jfif",
            "skardu/Upper Kachura Lake.jfif"

        ]
    },


    // ======================================
    // SWAT
    // ======================================

    swat: {
        title: "Swat Valley & Malam Jabba",
        images: [

            "swat/swat 3.jfif",
            "swat/swat 2.jpg",
            "swat/swat 4.jpg",
            "swat/swat 1.jpg",
            "swat/swat 5.jpg",
            "swat/swat 6.jpg"

        ]
    },


    // ======================================
    // NARAN
    // ======================================

    naran: {
        title: "Naran Kaghan",
        images: [

            "naran/naran 3.jpg",
            "naran/naran 2.jpg",
            "naran/naran 1.jpg",
            "naran/naran 4.jpg",
            "naran/naran 5.jfif",
            "naran/naran 6.jfif"

        ]
    },


    // ======================================
    // KASHMIR
    // ======================================

    kashmir: {
        title: "Azad Kashmir",
        images: [

            "kashmir/kashmir 1.jfif",
           "kashmir/kel Neelam valley Azad Kashmir.jfif",
           "kashmir/kashmir 2.jpg",
           "kashmir/kashmir 3.jfif",
           "kashmir/kashmir 4.jfif",
           "kashmir/kashmir 5.jpg"

        ]
    },


    // ======================================
    // MURREE
    // ======================================

    murree: {
        title: "Murree Hills & Patriata",
        images: [

            "murree/murree 1.jfif",
            "murree/murree 2.jpg",
            "murree/murree 3.jfif",
            "murree/murree 4.jfif",
            "murree/murree 5.jpg",
            "murree/murree 6.jfif",

        ]
    }

};


// ==========================================
// CURRENT ALBUM STATE
// ==========================================

let activeAlbum = "";
let activeIndex = 0;


// ==========================================
// OPEN LIGHTBOX
// ==========================================

function openLightbox(albumKey) {

    if (!albumsPool[albumKey]) {
        console.error("Album not found:", albumKey);
        return;
    }

    activeAlbum = albumKey;
    activeIndex = 0;

    const modal =
        document.getElementById("galleryLightbox");

    if (!modal) return;

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";

    renderActiveSlide();
}


// ==========================================
// CLOSE LIGHTBOX
// ==========================================

function closeLightbox() {

    const modal =
        document.getElementById("galleryLightbox");

    if (!modal) return;

    modal.style.display = "none";

    document.body.style.overflow = "";
}


// ==========================================
// CHANGE SLIDE
// ==========================================

function changeSlide(direction) {

    if (!activeAlbum) return;

    const images =
        albumsPool[activeAlbum].images;

    activeIndex += direction;


    // Last → First
    if (activeIndex >= images.length) {
        activeIndex = 0;
    }


    // First → Last
    if (activeIndex < 0) {
        activeIndex = images.length - 1;
    }

    renderActiveSlide();
}


// ==========================================
// SHOW CURRENT IMAGE
// ==========================================

function renderActiveSlide() {

    const album =
        albumsPool[activeAlbum];

    const image =
        document.getElementById("lightboxImg");

    const caption =
        document.getElementById("lightboxCaption");

    if (!album || !image || !caption) return;


    // Change image
    image.src =
        album.images[activeIndex];


    // Caption
    caption.innerHTML =
        `Album: <span>${album.title}</span>
        (${activeIndex + 1} of ${album.images.length})`;


    // Accessibility
    image.alt =
        `${album.title} - Photo ${activeIndex + 1}`;
}


// ==========================================
// KEYBOARD CONTROLS
// ==========================================

window.addEventListener("keydown", function (event) {

    const modal =
        document.getElementById("galleryLightbox");

    if (!modal ||
        modal.style.display !== "flex") {
        return;
    }


    // Escape
    if (event.key === "Escape") {

        closeLightbox();

    }


    // Previous
    else if (event.key === "ArrowLeft") {

        changeSlide(-1);

    }


    // Next
    else if (event.key === "ArrowRight") {

        changeSlide(1);

    }

});


// ==========================================
// CLICK OUTSIDE IMAGE TO CLOSE
// ==========================================

document.addEventListener("click", function (event) {

    const modal =
        document.getElementById("galleryLightbox");

    const frame =
        document.querySelector(".lightbox-image-frame");

    if (
        modal &&
        event.target === modal
    ) {

        closeLightbox();

    }

});
