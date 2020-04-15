import {BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, Generated, OneToMany} from "typeorm";
import {IpLocation} from "./ipLocation.entity";
import {CoordinateLocation} from "./coordinateLocation.entity";
import {ILocation} from "../interfaces/location.interface";

@Entity()
export class Location extends BaseEntity implements ILocation {
    @PrimaryColumn()
    @Generated("uuid")
    public id: string;

    @Column()
    public country: string;

    @Column()
    public county: string;

    @Column()
    public region: string;

    @Column()
    public city: string;

    @Column()
    public areaCode: string;

    @Column()
    public areaCodeSuffix: string;

    @Column()
    public address: string;

    @OneToMany(type => IpLocation, ipLocation => ipLocation.location)
    public ips: IpLocation[];

    @OneToMany(type => CoordinateLocation, coordLocation => coordLocation.location)
    public coordinates: CoordinateLocation[];
}