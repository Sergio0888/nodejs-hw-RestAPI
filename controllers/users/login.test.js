const mongoose = require('mongoose');
const request = require('supertest');
const bcrypt = require('bcryptjs');
require("dotenv").config();

const app = require('../../app');
const {User} = require('../../models/user');

const {DB_HOST, PORT} = process.env;

describe("test login", () => {
    let server;
    // eslint-disable-next-line no-return-assign
    beforeAll(() => server = app.listen(PORT));
    afterAll(() => server.close());

    beforeEach((done)=> {
        mongoose.connect(DB_HOST).then(()=> done())
    })

    afterEach((done)=> {
        mongoose.connection.close(()=> done())
    })
    test("test login route", async()=> {
        
        const hashPassword = await bcrypt.hash('12345678aa', 10);
        
        const newUser = {
            email: "sergii@mail.com",
            password: hashPassword
        };

        const user = await User.create(newUser);

        
        const loginUser = {
            email: "sergii@mail.com",
            password: "12345678aa"
        };

        const response = await request(app).post("/api/users/login").send(loginUser);
        expect(response.statusCode).toBe(200);
        const {body} = response;
        const {token} = await User.findById(user._id);
        expect(body.token).toBe(token);
    })
})