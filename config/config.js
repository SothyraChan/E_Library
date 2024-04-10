const config = {
    env: "production",
    port: 3000,
    jwtSecret: "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI || 
    "mongodb+srv://rojindayani:ElectronicLibrary@atlascluster.gr8sruq.mongodb.net/?retryWrites=true&w=majority"
    }
export default config