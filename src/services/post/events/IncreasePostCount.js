/**
 * @description manage post count according to add post
 */

const IncreasePostCount = async (result, context) => {

    const { app } = context;

    const { user } = result;

    await app.service('user')._patch(
        user,
        {
            $inc: {
                postCount: 1
            }
        }, {}
    );
};

export default IncreasePostCount;
