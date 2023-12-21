import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { UsersEntity } from './users.entity';
  
//   import { ServicesDepartmentsEntity } from './service_departments.entity';
//   import { WorkersEntity } from './workers.entity';
// import { ServicesTableWorkEntity } from './services_table_work';
  
  @Entity()
  export class ImageDictationEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      type: 'character varying',
      nullable:true
    })
    image_link: string;

    @Column({
        type: 'character varying',
        nullable:true
      })
      name_file: string;
  
    @CreateDateColumn({ name: 'created_at' })
    create_data: Date;
  
    @ManyToOne(
      () => UsersEntity,
      (user) => user.image,
      { onDelete: 'CASCADE' },
    )
    user: UsersEntity;
    
  }
  