hero_strings = [
    "T-Shirts & Apparel",
    "From custom t-shirts and hoodies to sweatpants and jeans, we ensure every print pops with vibrant colors and crisp details.",
    "Event Merchandise",
    "Create standout gear for your event with personalized designs that leave a lasting impression.",
    "Business Branding",
    "Outfit your team with branded apparel that showcases your team spirit and professionalism.",
]

var current = 0;
function cycleHeroText() {
    var title = document.getElementById("hero_cycle_title");
    var text = document.getElementById("hero_cycle_text");
    title.classList.add("fade");
    text.classList.add("fade");

    setTimeout(function() {
        current = (current + 2) % hero_strings.length;
        title.innerHTML = hero_strings[current];
        text.innerHTML = hero_strings[(current + 1) % hero_strings.length];
        title.classList.remove("fade");
        text.classList.remove("fade");
    }, 1000);
}

setInterval(cycleHeroText, 7500);

var slides = document.getElementsByClassName("slideshow_slide");
var current_slide = 0;
var slide_count = slides.length;
for (var i = 0; i < slides.length; i++) {
    var textinfo = slides[i].getElementsByClassName("slide_textinfo")[0];
    textinfo.innerHTML = (i + 1) + " / " + slides.length;
}

function showSlide(index) {
    if (index < 0) {
        index = slide_count - 1;
    }
    if (index >= slide_count) {
        index = 0;
    }

    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.add("hidden");
    }

    slides[index].classList.remove("hidden");
}

function nextSlide() {
    current_slide = (current_slide + 1) % slide_count;
    showSlide(current_slide);
}

function prevSlide() {
    current_slide = current_slide - 1;
    if (current_slide < 0) {
        current_slide = slide_count - 1;
    }
    showSlide(current_slide);
}

showSlide(0);