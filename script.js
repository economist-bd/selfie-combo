document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Dynamic Price Calculation ---
    
    const shippingOptions = document.querySelectorAll('input[name="shipping_method"]');
    const totalPriceElement = document.getElementById('total-price');
    const hiddenTotalInput = document.getElementById('hidden-total');
    const subtotal = 650;

    // Function to update price
    function updatePrice(cost) {
        const total = subtotal + parseInt(cost);
        totalPriceElement.innerText = `৳ ${total}.00`;
        hiddenTotalInput.value = total; // Update hidden input for email
    }

    // Initialize with default checked option (Inside Dhaka: 60)
    updatePrice(60);

    // Listen for changes
    shippingOptions.forEach(option => {
        option.addEventListener('change', function() {
            const cost = this.getAttribute('data-cost');
            updatePrice(cost);
        });
    });

    // --- 2. Formspree Submission (AJAX) ---

    const form = document.getElementById("order-form");
    const statusMsg = document.getElementById("status-message");
    const submitBtn = document.getElementById("submit-btn");

    async function handleSubmit(event) {
        event.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerText = "অর্ডার প্রসেসিং হচ্ছে...";
        statusMsg.innerText = "";

        const data = new FormData(event.target);

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Success
                statusMsg.style.color = "green";
                statusMsg.innerHTML = "ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে। <br> আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো।";
                form.reset(); // Clear form
                submitBtn.innerText = "অর্ডার কনফার্ম করুন";
                submitBtn.disabled = false;
                
                // Reset price to default
                document.getElementById("dhaka").checked = true;
                updatePrice(60);
            } else {
                // Error from Formspree
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        statusMsg.style.color = "red";
                        statusMsg.innerText = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        statusMsg.style.color = "red";
                        statusMsg.innerText = "দুঃখিত, অর্ডার সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
                    }
                    submitBtn.disabled = false;
                    submitBtn.innerText = "অর্ডার কনফার্ম করুন";
                });
            }
        }).catch(error => {
            // Network Error
            statusMsg.style.color = "red";
            statusMsg.innerText = "নেটওয়ার্ক সমস্যা। দয়া করে আবার চেষ্টা করুন।";
            submitBtn.disabled = false;
            submitBtn.innerText = "অর্ডার কনফার্ম করুন";
        });
    }

    form.addEventListener("submit", handleSubmit);
});
