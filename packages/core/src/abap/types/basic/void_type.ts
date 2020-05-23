import {AbstractType} from "./_abstract_type";

export class VoidType implements AbstractType {
  public toText() {
    return "Void";
  }

  public isGeneric() {
    return false;
  }
}