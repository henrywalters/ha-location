import {ICoordinates} from "../interfaces/coordinates.interface";

export class CoordinateHelper {
    public static parseString(coordinates: string): ICoordinates {
        const coordinateParts = coordinates.split(",");
        if (coordinateParts.length !== 2) {
            throw new Error("Invalid coordinate string");
        }

        return {
            latitude: parseFloat(coordinateParts[0]),
            longitude: parseFloat(coordinateParts[1]),
        };
    }
}