$(document).ready(function () {

    $('#togglePassword').on('change', function () {
        const passwordField = $('#password');
        const type = this.checked ? 'text' : 'password';
        passwordField.attr('type', type);
    });

    // On form submit
    $('#submit').on('click', function (e) {
        e.preventDefault(); // Stop actual form submission

        const messageBox = $('#messageBox');
        messageBox.removeClass('error success').text('').css('visibility', 'hidden');

        // Get all input values
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const phone = $('#phone').val().trim();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPass').val();

        // Check for empty fields
        if (!name || !email || !phone || !password || !confirmPassword) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Phone must be exactly 10 digits
        if (!/^\d{10}$/.test(phone)) {
            showMessage('Phone number must be exactly 10 digits.', 'error');
            return;
        }

        // Password format validation
        if (!isValidPassword(password)) {
            showMessage('Password must be at least 8 characters, include uppercase, lowercase, and a number.', 'error');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            showMessage('Passwords do not match.', 'error');
            return;
        }

        // All good
        showMessage('Form submitted successfully!', 'success');
    });

    // Show messages
    function showMessage(msg, type) {
        $('#messageBox')
            .removeClass('error success')
            .addClass(type)
            .text(msg)
            .css('visibility', 'visible');
    }

    // Check valid email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Check password format
    function isValidPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    }

});
    // Allow only digits in the phone input
    $('#phone').on('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });
