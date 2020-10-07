import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import FRequired from '../../hooks/FRequired';
import setDefaultItem from '../../hooks/setDefaultItem';
import {disallow} from 'feathers-hooks-common';
import setId from '../../hooks/setId';
import patchDeleted from '../../hooks/patchDeleted';
import CheckEmailOrPhone from '../../hooks/CheckEmailOrPhone';
import GenerateAccessToken from './hooks/GenerateAccessToken';

const { authenticate } = feathersAuthentication.hooks;
const { hashPassword, protect } = local.hooks;

export default {
    before: {
        all: [],
        find: [ authenticate('jwt') ],
        get: [ authenticate('jwt') ],
        create: [
            hashPassword('password'),
            FRequired(['name', 'email', 'password', 'phone', 'gender']),
            CheckEmailOrPhone(),
            setDefaultItem('active', true)
        ],
        update: [ disallow() ],
        patch: [
            hashPassword('password'),
            authenticate('jwt'),
            CheckEmailOrPhone(),
            setId()
        ],
        remove: [ authenticate('jwt'), setId(), patchDeleted() ]
    },

    after: {
        all: [
            protect('password')
        ],
        find: [],
        get: [],
        create: [GenerateAccessToken()],
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
