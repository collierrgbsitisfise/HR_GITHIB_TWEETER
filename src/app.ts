// tslint: disable - next - line
require('dotenv').config();
import { CommitInfo } from './types';
import { GitHubService } from './services';

(async () => {
    console.log('app start');
    const { GIT_HUB_REPONAME, GIT_HUB_USERNAME } = process.env;
    const gh = new GitHubService(GIT_HUB_USERNAME, GIT_HUB_REPONAME);
    const repoInfo = await gh.getRepoInfo();
    const reposCommits = await gh.getCommits();

    const commitsSHAs = reposCommits.map(({ sha }) => sha);
})();
