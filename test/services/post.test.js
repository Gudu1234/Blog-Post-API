const app = require('../../src/app');

describe('\'post\' service', () => {
    it('registered the service', () => {
        const service = app.service('post');
        expect(service).toBeTruthy();
    });
});
