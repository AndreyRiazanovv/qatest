import { ObjectId } from 'mongodb';

export class DbHelper {
    static getAllCategories() {
        return cy.findMany({email}, {collection: "categories"});
    }

    static getUserByName(email) {
        return cy.findOne({email}, {collection: "users"}).its("_id");
    }
    
    static getAllCategoriesByNameContaining(name) {
        const regName = new RegExp(name, "i");
        return cy.findMany({name: regName, imageSrc: ""}, {collection: "categories"});
    }

    static getAllCategoriesById(id) {
        const formattedId = new ObjectId(id);
        return cy.findOne({_id: formattedId}, {collection: "categories"})
    }

    static createPosition() {
        cy.request({
            method: 'POST',
            url: 'http://5.189.186.217/api/position',
            body: {
                name: "CategoryName",
                cost: "CategoryCost",
                category: "CategoryId",
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
        });
    };

}
