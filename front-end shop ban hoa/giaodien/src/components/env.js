var AUTH= ''
try {
    var login = localStorage.getItem('login');
    var obj = JSON.parse(login);
    
    AUTH = obj.token;
} catch (e) {
    console.log(e);
}


export { AUTH }