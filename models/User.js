const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { 
            type: String, 
            unique: true, 
            required: "Userame is required", 
            trim: true 
        },
        email: { 
            type: String, 
            unique: true, 
            required: "Email is required", 
            lowercase: true, 
            match: [/.+@.+\..+/], 
        },
        thoughts: [
            { 
                type: Schema.Types.ObjectId, 
                ref: 'thought' 
            }
        ],
        friends: [
            {
              type: Schema.Types.ObjectId,
              ref: "user",
            },
        ],
    },
    {
        toJSON: {
        virtuals: true
        },
        id: false,
});

const friendCount = userSchema.virtual('friendCount')

friendCount.get(function () {
return this.friends.length
})

const User = model('user', userSchema);

module.exports = User;