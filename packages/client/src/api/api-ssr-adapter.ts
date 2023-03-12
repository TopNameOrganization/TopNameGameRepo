import { AxiosInstance, AxiosAdapter, AxiosPromise, AxiosResponse } from "axios";
import { isServer } from "../constants/is-browser";

export const setAdapterForSSR = (instance: AxiosInstance): void => {
    if (isServer) {
    const adapter: AxiosAdapter = (): AxiosPromise => {
      const res = {} as AxiosResponse;
      return Promise.resolve(res);
    };

    instance.defaults.adapter = adapter;
  }
}
