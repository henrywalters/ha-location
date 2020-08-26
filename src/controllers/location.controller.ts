import {BadRequestException, Controller, Get, HttpException, Post, Query} from "@nestjs/common";
import {LocationService} from "../services/location.service";
import {CoordinateHelper} from "../helpers/coordinates.helper";

@Controller('v1')
export class LocationController {

    constructor(private locationService: LocationService) {}

    @Get('search')
    public async search(@Query("ip") ip?: string, @Query("coordinates") coordinateString?: string) {
        try {
            if (ip) {
                return await this.locationService.searchIp(ip);
            }

            if (coordinateString) {
                return await this.locationService.searchCoordinates(CoordinateHelper.parseString(coordinateString));
            }

            throw new BadRequestException("Missing ip or coordinates query parameters");
        } catch (e) {
            throw new HttpException(e.message, 400);
        }
    }
}