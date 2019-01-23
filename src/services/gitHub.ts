import * as rp from 'request-promise';
import { RepoInfo, CommitInfo, CommitInfoFull } from './../types/';

type optionsForGhAPI = {
    uri: string;
    headers: {
        'User-Agent': string;
    };
    json: boolean;
};

export class GitHubService {
    private static userAgen = 'https://api.github.com/meta';

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

    /**
     * Will return only 30 last commits
     */
    async getCommits(): Promise<CommitInfo[]> {
        const options = this.getOptions(
            `${this.ghAPI}repos/${this.userName}/${this.repoName}/commits`,
            GitHubService.userAgen,
        );

        return <CommitInfo[]>await rp.get(options);
    }

    async getCommitInfo(commitSHA: string): Promise<CommitInfoFull> {
        const options = this.getOptions(
            `${this.ghAPI}repos/${this.userName}/${this.repoName}/commits/${commitSHA}`,
            GitHubService.userAgen,
        );

        return <CommitInfoFull>await rp.get(options);
    }
}
