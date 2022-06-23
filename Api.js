class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.headers = {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }

    async getOne(id) {
        let response = await fetch(`${this.baseUrl}/posts/${id}`);
        if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        let json = await response.json();

        return json;
    }

    async getAll() {
        let response = await fetch(`${this.baseUrl}/posts`);
        if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        let json = await response.json();

        return json;
    }

    async updateOne(id, data) {
        let response = await fetch(`${this.baseUrl}/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: this.headers
        })
        if(!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        let json = await response.json();

        return json;
    }
}

export default Api;