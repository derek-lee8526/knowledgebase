let db = require('../utils/database');

// Get user profiles with user ID
function getUserProfile(id) {
    console.log(id);
    let profile = [{
            firstName: 'bran',
            lastName: 'Lee',
            email: 'bl@gmail.com',
            password: '1234',
            country: 'canada',
            birthDate: '10/11/1998',
            description: 'Test',
            post: '3',
            message: '5',
            like: '10',
            imageURL: 'https://randomuser.me/api/portraits/med/men/62.jpg'
        }
    ];
    return profile;
}


module.exports = {
    getProfile: getUserProfile
}