import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Tag } from "./tag.entity";

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @JoinTable({ name: "courses_tags" })
  @ManyToMany(() => Tag, (tag) => tag.courses, {
    cascade: true,
  })
  tags: Array<Tag>;

  @BeforeInsert()
  generatedId() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
