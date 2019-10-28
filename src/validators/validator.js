const { validationResult } = require('express-validator');

// Validate request body params.
module.exports = (req, res, next) => {
    const validator = validationResult(req);

    if (!validator.isEmpty()) {
        const [error] = validator.array({ onlyFirstError: true });

        return res.status(401).json({ error: error.msg });
    }

    return next();
}