import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/reducers";
import {bindActionCreators} from "@reduxjs/toolkit";
import Actions from "../store/actions";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppActions = () => bindActionCreators(Actions, useAppDispatch())
