// Initializes the `post` service on path `/post`
import { Post } from './post.class';

import createModel from '../../models/post.model';
import hooks from './post.hooks';
import IncreasePostCount from './events/IncreasePostCount';
import DecreasePostCount from './events/DecreasePostCount';

export default function (app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use('/post', new Post(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('post');

    service.hooks(hooks);

    service.on('created', IncreasePostCount);
    service.on('removed', DecreasePostCount);
}
