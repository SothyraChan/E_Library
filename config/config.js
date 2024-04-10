const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    mongoUri: process.env.MONGODB_URI || 
    "mongodb+srv://rojindayani:ElectronicLibrary@atlascluster.gr8sruq.mongodb.net/?retryWrites=true&w=majority"
    }
export default config
    