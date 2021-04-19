export const drawerReducer = (state = false, action) => {
    switch (action.type)
     {
      case "CLICKED_DRAWER": {
        

        return action.payload;
      }

      default:{

        return{...state}
      }
    }
}