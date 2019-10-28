const { check } = require('express-validator');

const validate = require('./validator');

module.exports = {
    edit: [ 
        // Email validation.
        check('email')
            .not().isEmpty().withMessage('Email field is required')
            .isEmail().withMessage('Invalid email'),

        // Password validation.
        check('password').optional(),
        
        // Validate params.
        validate
    ]
};
