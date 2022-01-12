// // // // // // // // // // // // // // // // // // // //
// // // // // // // //ACTIONS // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //

export const actionTypes = {
    FetchMeetingId: '[FetchMeetingId] Action',
    FetchAgendaId: '[FetchAgendaId] Action',
    FetchApprovalId: '[FetchApprovalId] Action',
    FetchCapitalChangeId: '[FetchCapitalChangeId] Action',
    FetchBoardMeetingId: '[FetchBoardMeetingId] Action',
    FetchBoardAgendaId: '[FetchBoardAgendaId] Action',
    FetchEditData: '[FetchEditData] Action',
};

// // // // // // // // // // // // // // // // // // // //
// // // // // //CREATOR ACTIONS // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //

export const passIdsActions = {
    fetchMeetingId: item => ({
        type: actionTypes.FetchMeetingId,
        payload: item
    }),
    fetchAgendaId: item => ({
        type: actionTypes.FetchAgendaId,
        payload: item
    }),
    fetchApprovalId: item => ({
        type: actionTypes.FetchApprovalId,
        payload: item
    }),
    fetchCapitalChangeId: item => ({
        type: actionTypes.FetchCapitalChangeId,
        payload: item
    }),
    fetchBoardMeetingId: item => ({
        type: actionTypes.FetchBoardMeetingId,
        payload: item
    }),
    fetchBoardAgendaId: item => ({
        type: actionTypes.FetchBoardAgendaId,
        payload: item
    }),
    fetchEditData: item => ({
        type: actionTypes.FetchEditData,
        payload: item
    }),
};

// // // // // // // // // // // // // // // // // // // //
// // // // // // // // STATE // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //

const initialState = {
    meetingIdState: (0),
    agendaState: (0),
    approvalState: (0),
    capitalChangeState: (0),
    boardMeetingState: (0),
    editData:null
};

// // // // // // // // // // // // // // // // // // // //
// // // // // // //REDUCER // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FetchMeetingId: {
            return { ...state, meetingIdState: action.payload };
        }
        case actionTypes.FetchAgendaId: {
            return { ...state, agendaState: action.payload };
        }
        case actionTypes.FetchApprovalId: {
            return { ...state, approvalState: action.payload };
        }
        case actionTypes.FetchCapitalChangeId: {
            return { ...state, capitalChangeState: action.payload };
        }
        case actionTypes.FetchBoardMeetingId: {
            return { ...state, boardMeetingState: action.payload };
        }
        case actionTypes.FetchBoardAgendaId: {
            return { ...state, boardAgendaState: action.payload };
        }
        case actionTypes.FetchEditData: {
            return { ...state, editData: action.payload };
        }
       
        default:
            return state;
    }
};
