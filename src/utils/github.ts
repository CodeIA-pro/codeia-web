import { UserGithub } from "../interfaces/github/user-github.interface";

const CLIENT_ID = '60cff6eabecd0033117d';

export const userProfileUrl = (user: UserGithub) => { 
    return `https://github.com/${user.login}`;
};

export const updatePermission = () => {
    console.log('Update permission');
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID + "&scope=repo,read:org,admin:org");
};

export const loginWithGithub = () =>{
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID + "&scope=repo");
}

