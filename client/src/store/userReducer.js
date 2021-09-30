
export const initialState = {
    site: "xyx.com",
    name:"test"
};

export const reducer = (state, action)=>{
    switch(action.type){
        case "UPDATE_NAME":
            return {...state, name: action.payload}
        default: 
            return state;
    }
}