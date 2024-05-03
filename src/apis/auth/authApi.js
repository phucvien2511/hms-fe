import ApiCall from '../config';
import DOMPurify from 'dompurify';

class AuthApi extends ApiCall {
    async login(username, password) {
        const endpoint = '/login';

        // Validate the inputs
        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        // Sanitize the inputs
        const sanitizedUsername = this.sanitize(username);
        const sanitizedPassword = this.sanitize(password);

        const body = {
            username: sanitizedUsername,
            password: sanitizedPassword,
        };

        try {
            const response = await this.post(endpoint, body);
            return response;
        } catch (error) {
            // Handle error
            console.error(error);
            throw new Error('Login failed');
        }
    }

    sanitize(input) {
        return DOMPurify.sanitize(input);
    }

    async signup(username, password, phoneNumber) {
        const endpoint = '/signup';

        // Validate the inputs
        if (!username || !password || !phoneNumber) {
            throw new Error('Username, password, and phone number are required');
        }

        // Sanitize the inputs
        const sanitizedUsername = this.sanitize(username);
        const sanitizedPassword = this.sanitize(password);
        const sanitizedPhoneNumber = this.sanitize(phoneNumber);

        const body = {
            username: sanitizedUsername,
            password: sanitizedPassword,
            phoneNumber: sanitizedPhoneNumber,
        };

        // Send the POST request to the signup endpoint
        const response = await this.post(endpoint, body);

        return response.data;
    }
}

export default AuthApi;