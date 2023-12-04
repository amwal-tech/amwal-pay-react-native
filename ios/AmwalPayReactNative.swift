import AmwalPay
import SwiftUI
import Foundation

@objc(AmwalPayReactNative)
class AmwalPayReactNative: NSObject {

    @objc(payWithAmwal:amount:resolver:rejecter:)
    func payWithAmwal(merchantId: String,
                      amount: String,
                      resolve: @escaping RCTPromiseResolveBlock,reject: @escaping RCTPromiseRejectBlock) -> Void {

        let vat = 0.0
        guard let amountNum = Double(amount) else {
            reject("the provided amount is not a number",
                   "argument amount should be always a number",
                   NSError(domain: "the provided amount is not a number",
                           code: 9999,
                           userInfo: [NSLocalizedDescriptionKey: "argument amount should be always a number"]))

            return
        }
        let paymentView = AmwalPaymentView(
            currency: .SAR,
            amount: amountNum,
            vat: Double(vat),
            merchantId: merchantId) {transactionId in
                //create NSDictionary to return to react native
                let result = ["transactionId": transactionId, "status": "success"]
                resolve(result)
            }
        DispatchQueue.main.async {
            let paymentViewController = UIHostingController(rootView: paymentView)
            let rootViewController = UIApplication.shared.keyWindow?.rootViewController
            rootViewController?.present(paymentViewController, animated: true, completion: nil)
        }

    }
}
