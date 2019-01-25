import * as redis from 'redis';
import { RedisClient as RedisClientType } from 'redis';
import * as bluebird from 'bluebird';
bluebird.promisifyAll(redis);

export class RedisClient {
    private host: string;
    private redisClient: RedisClientType;

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
        this.redisClient = redis.createClient(this.host);
    }

    /**
     * Always stringyfy value, before save it redis
     */
    public setValue(key: string, value: string): void {
        this.redisClient.set(key, this.stringifyNonStringValues(value));
    }

    public setExpValue(key: string, value: string, seconds: number = 60 * 60 * 24): void {
        this.redisClient.set(key, this.stringifyNonStringValues(value), 'EX', seconds);
    }

    public getValue(key: string): Promise<any> {
        return this.getValue(key);
    }
}
