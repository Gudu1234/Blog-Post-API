/**
 * @description manage post count according to remove post
 */

const DecreasePostCount = async (result, context) => {

    const { app } = context;

    const { user } = result;

    await app.service('user')._patch(
        user,
        {
            $inc: {
                postCount: -1
            }
        }, {}
    );
};

export default DecreasePostCount;
