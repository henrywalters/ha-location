import {Injectable} from "@nestjs/common";
import {Location} from "../entities/location.entity";
import {IpLocation} from "../entities/ipLocation.entity";
import {CoordinateLocation} from "../entities/coordinateLocation.entity";
import {IpService} from "./ip.service";
import {ICoordinates} from "../interfaces/coordinates.interface";
import {CoordinatesService} from "./coordinates.service";

@Injectable()
export class LocationService {

    constructor(private readonly ipService: IpService, private readonly coordinatesService: CoordinatesService) {
    }

    private async newLocation(country: string, county: string, region: string, city: string, address: string, areaCode: string, areaCodeSuffix = ""): Promise<Location> {
        const location = new Location();
        location.country = country;
        location.county = county;
        location.region = region;
        location.city = city;
        location.address = address;
        location.areaCode = areaCode;
        location.areaCodeSuffix = areaCodeSuffix;
        await location.save();
        return location;
    }

    private async newIpLocation(ip: string, location: Location): Promise<IpLocation> {
        const ipLocation = new IpLocation();
        ipLocation.location = location;
        ipLocation.ip = ip;
        await ipLocation.save();
        return ipLocation;
    }

    private async newCoordinateLocation(coordinates: ICoordinates, location: Location): Promise<CoordinateLocation> {
        const coordinateLocation = new CoordinateLocation();
        coordinateLocation.latitude = coordinates.latitude;
        coordinateLocation.longitude = coordinates.longitude;
        coordinateLocation.location = location;
        await coordinateLocation.save();
        return coordinateLocation;
    }

    public async searchIp(ip: string): Promise<Location> {

        let ipLocation = await IpLocation.findOne({
            where: {
                ip,
            },
            relations: [
                'location',
            ]
        });

        if (!ipLocation) {
            const rawLocation = await this.ipService.lookupIp(ip);
            if (!rawLocation.country) {
                throw new Error("Failed to locate IP");
            }
            const newLocation = await this.newLocation(rawLocation.country, rawLocation.county, rawLocation.region, rawLocation.city, rawLocation.address, rawLocation.areaCode, rawLocation.areaCodeSuffix);
            ipLocation = await this.newIpLocation(ip, newLocation);
        }

        return ipLocation.location;
    }

    public async searchCoordinates(coordinates: ICoordinates): Promise<Location> {
        let coordinateLocation = await CoordinateLocation.findOne({
            where: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
            },
            relations: [
                'location'
            ],
        });

        if (!coordinateLocation) {
            const rawLocation = await this.coordinatesService.lookupCoordinates(coordinates);
            const newLocation = await this.newLocation(rawLocation.country, rawLocation.county, rawLocation.region, rawLocation.city, rawLocation.address, rawLocation.areaCode, rawLocation.areaCodeSuffix);
            coordinateLocation = await this.newCoordinateLocation(coordinates, newLocation);
        }

        return coordinateLocation.location;
    }

}