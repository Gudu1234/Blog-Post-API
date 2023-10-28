// Initializes the `v1/logout` service on path `/v1/logout`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Logout } from './logout.class';
import hooks from './logout.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/logout': Logout & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/logout', new Logout(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/logout');

    service.hooks(hooks);
}
