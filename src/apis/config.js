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
            headers: {
                'Content-Type': 'application/json',
            },
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
    async put(endpoint, body) {
        try {
            const response = await this.client.put(endpoint, body);
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

    async delete(endpoint) {
        try {
            const response = await this.client.delete(endpoint);
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

}
//const BASE_API_URL_TEST = "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole";
const BASE_API_URL = "http://localhost:8081/api/v1";
const _API_CLIENT = new ApiBase(BASE_API_URL);

class ApiCall {
    constructor() {
        this.client = _API_CLIENT;
    }

    async get(endpoint) {
        return await this.client.get(endpoint);
    }

    async post(endpoint, body) {
        return await this.client.post(endpoint, body);
    }

    async put(endpoint, body) {
        return await this.client.put(endpoint, body);
    }

    async delete(endpoint) {
        return await this.client.delete(endpoint);
    }
}

// const ApiCall = new _ApiCall();

export default ApiCall;
