import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('User')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ nullable: false })
  FirstName: string;

  @Column({ nullable: false })
  LastName: string;

  @Column({ nullable: false })
  Emailid: string;

  @Column({ nullable: true })
  Mobile: string;

  @Column({ nullable: true })
  DOB: string;

  @Column({ nullable: true })
  DLImgUrl: string;

  @Column({ nullable: true })
  PasswordHash: string;

  @Column({ nullable: false })
  IsMobileVerified: number;

  @Column({ nullable: false })
  IsEmailVerified: number;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @DeleteDateColumn()
  DeletedAt: Date;
}
