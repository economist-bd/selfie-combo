// Wait for the DOM to be fully loaded before running the script
        document.addEventListener("DOMContentLoaded", function() {

            // --- Dynamic Price Calculation for Checkout ---
            
            // Get all the necessary elements
            const shippingOptions = document.querySelectorAll('input[name="shipping"]');
            const totalPriceElement = document.getElementById('total-price');
            const shippingCostFinalInput = document.getElementById('shipping-cost-final');
            const totalPriceFinalInput = document.getElementById('total-price-final');
            
            // Define the base product price (Subtotal)
            const subtotal = 650;

            // Function to update the total price
            function updateTotalPrice() {
                const selectedShipping = document.querySelector('input[name="shipping"]:checked');
                
                let shippingCost = 0;
                if (selectedShipping) {
                    shippingCost = parseInt(selectedShipping.value);
                } else {
                    // যদি কোনো শিপিং অপশন সিলেক্ট করা না থাকে, তাহলে শুধুমাত্র সাবটোটাল দেখাবে
                    totalPriceElement.innerText = `৳ ${subtotal}.00`;
                    shippingCostFinalInput.value = ''; // Reset hidden field
                    totalPriceFinalInput.value = subtotal;
                    return;
                }
                
                // Calculate the new total price
                const newTotal = subtotal + shippingCost;
                
                // Update the total price on the page
                totalPriceElement.innerText = `৳ ${newTotal}.00`;

                // Update the hidden fields for Formspree
                shippingCostFinalInput.value = shippingCost;
                totalPriceFinalInput.value = newTotal;
            }

            // Initial call to set the default total price display (only subtotal)
            updateTotalPrice();

            // Add an event listener to each shipping radio button
            shippingOptions.forEach(option => {
                option.addEventListener('change', updateTotalPrice);
            });

            // --- Form Submission Handler (Demo + Formspree Integration) ---
            const orderForm = document.getElementById('2738525186402810953');
            
            orderForm.addEventListener('submit', function(event) {
                
                // Check which shipping option is selected
                const selectedShipping = document.querySelector('input[name="shipping"]:checked');
                
                if (!selectedShipping) {
                    // Prevent submission and show alert if no shipping option is selected
                    event.preventDefault(); 
                    alert('অনুগ্রহ করে একটি ডেলিভারি অপশন সিলেক্ট করুন।');
                    return;
                }

                // If a shipping option is selected, the Formspree submission will proceed.
                // You can add your demo alert before or after submission (or remove it).
                
                // ⚠️ NOTE: The 'action="https://formspree.io/f/mkgklkga"' in the <form> tag handles the submission.
                // The JavaScript Form Submission Handler section from your original code is now redundant 
                // for the actual Formspree submission, but I've kept the total calculation and 
                // alert logic for demonstration/validation.
                
                const shippingCost = parseInt(selectedShipping.value);
                const total = subtotal + shippingCost;
                
                // Show a confirmation alert (This is a demo, it will execute before Formspree handles the POST request)
                alert(
                    `অর্ডারটি কনফার্ম করা হচ্ছে...\n` +
                    `মোট মূল্য: ৳ ${total}\n` +
                    `এই ফর্মটি Formspree-এর মাধ্যমে জমা হবে।`
                );

                // Optionally, you can prevent the default submission and use fetch/XHR
                // for a single-page app experience, but for Formspree, letting the default
                // action occur is the standard method unless you handle the response manually.
                
                // **Important:** We rely on the form's native submission to Formspree,
                // so we don't call event.preventDefault() here, *unless* the shipping 
                // option is missing (handled above).
            });

        });
