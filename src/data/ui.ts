import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export enum UIState{
	Idle,
	WelcomePage,
	QueryWithdraw,
	WithdrawPopup,
	QueryDeposit,
	DepositPopup,
	QueryGiftbox,
	StakePopup,
	QueryStake,
	FinishStake,
	GiftboxPopup,
	SponsorPopup,
	LotteryHeatPopup,
	QueryLotteryHeat,
	ConfirmPopup,
	ErrorPopup,
}

interface PropertiesUI {
	uiState: UIState;
	targetMemeIndex: number;
	giftboxShake: boolean;
	progressReset: boolean;
	popupDescription: string;
	showProgressBarGoodJob: boolean;
	showProgressBarNice: boolean;
	lotteryInfoDiff: number;
}

const initialState: PropertiesUI = {
		uiState: UIState.WelcomePage,
		targetMemeIndex: 0,
		giftboxShake: false,
		progressReset: false,
		popupDescription: "",
		showProgressBarGoodJob: false,
		showProgressBarNice: false,
		lotteryInfoDiff: 0,
	};

export const uiuxSlice = createSlice({
	name: 'properties',
	initialState,
	reducers: {
		setTargetMemeIndex: (state, action) => {
			state.targetMemeIndex = action.payload;
		},

		setUIState: (state, action) => {
			state.uiState = action.payload.uIState;
		},
		setGiftboxShake: (state, action) => {
			state.giftboxShake = action.payload.giftboxShake;
		},
		setProgressReset: (state, action) => {
			state.progressReset = action.payload.progressReset;
		},
		setPopupDescription: (state, action) => {
			state.popupDescription = action.payload.popupDescription;
		},
		setShowProgressBarGoodJob: (state, action) => {
			state.showProgressBarGoodJob = action.payload.showProgressBarGoodJob;
		},
		setShowProgressBarNice: (state, action) => {
			state.showProgressBarNice = action.payload.showProgressBarNice;
		},
		resetLotteryInfoDiff: (state, action) => {
			state.lotteryInfoDiff = 0;
		},
	},
	/*  handle diff ?
			.addCase(sendTransaction.fulfilled, (state, action) => {
				if (state.uIState == UIState.CreatePlayer){
					state.uIState = UIState.QueryState;
				}
				state.memeList = action.payload.memeList;
				state.globalTimer = action.payload.globalTimer;
				state.lotteryInfoDiff = state.player.data.lottery_info == 0 
					? 0 
					: state.lotteryInfoDiff + (action.payload.player.data.lottery_info - state.player.data.lottery_info);
				state.player = action.payload.player;
				state.lastTxResult = action.payload.globalTimer;
				console.log("send transaction fulfilled. The command processed at:", action.payload);
			})
			.addCase(sendTransaction.rejected, (state, action) => {
				if (state.uIState == UIState.QueryWithdraw){
					state.lastTxResult = action.payload!.message;
				}
				state.uIState = UIState.QueryState;
				console.log(`send transaction rejected: ${action.payload}`);
			})
	*/
});

export const selectUIState = (state: RootState) => state.uiux.uiState;
//export const selectLotteryInfoDiff = (state: RootState) => state.puppyParty.properties.lotteryInfoDiff;
export const selectTargetMemeIndex = (state: RootState) => state.uiux.targetMemeIndex;
export const selectGiftboxShake = (state: RootState) => state.uiux.giftboxShake;
export const selectProgressReset = (state: RootState) => state.uiux.progressReset;
export const selectPopupDescription = (state: RootState) => state.uiux.popupDescription;
export const selectShowProgressBarGoodJob = (state: RootState) => state.uiux.showProgressBarGoodJob;
export const selectShowProgressBarNice = (state: RootState) => state.uiux.showProgressBarNice;
export const selectLotteryInfoDiff= (state: RootState) => state.uiux.lotteryInfoDiff;

export const { setTargetMemeIndex, setUIState, setGiftboxShake, setProgressReset, setPopupDescription, setShowProgressBarGoodJob, setShowProgressBarNice, resetLotteryInfoDiff } = uiuxSlice.actions;
export default uiuxSlice.reducer;
