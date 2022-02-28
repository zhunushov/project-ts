import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reduser";

export const useTypedSelector : TypedUseSelectorHook <RootState> = useSelector