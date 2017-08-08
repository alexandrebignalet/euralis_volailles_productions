const config = {
    db: {
        name: 'euralis_volailles_db',
        dev: {
            remoteUrl: 'http://admin:password@46.101.36.6:10000/'
        },
        prod: {
            remoteUrl: 'http://admin:c907f253966a6676d7c54232e@46.101.36.6:5984/'
        }

    }
};

module.exports = config;