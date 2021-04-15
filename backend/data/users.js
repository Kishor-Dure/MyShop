import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Kishor Dure',
        email: 'kishor@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Girish Kamble',
        email: 'girish@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users;