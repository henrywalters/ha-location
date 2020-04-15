import {Column} from "typeorm";

export interface ILocation {
    country: string;
    region: string;
    city: string;
    county: string;
    areaCode: string;
    areaCodeSuffix?: string;
    address: string;
}