/**
 * Created By Soumya(soumya@smarttersstudio.com) on 2/22/2022 at 11:30 PM.
 */
import { HookContext } from '@feathersjs/feathers';
import { UserSessions } from '../../user-session/responses/UserSessionInterfaces';

/**
 * @description end the corresponding session according to access token.
 * @constructor
 */
const EndSession = () => async (context: HookContext) => {
    const { app, params } = context;

    const { user, authentication } = params;

    if (user && authentication) {
        const accessToken = authentication.accessToken;
        const userId = user._id;

        const service = app.service('v1/user-session');

        const sessionData = await service
            ._find({
                query: {
                    accessToken,
                    user: userId,
                    status: 1,
                    $limit: 1,
                },
            })
            .then((res: UserSessions) => (res.total ? res.data[0] : null));

        if (sessionData) {
            await service._patch(sessionData._id, {
                status: -1,
                sessionEndTime: new Date(),
            });
        }

        context.result = {
            message: 'Logout successful',
        };
    }
};

export default EndSession;
