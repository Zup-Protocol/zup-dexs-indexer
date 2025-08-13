import { Pool as PoolEntity, Token as TokenEntity } from "../../../../../../generated/schema";
import { Sync as SyncEvent } from "../../../../../../generated/templates/UniswapV2Pool/UniswapV2Pool";
import { handleV2PoolSync } from "../../v2-pool-sync";

export function handleUniswapV2Sync(event: SyncEvent): void {
  let poolEntity = PoolEntity.load(event.address)!;
  let token0Entity = TokenEntity.load(poolEntity.token0)!;
  let token1Entity = TokenEntity.load(poolEntity.token1)!;

  handleV2PoolSync(event, poolEntity, token0Entity, token1Entity, event.params.reserve0, event.params.reserve1);
}
