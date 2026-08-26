/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

    });

});


/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

const testimonials =
    document.querySelectorAll(".testimonial");

let currentTestimonial = 0;

function showTestimonial(index) {

    testimonials.forEach(item => {
        item.classList.remove("active");
    });

    if (testimonials.length > 0) {
        testimonials[index].classList.add("active");
    }

}

if (testimonials.length > 1) {

    setInterval(() => {

        currentTestimonial++;

        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }

        showTestimonial(currentTestimonial);

    }, 4000);

}


/* =========================================================
   GOOGLE SHEETS CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        /* Google Apps Script URL */

        const scriptURL = GOOGLE_SCRIPT_URL;


        /* Get form values */

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const service =
            document.getElementById("service").value;

        const message =
            document.getElementById("message").value.trim();


        /* Basic validation */

        if (!name || !email || !message) {

            alert(
                "Please fill in Name, Email and Message."
            );

            return;

        }


        /* Submit button */

        const submitButton =
            contactForm.querySelector(
                'button[type="submit"]'
            );


        const originalText =
            submitButton.textContent;


        submitButton.disabled = true;

        submitButton.textContent =
            "Sending...";


        /* Form data */

        const formData = new URLSearchParams();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("service", service);
        formData.append("message", message);


        try {

            await fetch(scriptURL, {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8"
                },

                body: formData.toString()

            });


            /* Success */

            contactForm.reset();

            submitButton.textContent =
                "Sent Successfully ✓";


            alert(
                `Thank you ${name}!\n\nYour enquiry has been submitted successfully.`
            );


            setTimeout(() => {

                submitButton.textContent =
                    originalText;

                submitButton.disabled =
                    false;

            }, 3000);


        } catch (error) {

            console.error(
                "Google Sheets Error:",
                error
            );


            alert(
                "Unable to submit your enquiry. Please try again."
            );


            submitButton.textContent =
                originalText;

            submitButton.disabled =
                false;

        }

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".service-card, .course-card, .about-content, .about-image"
    );


if ("IntersectionObserver" in window) {

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

        element.style.transform =
            "translateY(30px)";

        element.style.transition =
            "all 0.7s ease";

        observer.observe(element);

    });

}