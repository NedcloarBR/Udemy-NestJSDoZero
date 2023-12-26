import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Course } from "./course.entity";

@Entity("tags")
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToMany(() => Course, (course) => course.tags)
  courses: Array<Course>;

  @BeforeInsert()
  generatedId() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
