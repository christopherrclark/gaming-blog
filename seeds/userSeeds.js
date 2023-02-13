const User = require('../models/User');

const userSeeds = [
    //Bob
    {
        username: "Bob",
        password: '123',
        email: 'bobross@gmail.com'
    },
    //Jason
    {
        username: "Jason",
        password: "123",
        email: 'jason2022@hotmail.com'
    },
];

const seedUsers = () => User.bulkCreate(userSeeds, {
    individualHooks: true,
});

module.exports = seedUsers;