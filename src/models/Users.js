const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,  // Optionally add trim to remove whitespace
        lowercase: true,  // Optionally convert email to lowercase
        // Add a custom validator for email format
        validate: {
            validator: function(v) {
                // Basic email format validation
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
});

const User = mongoose.models.User || mongoose.model("User", signupSchema);

module.exports = User;
