import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as actionCreators from '../store/action-creators/product'
import * as actionCartCreators from '../store/action-creators/cart'
import * as actionElecCreators from '../store/action-creators/elect'
import * as actionAuthCreators from '../store/action-creators/auth'
import * as actionCommentCreators from '../store/action-creators/comment'

export const useProductActions = () => {
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

export const useAuthActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actionAuthCreators, dispatch)
}

export const useCommentActions = () => {
    const  dispatch = useDispatch()
    return bindActionCreators(actionCommentCreators, dispatch)
}
