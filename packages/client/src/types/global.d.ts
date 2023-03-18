import { RootState } from "./src/store/reducers"

declare const __SERVER_PORT__: number
declare const __INITIAL_STATE__: RootState;

declare module '*.png';

// Fixes TS2694
declare global {
  namespace React {
    /** Fixes React 18 compatibility issues with formik: https://github.com/jaredpalmer/formik/issues/3546#issuecomment-1127014775 */
    type StatelessComponent<P> = React.FunctionComponent<P>;
  }
}

// Fixes TS2669
export {};