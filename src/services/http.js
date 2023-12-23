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

    #getOptions(method, otherOptions) {
        const baseOptions = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        return Object.assign({}, baseOptions, otherOptions);
    }
}

export default new Http();