import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as actionCreators from '../store/action-creators/user'
import * as actionCartCreators from '../store/action-creators/cart'
import * as actionElecCreators from '../store/action-creators/elect'

export const useUserActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionCreators, dispatch)
}

export const useCartActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionCartCreators, dispatch)
}

export const useElecActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionElecCreators, dispatch)
}