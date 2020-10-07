/**
 * @description Generate accessToken
 */

const GenerateAccessToken = () => async context => {

    const { app } = context;

    const result = { ...context.result };

    Object.keys(context.result).forEach(each => delete context.result[each]);

    const generateToken = async (user) => {
        user.sub = user._id;

        const accessToken = await app.service('authentication').createAccessToken(user);

        delete user.sub;
        return { accessToken, user };
    };

    const tokenData = await generateToken(result);

    context.result.accessToken = tokenData.accessToken;
    context.result.user = tokenData.user;

    return context;
};

export default GenerateAccessToken;
