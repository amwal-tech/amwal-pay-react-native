#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AmwalPayReactNative, NSObject)

RCT_EXTERN_METHOD(payWithAmwal: (NSString *)merchantId
                  amount: (nonnull NSString *)amount
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
