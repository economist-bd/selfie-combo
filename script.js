    // Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {

    // --- Dynamic Price Calculation for Checkout ---
    
    // Get all the necessary elements
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    const totalPriceElement = document.getElementById('total-price');
    
    // Define the base product price (Subtotal)
    const subtotal = 650;

    // Add an event listener to each shipping radio button
    shippingOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Get the selected shipping cost
            // parseInt() converts the string value to a number
            const shippingCost = parseInt(this.value);
            
            // Calculate the new total price
            const newTotal = subtotal + shippingCost;
            
            // Update the total price on the page
            totalPriceElement.innerText = `৳ ${newTotal}.00`;
        });
    });

    // --- Form Submission Handler (Demo) ---
    const orderForm = document.getElementById('2738525186402810953');
    
    orderForm.addEventListener('submit', function(event) {
        // Prevent the form from actually submitting (which would reload the page)
        event.preventDefault(); 
        
        // Get form values (You can send this data to your server or Google Sheet)
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        
        // Check which shipping option is selected
        const selectedShipping = document.querySelector('input[name="shipping"]:checked');
        
        if (!selectedShipping) {
            alert('অনুগ্রহ করে একটি ডেলিভারি অপশন সিলেক্ট করুন।');
            return;
        }
        
        const shippingCost = parseInt(selectedShipping.value);
        const total = subtotal + shippingCost;
        
        // Show a confirmation alert (This is a demo)
        alert(
            `অর্ডারটি কনফার্ম করা হয়েছে! (ডেমো)\n` +
            `নাম: ${name}\n` +
            `ফোন: ${phone}\n` +
            `মোট মূল্য: ৳ ${total}`
        );
        
        // You can reset the form after submission
        orderForm.reset();
        totalPriceElement.innerText = `৳ ${subtotal}.00`;
    });

});
