import * as feathersAuthentication from '@feathersjs/authentication';
import FRequired from '../../hooks/FRequired';
import setCreatedBy from '../../hooks/setCreatedBy';
import {disallow, discard} from 'feathers-hooks-common';
import setCreatedByQuery from '../../hooks/setCreatedByQuery';
import patchDeleted from '../../hooks/patchDeleted';

const { authenticate } = feathersAuthentication.hooks;

export default {
    before: {
        all: [ authenticate('jwt') ],
        find: [],
        get: [],
        create: [
            FRequired(['title', 'description']),
            setCreatedBy('user')
        ],
        update: [disallow()],
        patch: [
            discard('active', 'user'),
            setCreatedByQuery('user')
        ],
        remove: [ setCreatedByQuery('user'), patchDeleted() ]
    },

    after: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
