import { Trip } from '../../trip/entity/trip.entity';
import { Glossary } from '../../glossary/entity/glossary.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tourists' })
export class Tourist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ name: 'id_card_number' })
  idCardNumber: string;

  @Column({ name: 'passport_number' })
  passportNumber: string;

  @Column({ type: 'date' })
  birthday: string;

  @Column({ name: 'status_id' })
  statusId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Glossary)
  @JoinColumn({ name: 'status_id' })
  status: Glossary;

  @OneToMany(() => Trip, (trip) => trip.tourist)
  trips: Trip[];
}
