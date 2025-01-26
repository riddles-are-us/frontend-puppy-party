import BN from "bn.js";
import { AccountSlice } from "zkwasm-minirollup-browser";
import { DanceType } from "./components/Gameplay";
import { createWithdrawCommand, createCommand } from "zkwasm-minirollup-rpc";

export const CREATE_PLAYER = 1n;
const VOTE = 2n;
const STAKE = 3n;
const BET = 4n;
const COMMENT = 5n;
const LOTTERY = 6n;
const CANCELL_LOTTERY = 7n;
const WITHDRAW = 8n;
const WITHDRAW_LOTTERY = 10n;

function bytesToHex(bytes: Array<number>): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

export function getCreatePlayerTransactionParameter(
  l2account: AccountSlice.L2AccountInfo,
  nonce: bigint
) {
  return {
    cmd: createCommand(CREATE_PLAYER, nonce, [0n, 0n, 0n]),
    prikey: l2account.address,
  };
}

export function getDanceTransactionParameter(
  l2account: AccountSlice.L2AccountInfo,
  danceType: DanceType,
  targetMemeIndex: bigint,
  nonce: bigint
) {
  const danceCommand =
    danceType == DanceType.Music
      ? VOTE
      : danceType == DanceType.Side
      ? STAKE
      : danceType == DanceType.Turn
      ? BET
      : COMMENT
  return {
    cmd: createCommand(nonce, danceCommand, [
      BigInt(targetMemeIndex),
      0n,
    ]),
    prikey: l2account.address,
  };
}

export function getLotteryransactionParameter(
  l2account: AccountSlice.L2AccountInfo,
  nonce: bigint
) {
  return {
    cmd: createCommand(nonce, LOTTERY, []),
    prikey: l2account!.address,
  };
}

export function getCancelLotteryransactionParameter(
  l2account: AccountSlice.L2AccountInfo,
  nonce: bigint
) {
  return {
    cmd: createCommand(nonce, CANCELL_LOTTERY, []),
    prikey: l2account!.address,
  };
}

export function getWithdrawTransactionParameter(
  l1account: AccountSlice.L1AccountInfo,
  l2account: AccountSlice.L2AccountInfo,
  amount: bigint,
  nonce: bigint
) {
  const address = l1account.address.slice(2);
  const addressBN = new BN(address, 16);
  const addressBE = addressBN.toArray("be", 20); // 20 bytes = 160 bits and split into 4, 8, 8
  const firstLimb = BigInt("0x" + bytesToHex(addressBE.slice(0, 4).reverse()));
  const sndLimb = BigInt("0x" + bytesToHex(addressBE.slice(4, 12).reverse()));
  const thirdLimb = BigInt(
    "0x" + bytesToHex(addressBE.slice(12, 20).reverse())
  );

  return {
    cmd: createCommand (nonce, WITHDRAW, [
      (firstLimb << 32n) + amount,
      sndLimb,
      thirdLimb,
    ]),
    prikey: l2account.address,
  };
}

export function getWithdrawLotteryTransactionParameter(
  l1account: AccountSlice.L1AccountInfo,
  l2account: AccountSlice.L2AccountInfo,
  amount: bigint,
  nonce: bigint
) {
  const address = l1account.address.slice(2);
  const addressBN = new BN(address, 16);
  const addressBE = addressBN.toArray("be", 20); // 20 bytes = 160 bits and split into 4, 8, 8
  const firstLimb = BigInt("0x" + bytesToHex(addressBE.slice(0, 4).reverse()));
  const sndLimb = BigInt("0x" + bytesToHex(addressBE.slice(4, 12).reverse()));
  const thirdLimb = BigInt(
    "0x" + bytesToHex(addressBE.slice(12, 20).reverse())
  );

  return {
    cmd: createCommand(nonce, WITHDRAW_LOTTERY, [
      (firstLimb << 32n) + amount,
      sndLimb,
      thirdLimb,
    ]),
    prikey: l2account.address,
  };
}
