import {AbstractFile} from "./abstract_file";
import * as zlib from "zlib";

export class CompressedFile extends AbstractFile {
  private compressed: string;

  constructor(filename: string, compressed: string) {
    super(filename);
    this.compressed = compressed;
  }

  public getRaw(): string {
    return this.decompress(this.compressed);
  }

  public getRawRows(): Array<string> {
    return this.decompress(this.compressed).split("\n");
  }

  private decompress(compressed: string): string {
    return zlib.inflateSync(Buffer.from(compressed, "base64")).toString("utf8");
  }

}