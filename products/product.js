document.getElementById('photoInput').addEventListener('change', function (event) {
    const preview = document.getElementById('photoPreview');
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = '#';
        preview.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submitBtn");
    const loaderOverlay = document.getElementById("customLoaderOverlay");

    if (submitBtn && loaderOverlay) {
        submitBtn.addEventListener("click", function (e) {
            e.preventDefault();

            // Step 1: Show full-screen loading animation
            submitBtn.classList.add("d-none");
            loaderOverlay.classList.remove("d-none");

            // Step 2: Simulate delay, then show alert
            setTimeout(() => {
                // Step 3: Hide loader and restore button
                loaderOverlay.classList.add("d-none");
                submitBtn.classList.remove("d-none");

                // Step 4: Show custom alert
                showAlert("✅ Product added successfully!", "success", "productAlert");
            }, 2000);
        });
    }
});
