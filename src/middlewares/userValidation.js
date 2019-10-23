const { check, validationResult } = require('express-validator');

// Execute validations.
const validateParams = (req, res, next) => {
    const validator = validationResult(req);

    if (!validator.isEmpty()) {
        const [error] = validator.array({ onlyFirstError: true });

        return res.status(401).json({ error: error.msg });
    }

    return next();
}

// User validator middleware.
module.exports = {
    // Validate edit method params.
    edit: [ 
        // Email validation.
        check('email')
            .not().isEmpty().withMessage('Email field is required')
            .isEmail().withMessage('Invalid email'),

        // Password validation.
        check('password').optional(),

        validateParams
    ]
};