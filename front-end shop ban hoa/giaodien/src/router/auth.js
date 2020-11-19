class Auth {
    constructor() {
        this.authenticatedAdmin = false
        this.authenticatedClient = false
    }

    login(data) {
        localStorage.setItem('login', JSON.stringify(data));
        if (data.role === "admin") {
            this.authenticatedAdmin = true
            this.authenticatedClient = true
        } else if (data.role === "client") {
            this.authenticatedAdmin = false
            this.authenticatedClient = true
        }
    }

    logout(cb) {
        localStorage.removeItem('login')
        this.authenticatedAdmin = false
        this.authenticatedClient = false;
    }

    isAuthenticatedAdmin() {
        try {
            var test = localStorage.getItem('login');
            var obj = JSON.parse(test);
            this.login(obj);
            return this.authenticatedAdmin;
        } catch (e) {
            this.authenticatedAdmin = false
            return this.authenticatedAdmin;
        }
    }

    isAuthenticatedClient() {
        try {
            var test = localStorage.getItem('login');
            var obj = JSON.parse(test);
            this.login(obj);
            return this.authenticatedClient;
        } catch (e) {
            this.authenticatedAdmin = false
            return this.authenticatedClient;
        }
    }
}

export default new Auth()