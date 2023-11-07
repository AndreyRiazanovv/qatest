export class ApiHelper {

    static getToken() {
    return cy.request("POST", "http://5.189.186.217/api/auth/login", {
    email: "barbasar11@gmail.com",
    password: "O112233o"
    }).then((response) => {
    return response.body.token;
    });
    
    
    }
    static getCategories() {
    return this.getToken().then(token => {
    return cy.request({
    method: "GET",
    url: "http://5.189.186.217/api/category",
    headers: {
    Authorization: token
    }
    }).its("body").then(body => {
    return body;
    
    
    })
    });
    };
    }
    