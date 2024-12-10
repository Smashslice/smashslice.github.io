// Tying our variables to our CSS elements by their assosciated IDs
let rightBtn1 = document.getElementById('rightbtn1');
let leftBtn1 = document.getElementById('leftbtn1');
let hilton = document.getElementById('hilton');
let extrusion = document.getElementById('extrusion');
let tower = document.getElementById('tower');

// Variables for our animation handling
let appState = { state: 0 }; // This is our global state, which is passed into our array
let slides1 = [hilton, extrusion, tower]; // Array that has all our current slides in it
let isAnimating = false; // Bool for stopping animations from overlapping

// Define a function to initialize a slider
function createSlider(leftBtnId, rightBtnId, slideIds) {
    const leftBtn = document.getElementById(leftBtnId);
    const rightBtn = document.getElementById(rightBtnId);
    const slides = slideIds.map(id => document.getElementById(id));
    let state = 0; // Initial state
    let isAnimating = false;

    // Function to handle right button click
    async function rightButtonSlide() {
        if (isAnimating) return;
        isAnimating = true;

        let currentSlide = slides[state];
        let nextSlide = slides[(state + 1) % slides.length];

        slides.forEach(slide => slide.classList.remove('fadeout', 'fadein', 'slidein'));

        currentSlide.classList.add('fadeout');
        await waitForAnimationEnd(currentSlide);

        currentSlide.style.display = "none";

        nextSlide.style.display = "flex";
        nextSlide.classList.add('fadein');
        nextSlide.classList.add('slidein');

        await waitForAnimationEnd(nextSlide);

        state = (state + 1) % slides.length;
        isAnimating = false;
    }

    // Function to handle left button click
    async function leftButtonSlide() {
        if (isAnimating) return;
        isAnimating = true;

        let currentSlide = slides[state];
        let prevSlide = slides[(state - 1 + slides.length) % slides.length];

        slides.forEach(slide => slide.classList.remove('fadeout', 'fadein', 'slidein'));

        currentSlide.classList.add('fadeout');
        await waitForAnimationEnd(currentSlide);

        currentSlide.style.display = "none";

        prevSlide.style.display = "flex";
        prevSlide.classList.add('fadein');
        prevSlide.classList.add('slidein');

        await waitForAnimationEnd(prevSlide);

        state = (state - 1 + slides.length) % slides.length;
        isAnimating = false;
    }

    // Attach event listeners
    rightBtn.addEventListener('click', rightButtonSlide);
    leftBtn.addEventListener('click', leftButtonSlide);
}

// Function to wait for animations to complete
function waitForAnimationEnd(element) {
    return new Promise(resolve => {
        element.addEventListener('animationend', function handleAnimationEnd() {
            element.removeEventListener('animationend', handleAnimationEnd);
            resolve();
        });
    });
}

// Initialize sliders
createSlider('leftbtn1', 'rightbtn1', ['hilton', 'extrusion', 'tower']);
createSlider('leftbtn2', 'rightbtn2', ['semester1', 'semester2', 'semester3', 'semester4']);