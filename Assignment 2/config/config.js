const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    mongoUri: process.env.MONGODB_URI ||
    "mongodb+srv://contactpmoreau_db_user:abcdR9SwsFLRWTZn@comp229.ufgw2qm.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=COMP229" ||
    process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/mernproject'
}

export default config