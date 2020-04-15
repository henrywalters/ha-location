import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Location} from "./location.entity";

@Entity()
export class IpLocation extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public ip: string;

    @ManyToOne(type => Location, location => location.ips)
    public location: Location;
}