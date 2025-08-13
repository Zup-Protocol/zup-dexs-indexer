import { createHash } from "crypto";
import { Pool as PoolEntity, Token as TokenEntity } from "generated";
import { ONE_HOUR_IN_SECONDS, ZERO_ADDRESS } from "./constants";
import { IndexerNetwork } from "./indexer-network";

export function isVariableWithStablePool(pool: PoolEntity, network: IndexerNetwork): boolean {
  const stablecoinsAddressesLowercased = IndexerNetwork.stablecoinsAddresses(network).map<string>((address) =>
    address.toLowerCase()
  );

  const isToken0Stable = stablecoinsAddressesLowercased.includes(pool.token0_id.toLowerCase());
  const isToken1Stable = stablecoinsAddressesLowercased.includes(pool.token1_id.toLowerCase());

  if ((isToken0Stable && !isToken1Stable) || (!isToken0Stable && isToken1Stable)) return true;

  return false;
}

export function isStablePool(pool: PoolEntity, network: IndexerNetwork): boolean {
  const stablecoinsAddressesLowercased = IndexerNetwork.stablecoinsAddresses(network).map<string>((address) =>
    address.toLowerCase()
  );

  const isToken0Stable = stablecoinsAddressesLowercased.includes(pool.token0_id.toLowerCase());
  const isToken1Stable = stablecoinsAddressesLowercased.includes(pool.token1_id.toLowerCase());

  if (isToken0Stable && isToken1Stable) return true;

  return false;
}

export function isWrappedNativePool(pool: PoolEntity, network: IndexerNetwork): boolean {
  const isToken0WrappedNative = pool.token0_id.lowercasedEquals(IndexerNetwork.wrappedNativeAddress(network));
  const isToken1WrappedNative = pool.token1_id.lowercasedEquals(IndexerNetwork.wrappedNativeAddress(network));

  if (isToken0WrappedNative || isToken1WrappedNative) return true;

  return false;
}

export function isNativePool(pool: PoolEntity): boolean {
  const isToken0Native = pool.token0_id.lowercasedEquals(ZERO_ADDRESS);
  const isToken1Native = pool.token1_id.lowercasedEquals(ZERO_ADDRESS);

  if (isToken0Native || isToken1Native) return true;

  return false;
}

export function findStableToken(token0: TokenEntity, token1: TokenEntity, network: IndexerNetwork): TokenEntity {
  const stablecoinsAddressesLowercased = IndexerNetwork.stablecoinsAddresses(network).map<string>((address) =>
    address.toLowerCase()
  );

  const isToken0Stable = stablecoinsAddressesLowercased.includes(token0.id.toLowerCase());
  const isToken1Stable = stablecoinsAddressesLowercased.includes(token1!.id.toLowerCase());

  if (isToken0Stable) return token0;
  if (isToken1Stable) return token1;

  throw new Error("Pool does not have a stable asset, no stable token can be found");
}

export function findWrappedNative(token0: TokenEntity, token1: TokenEntity, network: IndexerNetwork): TokenEntity {
  const isToken0WrappedNative = token0.id.lowercasedEquals(IndexerNetwork.wrappedNativeAddress(network));
  const isToken1WrappedNative = token1.id.lowercasedEquals(IndexerNetwork.wrappedNativeAddress(network));

  if (isToken0WrappedNative) return token0;
  if (isToken1WrappedNative) return token1;

  throw new Error("Pool does not have a wrapped native asset, no wrapped native token can be found");
}

export function findNativeToken(token0: TokenEntity, token1: TokenEntity): TokenEntity {
  const isToken0Native = token0.id.lowercasedEquals(ZERO_ADDRESS);
  const isToken1Native = token1.id.lowercasedEquals(ZERO_ADDRESS);

  if (isToken0Native) return token0;
  if (isToken1Native) return token1;

  throw new Error("Pool does not have a native asset, no native token can be found");
}

export function getPoolHourlyDataId(blockTimestampInSeconds: bigint, pool: PoolEntity): string {
  let secondsPerHour = BigInt(ONE_HOUR_IN_SECONDS);
  let hourId = (blockTimestampInSeconds - pool.createdAtTimestamp) / secondsPerHour;

  let hourIdAddress = createHash("sha256").update(hourId.toString()).digest("hex");
  let id = pool.id + hourIdAddress;

  return id;
}

export function getPoolDailyDataId(blockTimestamp: bigint, pool: PoolEntity): string {
  let secondsPerDay = 86_400;
  let dayId = (blockTimestamp - pool.createdAtTimestamp) / BigInt(secondsPerDay);

  let dayIdAddress = createHash("sha256").update(dayId.toString()).digest("hex");
  let id = pool.id + dayIdAddress;

  return id;
}
