const User = require('../models/User');

const userSeeds = [
    //Clay
    {
        username: "Clay",
        password: '123',
        email: 'clay@clay.com'
    },
    //Mike
    {
        username: "Mike",
        password: "123",
        email: 'mike@mike.com'
    },
];

const seedUsers = () => User.bulkCreate(userSeeds, {
    individualHooks: true,
});

module.exports = seedUsers;