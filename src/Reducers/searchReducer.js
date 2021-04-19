const initialstate={searchtext:"",clicked:"false"}

export const searchReducer = (state = initialstate, action) => {
    switch (action.type) {
      case "SEARCH_QUERY":
        return {...state,searchtext:action.payload,clicked:"false"};
      case "SEARCH_CLICKED":
        return{ ...state,clicked:"true"};
      default:
        return state;
    }
  };