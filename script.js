const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector('button[type="submit"]');

        const oldText = submitButton.textContent;

        const formData = new URLSearchParams();

        formData.append(
            "name",
            document.getElementById("name").value.trim()
        );

        formData.append(
            "email",
            document.getElementById("email").value.trim()
        );

        formData.append(
            "phone",
            document.getElementById("phone").value.trim()
        );

        formData.append(
            "service",
            document.getElementById("service").value
        );

        formData.append(
            "message",
            document.getElementById("message").value.trim()
        );

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: formData
            });

            contactForm.reset();

            submitButton.textContent = "Sent Successfully ✓";

            alert("Your enquiry has been submitted successfully.");

            setTimeout(() => {
                submitButton.textContent = oldText;
                submitButton.disabled = false;
            }, 3000);

        } catch (error) {

            console.error(error);

            alert("Something went wrong. Please try again.");

            submitButton.textContent = oldText;
            submitButton.disabled = false;
        }

    });

}