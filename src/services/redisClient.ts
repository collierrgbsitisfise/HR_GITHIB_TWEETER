import * as redis from 'redis';
import { RedisClient as RedisClientType } from 'redis';
import * as bluebird from 'bluebird';

import { CommitInfoFull } from './../types';
bluebird.promisifyAll(redis);

export class RedisClient {
    private host: string;
    private redisClient: RedisClientType & { getAsync: Function };

    private stringifyNonStringValues(value: any): string {
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }

        return value;
    }

    constructor(host: string) {
        this.host = host;
    }

    public connect(): void {
        this.redisClient = <RedisClientType & { getAsync: Function }>redis.createClient(this.host);
    }

    /**
     * Always stringyfy value, before save it redis
     */
    public setValue(key: string, value: any): void {
        this.redisClient.set(key, this.stringifyNonStringValues(value));
    }

    public setExpValue(key: string, value: string, seconds: number = 60 * 60 * 24): void {
        this.redisClient.set(key, this.stringifyNonStringValues(value), 'EX', seconds);
    }

    public deleteValueByKey(key: string) {
        this.redisClient.del(key);
    }

    public async getValue(key: string): Promise<string> {
        return this.redisClient.getAsync(key);
    }

    saveLastPostedCommit(commitInfo: CommitInfoFull): void {
        const commitSHA = commitInfo.sha;
        this.setValue(commitSHA, commitInfo);
    }
}
