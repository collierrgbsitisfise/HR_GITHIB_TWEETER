// tslint: disable - next - line
require('dotenv').config();
import { GitHubService, RedisClient } from './services';

(async () => {
    console.log('app start');
    const { GIT_HUB_REPONAME, GIT_HUB_USERNAME, REDIS_HOST, GIT_HUB_KEY } = process.env;

    const redisClient = new RedisClient(REDIS_HOST);
    redisClient.connect();

    const gh = new GitHubService(GIT_HUB_USERNAME, GIT_HUB_REPONAME, GIT_HUB_KEY);
    const repoInfo = await gh.getRepoInfo();
    const reposCommits = await gh.getCommits();
    const commitsSHAs = reposCommits.map(({ sha }) => sha);

    console.log('commits SHA');
    console.log(commitsSHAs);

    console.log('REDIS_HOST');
    console.log(REDIS_HOST);
    redisClient.setValue('lastCommits', commitsSHAs.shift());

    const valFromRedis = await redisClient.getValue('lastCommits');
    console.log('valFromRedis');
    console.log(valFromRedis);

    redisClient.deleteValueByKey('deleteValue');
})();
