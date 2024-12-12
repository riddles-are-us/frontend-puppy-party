import BN from "bn.js";
import { AccountSlice } from "zkwasm-minirollup-browser";
import { getTransactionCommandArray } from "./rpc";
import { DanceType } from "./components/Gameplay";

const CREATE_PLAYER = 1n;
const DANCE_MUSIC = 2n;
const DANCE_SIDE = 3n;
const DANCE_TURN = 4n;
const DANCE_UP = 5n;
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
    cmd: getTransactionCommandArray(CREATE_PLAYER, nonce, [0n, 0n, 0n]),
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
      ? DANCE_MUSIC
      : danceType == DanceType.Side
      ? DANCE_SIDE
      : danceType == DanceType.Turn
      ? DANCE_TURN
      : DANCE_UP;
  return {
    cmd: getTransactionCommandArray(danceCommand, nonce, [
      BigInt(targetMemeIndex),
      0n,
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
    cmd: getTransactionCommandArray(LOTTERY, nonce, [0n, 0n, 0n]),
    prikey: l2account!.address,
  };
}

export function getCancelLotteryransactionParameter(
  l2account: AccountSlice.L2AccountInfo,
  nonce: bigint
) {
  return {
    cmd: getTransactionCommandArray(CANCELL_LOTTERY, nonce, [0n, 0n, 0n]),
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
  //   console.log("address is", address);
  //   console.log("address big endian is", addressBE);
  const firstLimb = BigInt("0x" + bytesToHex(addressBE.slice(0, 4).reverse()));
  const sndLimb = BigInt("0x" + bytesToHex(addressBE.slice(4, 12).reverse()));
  const thirdLimb = BigInt(
    "0x" + bytesToHex(addressBE.slice(12, 20).reverse())
  );

  /*
    (32 bit amount | 32 bit highbit of address)
    (64 bit mid bit of address (be))
    (64 bit tail bit of address (be))
    */

  //   console.log("first is", firstLimb);
  //   console.log("snd is", sndLimb);
  //   console.log("third is", thirdLimb);

  return {
    cmd: getTransactionCommandArray(WITHDRAW, nonce, [
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

  /*
      (32 bit amount | 32 bit highbit of address)
      (64 bit mid bit of address (be))
      (64 bit tail bit of address (be))
      */

  return {
    cmd: getTransactionCommandArray(WITHDRAW_LOTTERY, nonce, [
      (firstLimb << 32n) + amount,
      sndLimb,
      thirdLimb,
    ]),
    prikey: l2account.address,
  };
}
