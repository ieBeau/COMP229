import mongoose from 'mongoose'

const EducationSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: "First name is required"
    },
    lastname: {
        type: String,
        trim: true,
        required: "Last name is required"
    },
    email: {
        type: String,
        trim: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: "Email is required"
    },
    completion: {
        type: Date,
        default: Date.now
    },
    school: {
        type: String,
        trim: true,
        required: "School name is required"
    },
    program: {
        type: String,
        trim: true,
        required: "Program name is required"
    },
    degree: {
        type: String,
        trim: true,
        required: "Degree is required"
    },
    studentGPA: {
        type: String,
        trim: true
    },
    schoolGPA: {
        type: String,
        trim: true
    },
    start: {
        type: Date,
        required: "Start date is required"
    },
    end: {
        type: Date,
        required: "Expected graduation date is required"
    },
    location: {
        type: String,
        trim: true,
        required: "Location is required"
    },
    url: {
        type: String,
        trim: true
    },
    image: {
        data: { type: Buffer, default: null },
        contentType: { type: String, default: null },
    }
});

export default mongoose.model('Education', EducationSchema)