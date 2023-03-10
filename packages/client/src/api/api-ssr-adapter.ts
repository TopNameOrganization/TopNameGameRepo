import { AxiosInstance, AxiosAdapter, AxiosPromise, AxiosResponse } from "axios";
import { isServer } from "../constants/is-browser";

export const setAdapterForSSR = (instance: AxiosInstance): void => {
  if (isServer) {
    console.log('SET AXIOS SSR ADAPTER!!!!');
    const adapter: AxiosAdapter = (): AxiosPromise => {
      const res = {} as AxiosResponse;
      return Promise.resolve(res);
    };

    instance.defaults.adapter = adapter;
  }
} 