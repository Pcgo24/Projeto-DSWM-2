const admin = require('firebase-admin');
const serviceAccount = require('./dondokas-project-firebase-adminsdk.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const firestore = admin.firestore();

const feedback = firestore.collection('feedback');

module.exports = {
    admin,
    feedback
};