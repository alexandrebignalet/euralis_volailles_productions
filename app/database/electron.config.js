const config = {
    db: {
        name: process.env.NODE_ENV === 'test' ? 'euralis_volailles_test_db' : 'euralis_volailles_db',
        remoteUrl: 'http://admin:password@46.101.36.6:5984/'
    }
};

module.exports = config;