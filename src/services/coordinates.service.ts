import {HttpService, Injectable} from "@nestjs/common";
import {ILocation} from "../interfaces/location.interface";
import {ICoordinates} from "../interfaces/coordinates.interface";

@Injectable()
export class CoordinatesService {
    private readonly token: string;
    private readonly apiUrl: string;

    constructor(private readonly httpService: HttpService) {
        this.token = process.env.GOOGLE_API_TOKEN;
        this.apiUrl = process.env.GOOGLE_API_URL;

        if (!this.token) {
            throw new Error("Failed to initialize coordinate service. Missing env field: GOOGLE_API_TOKEN");
        }

        if (!this.apiUrl) {
            throw new Error("Failed to initialize coordinate service. Missing env field: GOOGLE_API_URL");
        }
    }

    private formUrl(keyValuePair: string): string {
        return this.apiUrl + "?key=" + this.token + "&" + keyValuePair;
    }

    public async lookupCoordinates(coordinates: ICoordinates): Promise<ILocation> {
        const url = this.formUrl("latlng=" + coordinates.latitude + "," + coordinates.longitude);
        const response = await this.httpService.get(url).toPromise();
        if (response.data.status !== "OK") {
            throw new Error("Failed to geocode: " + response.data.error_message);
        }

        let location: ILocation = {
            country: "",
            county: "",
            region: "",
            city: "",
            address: "",
            areaCode: "",
        };

        let streetName = "";
        let streetNumber = "";

        for (const component of response.data.results[0].address_components) {
            if (component.types.indexOf("street_number") !== -1) {
                streetNumber = component.long_name;
            }

            if (component.types.indexOf("route") !== -1) {
                streetName = component.long_name;
            }

            if (component.types.indexOf("country") !== -1) {
                location.country = component.long_name;
            }

            if (component.types.indexOf("administrative_area_level_2") !== -1) {
                location.county = component.long_name;
            }

            if (component.types.indexOf("administrative_area_level_1") !== -1) {
                location.region = component.long_name;
            }

            if (component.types.indexOf("locality") !== -1 || component.types.indexOf("sublocality") !== -1) {
                location.city = component.long_name;
            }

            if (component.types.indexOf("postal_code") !== -1) {
                location.areaCode = component.long_name;
            }

            if (component.types.indexOf("postal_code_suffix") !== -1) {
                location.areaCodeSuffix = component.long_name;
            }
        }

        location.address = streetNumber + " " + streetName;

        return location;
    }
}