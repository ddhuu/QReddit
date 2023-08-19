"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterInput = void 0;
const validateRegisterInput = (registerInput) => {
    if (!registerInput.email.includes('@')) {
        return {
            message: 'Invalid email',
            error: [{
                    field: 'email',
                    message: 'Email must include @ symbol'
                }
            ]
        };
    }
    if (registerInput.username.length <= 4) {
        return {
            message: 'Invalid username',
            error: [
                {
                    field: 'username',
                    message: ' Length  must be at least 4 characters'
                }
            ]
        };
    }
    if (registerInput.password.length <= 4) {
        return {
            message: 'Invalid Password',
            error: [
                {
                    field: 'password',
                    message: ' Length  must be at least 4 characters'
                }
            ]
        };
    }
    return null;
};
exports.validateRegisterInput = validateRegisterInput;
//# sourceMappingURL=validateRegisterInput.js.map