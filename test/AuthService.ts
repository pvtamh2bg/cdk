import {CognitoUser } from '@aws-amplify/auth';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { Amplify, Auth } from 'aws-amplify'

const awsRegion = 'ap-northeast-1'

Amplify.configure({
    Auth: {
        region: awsRegion,
        userPoolId: 'ap-northeast-1_cvu129Y0G',
        userPoolWebClientId: '7bic27trcb1gi5p4gmk3089ilg',
        identityPoolId: 'ap-northeast-1:10459905-6171-4054-b786-4b10351c8f39',
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    }
});

export class AuthService {

    public async login(userName: string, password: string) {
        const result = await Auth.signIn(userName, password) as CognitoUser;
        return result;
    }

    public async generateTemporaryCredentials(user: CognitoUser){
        const jwtToken = user.getSignInUserSession().getIdToken().getJwtToken();
        const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/ap-northeast-1_cvu129Y0G`;
        const cognitoIdentity = new CognitoIdentityClient({
            credentials: fromCognitoIdentityPool({
                identityPoolId: 'ap-northeast-1:10459905-6171-4054-b786-4b10351c8f39',
                logins: {
                    [cognitoIdentityPool]: jwtToken
                }
            })
        });
        const credentials = await cognitoIdentity.config.credentials();
        return credentials;
    }
}