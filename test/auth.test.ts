import { AuthService } from "./AuthService";


async function testAuth(){
    const service = new AuthService();
    const loginResult = await service.login(
        'tampv',
        'D7j]!rnxh2RC2'
    )
    console.log(loginResult.getSignInUserSession().getIdToken().getJwtToken());
}

testAuth();