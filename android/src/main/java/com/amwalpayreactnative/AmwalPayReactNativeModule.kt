package com.amwalpayreactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import tech.amwal.payment.PaymentSheet
import tech.amwal.payment.PaymentSheetResult
import tech.amwal.payment.dsl.paymentSheet
import androidx.activity.ComponentActivity


class AmwalPayReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun payWithAmwal(merchantId: String, amount: Double, promise: Promise) {
    (currentActivity as? ComponentActivity)?.apply {
      val paymentSheet: PaymentSheet = paymentSheet(
        merchantId = merchantId
      ) { result ->
        val arguments = Arguments.createMap()
        when (result) {
          PaymentSheetResult.Canceled -> {
            arguments.putString("status", "canceled")
          }

          is PaymentSheetResult.Failed -> {
            arguments.putString("status", "error")
            arguments.putString("message", result.error.message)
          }

          is PaymentSheetResult.Success -> {
            arguments.putString("status", "success")
            arguments.putString("transactionId", result.transactionId)
          }
        }
        promise.resolve(arguments)
      }
      paymentSheet.show(
        PaymentSheet.Amount(
          total = amount.toFloat(),
          tax = 0.0f,
          shipping = 0.0f,
          discount = 0.0f
        )
      )
    }

  }

  companion object {
    const val NAME = "AmwalPayReactNative"
  }
}
