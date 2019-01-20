// tslint: disable - next - line
require('dotenv').config();

import { GitHubService } from './services';

(async () => {
    console.log('app start');
    const { GIT_HUB_REPONAME, GIT_HUB_USERNAME } = process.env;
    const gh = new GitHubService(GIT_HUB_USERNAME, GIT_HUB_REPONAME);
    const repoInfo = await gh.getRepoInfo();
    const { owner } = repoInfo;
    console.log(owner.id);
})();
