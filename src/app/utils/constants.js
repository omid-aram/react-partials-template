
export const AuctionState = {
    NotComplete : 0,
    NotPropagated : 1,
    InProgress : 2,
    EndResponse : 3,
    Winner1 : 4,
    Winner2 : 7,
    Winner1ActionEnd : 9,
    Winner2ActionEnd : 10,
    Finished : 11,
}


export const AuctionFindWinnerState ={
    None : 0,
    Winner1 : 1,
    Winner2 : 2,
}

export const Accesses = {
    Admin : 'admin',
    Auction : 'Auction',
    UserManagement : 'User_Management',
    Lookup : 'Lookup',
}