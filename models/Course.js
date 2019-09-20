const mongoose =require('mongoose');

const courseSchema = new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            required:Date.now
        }
});

const Course = mongoose.model('Course',courseSchema);

module.exports=Course;