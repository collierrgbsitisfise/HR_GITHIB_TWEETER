import * as rp from 'request-promise';
import { RepoInfo, CommitInfo, CommitInfoFull } from './../types/';

type OptionsForGhAPI = {
    uri: string;
    headers: {
        'User-Agent': string;
    };
    json: boolean;
    qs?: { [key: string]: string };
};

export class GitHubService {
    private static userAgen = 'https://api.github.com/meta';

    private ghAPI = 'https://api.github.com/';
    private userName: string;
    private repoName: string;
    private accesstoken: string;

    private getOptions(uri: string, UA: string): OptionsForGhAPI {
        const basicOptions = { uri: uri, headers: { 'User-Agent': UA }, json: true };

        // accessToken  options- ability to receive up to 5k request per hour
        // @see https://developer.github.com/v3/#basic-authentication
        const acOption = { access_token: this.accesstoken };

        return { ...basicOptions, ...(this.accesstoken ? { qs: acOption } : {}) };
    }

    constructor(userName: string, repoName: string, accesstoken?: string) {
        this.userName = userName;
        this.repoName = repoName;
        this.accesstoken = accesstoken;
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
