import * as rp from 'request-promise';
import { RepoInfo, CommitInfo } from './../types/';

type optionsForGhAPI = {
    uri: string;
    headers: {
        'User-Agent': string;
    };
    json: boolean;
};

export class GitHubService {
    private ghAPI = 'https://api.github.com/';
    private userName: string;
    private repoName: string;

    private getOptions(uri: string, UA: string): optionsForGhAPI {
        return { uri: uri, headers: { 'User-Agent': UA }, json: true };
    }

    constructor(userName: string, repoName: string) {
        this.userName = userName;
        this.repoName = repoName;
    }

    async getRepoInfo(): Promise<RepoInfo> {
        const options = this.getOptions(
            `${this.ghAPI}repos/${this.userName}/${this.repoName}`,
            'https://api.github.com/meta',
        );

        return <RepoInfo>await rp.get(options);
    }

    async getCommitInfo(commitSHA: string): Promise<CommitInfo> {
        const options = this.getOptions(
            `${this.ghAPI}repos/${this.userName}/${this.repoName}/commits/${commitSHA}`,
            'https://api.github.com/meta',
        );

        return <CommitInfo>await rp.get(options);
    }
}
