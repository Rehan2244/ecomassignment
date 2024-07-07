import stateData from './states.json'

interface IStateSelector{
    getDistrict:any,
    states:ICountryState[]
}

interface ICountryState{
    state:string,
    districts:string[]
}
let stateSelector:IStateSelector={
    getDistrict:[''],
    states:stateData.states
}
stateSelector.getDistrict=(state:string)=>{
    return stateData.states.filter(el=>el.state==state)[0]?.districts
}
export const {states,getDistrict} = stateSelector
export default stateSelector;