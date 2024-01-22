import Http from "@/services/http.js";


describe('Http', () => {
    const options = {
        body: JSON.stringify({
            name: "tests"
        })
    };
    beforeEach(() => {
        Object.defineProperty(window, 'showAlert', {
            writable: true,
            configurable: true,
            value: vi.fn()
        });
    });

    test('should get method returns data when fetch response is ok', async ({ is }) => {
        const responseData = {
            "result": {
                "status": "success",
                "data": [1, 2, 3]
            }
        };
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(responseData),
            })
        )
        const response = await Http.get('http://example.com');

        expect(response).toEqual(responseData);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            'http://example.com',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }
        );
    });

    test('should get method throws error when fetch response is not ok', async ({ is }) => {
        global.fetch = vi.fn(() => Promise.reject('API is down'));
        const windowSpy = vi.spyOn(window, 'showAlert');

        const response = await Http.get('http://example.com');

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(windowSpy).toHaveBeenCalledWith("failed", "Something went wrong. Please try it again")
    });

    test('should post method returns data when fetch response is ok', async ({ is }) => {
        const responseData = { result: 'success' };
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(responseData),
            })
        )
        const response = await Http.post('http://example.com/dirs/android', options);

        expect(response).toEqual(responseData);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            'http://example.com/dirs/android',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    name: "tests"
                })
            },

        );
    });

    test('should put method returns data when fetch response is ok', async ({ is }) => {
        const responseData = { result: 'success' };
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(responseData),
            })
        )
        const response = await Http.put('http://example.com/dirs/android', options);

        expect(response).toEqual(responseData);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            'http://example.com/dirs/android',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    name: "tests"
                })
            }
        );
    });

    test('should postBlob method returns data when fetch response is ok', async () => {
        const responseData = new Blob();

        global.fetch = vi.fn(() =>
            Promise.resolve({
                blob: () => Promise.resolve(responseData),
                status: 200
            })
        );

        const response = await Http.postBlob('http://example.com/dirs/android');

        expect(response).toEqual(responseData);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            'http://example.com/dirs/android',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }
        );
    });

    test('should delete method returns data when fetch response is ok', async ({ is }) => {
        const responseData = { result: 'success' };
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(responseData),
            })
        )
        const response = await Http.delete('http://example.com', {});

        expect(response).toEqual(responseData);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            'http://example.com',
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            }
        );
    });
});