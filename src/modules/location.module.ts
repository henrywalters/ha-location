import {HttpModule, Module} from "@nestjs/common";
import {IpService} from "../services/ip.service";
import {LocationService} from "../services/location.service";
import {LocationController} from "../controllers/location.controller";
import {CoordinatesService} from "../services/coordinates.service";

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [
        LocationController,
    ],
    providers: [
        IpService,
        CoordinatesService,
        LocationService,
    ]
})
export class LocationModule {}