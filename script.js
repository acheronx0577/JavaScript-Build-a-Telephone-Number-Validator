document.getElementById("check-btn").addEventListener("click", function() {
    const userInput = document.getElementById("user-input").value.trim();
    const resultsDiv = document.getElementById("results-div");
    
    if (userInput === "") {
        alert("Please provide a phone number.");
        return;
    }
    
    const isValid = validatePhoneNumber(userInput);
    if (isValid) {
        resultsDiv.textContent = `Valid US number: ${userInput}`;
    } else {
        resultsDiv.textContent = `Invalid US number: ${userInput}`;
    }
});

document.getElementById("clear-btn").addEventListener("click", function() {
    document.getElementById("results-div").textContent = "";
});

function validatePhoneNumber(phoneNumber) {
    // Remove all non-alphanumeric characters except spaces, parentheses, and dashes
    const cleaned = phoneNumber.replace(/[^\d\s\(\)-]/g, '');
    
    // US phone number validation patterns
    const patterns = [
        /^1?\s?\d{3}-\d{3}-\d{4}$/,                    // 555-555-5555 or 1-555-555-5555
        /^1?\s?\(\d{3}\)\s?\d{3}-\d{4}$/,              // (555)555-5555 or 1 (555)555-5555
        /^\d{10}$/,                                    // 5555555555
        /^1\s\d{3}\s\d{3}\s\d{4}$/                     // 1 555 555 5555
    ];
    
    // Check if the number matches any valid pattern
    for (let pattern of patterns) {
        if (pattern.test(phoneNumber)) {
            // Additional validation for country code and area code
            const digitsOnly = phoneNumber.replace(/\D/g, '');
            
            // If there's a country code, it must be 1
            if (digitsOnly.length === 11 && digitsOnly[0] !== '1') {
                return false;
            }
            
            // Area code must be between 200-999 (cannot start with 0 or 1)
            const areaCode = digitsOnly.length === 11 ? digitsOnly.substring(1, 4) : digitsOnly.substring(0, 3);
            if (areaCode[0] === '0' || areaCode[0] === '1') {
                return false;
            }
            
            return true;
        }
    }
    
    return false;
}