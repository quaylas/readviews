
const User = require ('../models/User.js')


jest.mock('../models/User.js');


test('create a new User', () => {
    const Mo = new User
    Mo.id = '1';
    Mo.username = "somewhere@gmail.com";
    Mo.password = 'whatdidyousay';

    expect(Mo.id).toBe('1');
    expect(Mo.username).toBe("somewhere@gmail.com");
    expect(Mo.password).toBe('whatdidyousay');
    
});

