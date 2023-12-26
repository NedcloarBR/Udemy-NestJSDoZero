import { DatabaseError } from "../errors/DatabaseError";
import { PrismaClientError } from "../errors/PrismaClientsError";
import { UniqueConstraintError } from "../errors/UniqueConstraintError";

enum PrismaErrors {
  UniqueConstraintFail = "P2002",
}

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);
    default:
      return new DatabaseError(e.message);
  }
};
