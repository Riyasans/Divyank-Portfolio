/* ================================
   MOBILE MENU
================================ */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


/* Close menu after clicking link */

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


/* ================================
   TESTIMONIAL SLIDER
================================ */

const testimonials =
    document.querySelectorAll(".testimonial");

let currentTestimonial = 0;

function showTestimonial(index) {

    testimonials.forEach(item => {
        item.classList.remove("active");
    });

    testimonials[index].classList.add("active");
}


setInterval(() => {

    currentTestimonial++;

    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    }

    showTestimonial(currentTestimonial);

}, 4000);


/* ================================
   CONTACT FORM
================================ */

const contactForm =
    document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const service =
        document.getElementById("service").value;

    alert(
        `Thank you ${name}!\n\nYour enquiry for ${service || "Astrology Consultation"} has been received.`
    );

    contactForm.reset();

});


/* ================================
   SCROLL REVEAL
================================ */

const revealElements =
    document.querySelectorAll(
        ".service-card, .course-card, .about-content, .about-image"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.7s ease";

    observer.observe(element);

});