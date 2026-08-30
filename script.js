/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        // Change hamburger icon
        if (navMenu.classList.contains("active")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }

    });

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING LINK
========================================================= */

if (navMenu) {

    document.querySelectorAll("#navMenu a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            if (menuBtn) {
                menuBtn.textContent = "☰";
            }

        });

    });

}


/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

const testimonials =
    document.querySelectorAll(".testimonial");

let currentTestimonial = 0;


function showTestimonial(index) {

    if (testimonials.length === 0) {
        return;
    }

    testimonials.forEach(function (item) {

        item.classList.remove("active");

    });

    testimonials[index].classList.add("active");

}


if (testimonials.length > 1) {

    setInterval(function () {

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

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* Check Google Script URL */

            if (
                typeof GOOGLE_SCRIPT_URL === "undefined" ||
                !GOOGLE_SCRIPT_URL
            ) {

                alert(
                    "Google Sheet connection is not configured."
                );

                return;

            }


            /* Submit button */

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const oldText =
                submitButton.textContent;


            /* Get form values */

            const name =
                document.getElementById("name")
                    .value
                    .trim();

            const email =
                document.getElementById("email")
                    .value
                    .trim();

            const phone =
                document.getElementById("phone")
                    .value
                    .trim();

            const service =
                document.getElementById("service")
                    .value;

            const message =
                document.getElementById("message")
                    .value
                    .trim();


            /* Validation */

            if (!name) {

                alert("Please enter your name.");

                return;

            }


            if (!email) {

                alert("Please enter your email.");

                return;

            }


            if (!message) {

                alert("Please enter your message.");

                return;

            }


            /* Form data */

            const formData =
                new URLSearchParams();


            formData.append(
                "name",
                name
            );

            formData.append(
                "email",
                email
            );

            formData.append(
                "phone",
                phone
            );

            formData.append(
                "service",
                service
            );

            formData.append(
                "message",
                message
            );


            /* Loading */

            submitButton.disabled = true;

            submitButton.textContent =
                "Sending...";


            try {

                await fetch(
                    GOOGLE_SCRIPT_URL,
                    {
                        method: "POST",

                        mode: "no-cors",

                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded;charset=UTF-8"
                        },

                        body:
                            formData.toString()
                    }
                );


                /* Reset form */

                contactForm.reset();


                /* Success */

                submitButton.textContent =
                    "Sent Successfully ✓";


                alert(
                    "Thank you " +
                    name +
                    "!\n\nYour enquiry has been submitted successfully."
                );


                /* Restore button */

                setTimeout(function () {

                    submitButton.textContent =
                        oldText;

                    submitButton.disabled =
                        false;

                }, 3000);


            } catch (error) {

                console.error(
                    "Google Sheets Error:",
                    error
                );


                alert(
                    "Something went wrong. Please try again."
                );


                submitButton.textContent =
                    oldText;

                submitButton.disabled =
                    false;

            }

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".service-card, .course-card, .about-content, .about-image"
    );


if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(
        function (element) {

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(30px)";

            element.style.transition =
                "all 0.7s ease";

            observer.observe(
                element
            );

        }
    );

}