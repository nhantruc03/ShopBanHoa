class Auth {
    constructor() {
        this.authenticatedAdmin = false
    }

    loginAdmin(data) {
        localStorage.setItem('login', JSON.stringify(data));
        if (data.role === "admin") {
            this.authenticatedAdmin = true
        }
    }

    logoutAdmin(cb) {
        localStorage.removeItem('login')
        this.authenticatedAdmin = false
    }

    isAuthenticatedAdmin() {
        try {
            var test = localStorage.getItem('login');
            var obj = JSON.parse(test);
            this.loginAdmin(obj);
            return this.authenticatedAdmin;
        } catch (e) {
            this.authenticatedAdmin = false
            return this.authenticatedAdmin;
        }
    }
}

export default new Auth()