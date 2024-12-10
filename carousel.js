// Tying our variables to our CSS elements by their assosciated IDs
let rightBtn = document.getElementById('rightbtn');
let leftBtn = document.getElementById('leftbtn');
let professional = document.getElementById('professional');
let travelblog = document.getElementById('travelblog');
let happytails = document.getElementById('happytails');

// Variables for our animation handling
let appState = { state: 0 }; // This is our global state, which is passed into our array
let slides = [professional, travelblog, happytails]; // Array that has all our current slides in it
let isAnimating = false; // Bool for stopping animations from overlapping

// On click, as long as there is not an ongoing animation, call rightButtonSlide
rightBtn.addEventListener('click', () => {
    if (!isAnimating) {
        rightButtonSlide();
    }
});
// On click, as long as there is not an ongoing animation, call leftButtonSlide
leftBtn.addEventListener('click', () => {
    if (!isAnimating) {
        leftButtonSlide();
    }
});

// Function to handle the animation of slides when the right button "Next" is pressed
// The async tag lets us use await in the middle of our function, which then allows us
// to pause the function until a certain condition is met
async function rightButtonSlide() {
    // Sets animating flag to stop overlapping animations
    isAnimating = true;
    //  Variables that handle the current state of slides
    let currentSlide = slides[appState.state];
    let nextSlide = slides[(appState.state + 1) % slides.length];
    // Iterates through our array removing all of the animation classes before continuing, this "cleans" our outputs so that we do not keep classes that are no longer applicable
    slides.forEach(slide => {
        slide.classList.remove('slideleft', 'slideleftin', 'slideright', 'sliderightin')
    });
    // This slides the current slide to the left through CSS animation
    currentSlide.classList.add('slideleft');
    // This slides our next slide in from the right and makes it display flex instead of none
    nextSlide.classList.add('sliderightin');
    nextSlide.style.display = "flex";
    // This calls a function that will wait for the current slide to finish its animation
    // before continuing the rest of the function
    await waitForAnimationEnd(currentSlide);
    // Sets the current slide to not display so that it is not making the browser size wonky
    currentSlide.style.display = "none";
    // Sets our current state to + 1 of our current state, then if that state is larger
    // Than the current length of the array, the use of modulus lets us wrap back to 
    // The start of the array, which is 0
    appState.state = (appState.state + 1) % slides.length;
    // Set our bool to false so the next animation can begin if neccesary
    isAnimating = false;
}

async function leftButtonSlide() {
    isAnimating = true;

    let currentSlide = slides[appState.state];
    let nextSlide = slides[(appState.state - 1 + slides.length) % slides.length];

    slides.forEach(slide => {
        slide.classList.remove('slideleft', 'slideleftin', 'slideright', 'sliderightin')
    });

    currentSlide.classList.add('slideright');

    nextSlide.classList.add('slideleftin');
    nextSlide.style.display = "flex";

    await waitForAnimationEnd(currentSlide);

    currentSlide.style.display = "none";

    appState.state = (appState.state - 1 + slides.length) % slides.length;

    isAnimating = false;
}

//Function that handles animation ending for our async functions
function waitForAnimationEnd(element) {
    // Sets a promise which I only vaguely understand, basically this won't return
    // Until the resolve is called, which allows us to theoretically go through multiple
    // Different paths, however here we are just using it to pause a function
    // thanks chuck
    return new Promise(resolve => {
        element.addEventListener('animationend', function handleAnimationEnd() {
            element.removeEventListener('animationend', handleAnimationEnd);
            resolve();
        });
    });
}