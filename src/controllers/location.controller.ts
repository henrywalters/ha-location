import {BadRequestException, Controller, Get, Post, Query} from "@nestjs/common";
import {LocationService} from "../services/location.service";
import {CoordinateHelper} from "../helpers/coordinates.helper";

@Controller('location')
export class LocationController {

    constructor(private locationService: LocationService) {}

    @Get('search')
    public async search(@Query("ip") ip?: string, @Query("coordinates") coordinateString?: string) {
        if (ip) {
            return await this.locationService.searchIp(ip);
        }

        if (coordinateString) {
            return await this.locationService.searchCoordinates(CoordinateHelper.parseString(coordinateString));
        }

        throw new BadRequestException("Missing ip or coordinates query parameters");
    }
}