import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'O nome é obrigatório!!!'],
        trim: true,
        minlength: 'Quantidade de caracteres insuficiente!!!'
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório!!!'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Informe um e-mail válido']
    },
    passwaord: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
})

const users = mongoose.model('users', userSchema);

export default users