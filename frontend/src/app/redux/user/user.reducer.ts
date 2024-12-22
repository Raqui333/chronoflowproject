const initialState = {
  currentUser: null,
};

type userActionObject = {
  type: string;
  payload: number;
};

export default function userReducer(
  state = initialState,
  action: userActionObject
) {
  switch (action.type) {
    case 'user/login':
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
