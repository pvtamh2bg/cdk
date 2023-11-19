import { CognitoUser } from '@aws-amplify/auth';
import { Amplify, Auth } from 'aws-amplify'

const awsRegion = 'ap-northeast-1'

Amplify.configure({
    Auth: {
        region: awsRegion,
        userPoolId: 'ap-northeast-1_cvu129Y0G',
        userPoolWebClientId: '7bic27trcb1gi5p4gmk3089ilg',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});

export class AuthService {

    public async login(userName: string, password: string) {
        const result = await Auth.signIn(userName, password) as CognitoUser;
        return result;
    }
}