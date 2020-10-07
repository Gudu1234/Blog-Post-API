import user from './user/user.service.js';
import post from './post/post.service.js';

// eslint-disable-next-line no-unused-vars
export default function (app) {
    app.configure(user);
    app.configure(post);
}
