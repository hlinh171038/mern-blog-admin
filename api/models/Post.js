import mongoose from "mongoose";

const PostSchame = mongoose.Schema({
    title:{
        type:String,
    },
    summary:{
        type:String,
    },
    content:{
        type:String,
    },
    cover:{
        type:String
    },
    author:{
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    },

},{ 
    timestamps: true
})

const PostModal = mongoose.model('POST',PostSchame)
export default PostModal