import {ServerNode} from '../../Http/ServerNode';
import {RequestMethods} from '../../Http/RequestsExecutor';
import {RavenCommand} from '../../Database/RavenCommand';

export class HiloNextCommand extends RavenCommand {
  protected tag: string;
  protected lastBatchSize: number;
  protected lastRangeAt: number;
  protected identityPartsSeparator: string;
  protected lastRangeMax: number;

  constructor(tag: string, lastBatchSize: number, lastRangeAt: number, identityPartsSeparator: string, lastRangeMax: number) {
    super(null, RequestMethods.Get);
    this.tag = tag;
    this.lastBatchSize = lastBatchSize;
    this.lastRangeAt = lastRangeAt;
    this.lastRangeMax = lastRangeMax;
    this.identityPartsSeparator = identityPartsSeparator;
  }

  protected createRequest(serverNode: ServerNode): void {

  }

  protected setResponse(response: Object): void {

  }
}