const INITIAL_STATE = `I'm not Okay`
export default function text(state = INITIAL_STATE, action){
  switch(action.type){
    case 'CHANGE_TEXT':
      return action.text
    default:
      return state;
  }
}