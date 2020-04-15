import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Location} from "./location.entity";

@Entity()
export class CoordinateLocation extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "double"})
    public latitude: number;

    @Column({type: "double"})
    public longitude: number;

    @ManyToOne(type => Location, location => location.coordinates)
    public location: Location;
}