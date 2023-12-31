const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId, 
      default: () => new Types.ObjectId(),
    },  
    reactionBody: {
      type: String,
      required: "Reaction body is required",
      maxLength: 280,
    },
    username: {
      type: String,
      required: "Username is required"
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      /* get: (timestamp) => dateFormat(timestamp), */ 
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
)

const thoughtSchema = new Schema({
    thoughtText: { 
      type: String, 
      required: "Thought is required", 
      minLength: 1, 
      maxLength: 280 
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      /* get: (timestamp) => dateFormat(timestamp), */ 
    },
    username: { 
      type: String, 
      required: true 
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
        virtuals: true
      },
      id: false,
  });

  const reactionCount  = thoughtSchema.virtual('reactionCount')

  reactionCount .get(function () {
    return this.reactions.length
  })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;