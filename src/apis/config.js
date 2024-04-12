/* Usage:
import ApiCall from ...;

...

const fetchData = async () => {
    const response = await ApiCall.get("/total/doctors"); // If you want to make GET request
    if (response.success) {
        ...Do something with response.data...
    } else {
        ...Do something with response.error...
    }
};

...
fetchData(); // Call it somewhere in your code.
*/

import axios from 'axios';

class ApiBase {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL: baseURL,
        });
    }

    async get(endpoint) {
        try {
            const response = await this.client.get(endpoint);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                error,
            };
        }
    }

    async post(endpoint, body) {
        try {
            const response = await this.client.post(endpoint, body);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                error,
            };
        }
    }

    // Add more methods as needed (put, delete, etc.)
}
const BASE_API_URL_TEST = "https://cat-fact.herokuapp.com";
const _API_CLIENT = new ApiBase(BASE_API_URL_TEST);

class _ApiCall {
    constructor() {
        this.client = _API_CLIENT;
    }

    async get(endpoint) {
        return await this.client.get(endpoint);
    }

    async post(endpoint, body) {
        return await this.client.post(endpoint, body);
    }

}

const ApiCall = new _ApiCall();

export default ApiCall;
