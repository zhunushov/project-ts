import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as actionCreators from '../store/action-creators/user'
import * as actionCartCreators from '../store/action-creators/cart'

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionCreators, dispatch)
}
export const useHalpActionst = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionCartCreators, dispatch)
}