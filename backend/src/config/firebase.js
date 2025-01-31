const admin = require('firebase-admin');
const path = require('path');
const logger = require('./logger')


const initializeFirebase = () => {
    try {
        const serviceAccount = path.resolve(process.env.FIREBASE_ACCOUNT_PATH);
        
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    
        const db = admin.firestore();
        const auth = admin.auth();
    
        logger.info('Firebase Admin initialized successfully');

        return { db, auth };
    } catch (error) {
        logger.error('Error initializing Firebase Admin:', error);
        throw error;
    }
};

module.exports = { initializeFirebase };


