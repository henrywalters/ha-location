import {Injectable} from "@nestjs/common";
import * as IPinfoWrapper from "node-ipinfo";
import {ILocation} from "../interfaces/location.interface";

@Injectable()
export class IpService {

    private readonly token: string;
    private ipInfo: any;

    constructor() {
        this.token = process.env.IP_INFO_TOKEN;

        if (!this.token) {
            throw new Error("IP Info API Key missing [env: IP_INFO_TOKEN]");
        }

        this.ipInfo = new IPinfoWrapper(this.token);
    }

    public async lookupIp(ip: string): Promise<ILocation | null> {
        try {
            const location = await this.ipInfo.lookupIp(ip);
            return {
                country: location._country,
                county: 'n/a',
                region: location._region,
                city: location._city,
                address: 'n/a',
                areaCode: location._postal,
            }
        } catch (e) {
            return null;
        }
    }
}