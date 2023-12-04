import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'amwal-pay-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AmwalPayReactNative = NativeModules.AmwalPayReactNative
  ? NativeModules.AmwalPayReactNative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function payWithAmwal(
  merchantId: string,
  amount: string
): Promise<{ [key: string]: string }> {
  return AmwalPayReactNative.payWithAmwal(merchantId, amount);
}
