import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('projects')
export class Project {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({ description: 'Codigo alphanumérico 8-16 dígitos en letras minúsculas unico para el proyecto', type: 'string' })
    @Column({ type: 'character varying', unique: true, comment: 'Key unica del proyecto', length: 16 })
    key: string;
    
    @ApiProperty({ description: 'Titulo' })
    @Column({ type: 'character varying', comment: 'Titulo del proyecto', length: 80 })
    title: string;
    
    @ApiProperty({ description: 'Descripcion' })
    @Column({ type: 'text'})
    description: string;
    
    @ApiProperty({ description: 'Horas planificadas', type: 'integer' })
    @Column({ name: 'planned_hours', type: 'integer' })
    plannedHours: number;

    owner?: any;
}