class Http {
    post(url, options) {
        return fetch(url, this.#getOptions("POST", options)).then((response) => {
            return response.json();
        });
    }

    get(url, options) {
        return fetch(url, this.#getOptions("GET", options)).then((response) => {
            return response.json();
        });
    }

    put(url, options) {
        return fetch(url, this.#getOptions("PUT", options)).then((response) => {
            return response.json();
        });
    }

    delete(url, options) {
        return fetch(url, this.#getOptions("DELETE", options)).then((response) => {
            return response.json();
        });
    }

    #getOptions(method, otherOptions) {
        const baseOptions = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        };

        return Object.assign({}, baseOptions, otherOptions);
    }
}

export default new Http();