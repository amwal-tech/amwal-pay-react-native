# amwal-pay-react-native

Payment SDK powered by passkeys

## Installation

```sh
npm install amwal-pay-react-native
```

## Usage

```ts
import { payWithAmwal } from 'amwal-pay-react-native';

/**
 * Sends a payment request with the merchant ID and amount using the payWithAmwal function.
 * @param {string} _merchantId - The merchant ID.
 * @param {string} _amount - The amount to be paid.
 * @returns {Promise<{ [key: string]: string }>} - Returns a promise that resolves to an object containing the payment details.
 */
const result =  await payWithAmwal(_merchantId, _amount);
```

```ts
 switch (result.status) {
          case 'success':
            setPaymentMessage(
              'payment with transactionId' +
                result.transactionId +
                ' is success'
            );
            setPaymentStatus(result.status);
            break;
          case 'error':
            setPaymentMessage(
              'payment' + ' is failed with error ' + result.message
            );
            setPaymentStatus(result.status);
            break;
          case 'cancel':
            setPaymentMessage('payment is canceled');
            setPaymentStatus(result.status);
            break;
        }
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
