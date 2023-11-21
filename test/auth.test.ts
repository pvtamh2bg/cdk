import { AuthService } from "./AuthService";


async function testAuth(){
    const service = new AuthService();
    const loginResult = await service.login(
        'tampv',
        'D7j]!rnxh2RC2'
    )
    console.log(loginResult)
    const credentials = await service.generateTemporaryCredentials(loginResult);
    console.log(credentials);
}

testAuth();