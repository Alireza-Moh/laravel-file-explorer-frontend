import axios from "axios";
import CSRFException from "@/exceptions/CSRFException.js";

export default class Api {
    constructor(baseUrl) {
        this.http = axios.create({
            baseURL: baseUrl,
            withCredentials: true
        });
    }

    post(url, data, options = {}, withCsrfToken = true) {
        if(withCsrfToken) {
            return this.fetchCsrfToken().then(response => {
                this.http.defaults.headers.common['X-CSRF-TOKEN'] = response.data.data.csrfToken;

                return this.http.post(url, data, options);
            })
        }
        return this.http.post(url, data, {});
    }

    get(url) {
        return this.http.get(url);
    }

    fetchCsrfToken() {
        return this.http.get('csrf').then(response => {
            return response;
        }).catch(exception => {
            throw new CSRFException('Failed to fetch CSRF token');
        });
    }
}