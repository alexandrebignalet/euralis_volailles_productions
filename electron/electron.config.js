const config = {
    db: {
        name: process.env.NODE_ENV === 'test' ? 'euralis_volailles_test_db' : 'euralis_volailles_db',
        remoteUrl: 'http://admin:password@localhost:5984/'
    }
};

module.exports = config;