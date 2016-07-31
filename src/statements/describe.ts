import { Statement } from "./statement";
import { Token } from "../tokens/";
import Reuse from "./reuse";
import * as Combi from "../combi";

let str = Combi.str;
let seq = Combi.seq;
let opt = Combi.opt;
let alt = Combi.alt;

export class Describe extends Statement {

  public static get_matcher(): Combi.IRunnable {
    let table = seq(str("TABLE"),
                    Reuse.source(),
                    opt(seq(str("LINES"), Reuse.target())));

    let field = seq(str("FIELD"),
                    Reuse.source(),
                    alt(seq(str("TYPE"), Reuse.target(), opt(seq(str("COMPONENTS"), Reuse.target()))),
                        seq(str("INTO"), Reuse.target())));

    let distance = seq(str("DISTANCE BETWEEN"),
                       Reuse.source(),
                       str("AND"),
                       Reuse.source(),
                       str("INTO"),
                       Reuse.target(),
                       str("IN BYTE MODE"));

    return seq(str("DESCRIBE"), alt(table, field, distance));
  }

  public static match(tokens: Array<Token>): Statement {
    let result = Combi.Combi.run(this.get_matcher(), tokens, true);
    if (result === true) {
      return new Describe(tokens);
    }
    return undefined;
  }

}