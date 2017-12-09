describe('InvestmentTest', () => {

    after(function () {

    });

    describe('constructor and init tests', () => {
        it('should be a singleton', () => {
            assert.isNotNull(pouchDbService);
        });
    });

});