import * as React from 'react';

import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { payWithAmwal } from 'amwal-pay-react-native';
import useState from 'react-usestateref';
import { MerchantId } from './config';

/**
 * App class is a React component that handles payment process with AmwalPay
 */
export default function App() {
  const [merchantId, setMerchantId] = useState(MerchantId);
  const [amount, setAmount, amountRef] = useState('1');
  const [paymentStatus, setPaymentStatus] = useState(''); // null, 'success' or 'failure'
  const [paymentMessage, setPaymentMessage] = useState(''); // the message to display after payment
  React.useEffect(() => {}, [amount, merchantId]);

  /**
   * Sends a payment request with the merchant ID and amount using the payWithAmwal function.
   * @param {string} _merchantId - The merchant ID.
   * @param {string} _amount - The amount to be paid.
   * @returns {Promise<{ [key: string]: string }>} - Returns a promise that resolves to an object containing the payment details.
   */
  const payWrapper = async (
    _merchantId: string,
    _amount: string
  ): Promise<{ [key: string]: string }> => {
    return await payWithAmwal(_merchantId, _amount);
  };

  const handlePay = () => {
    payWrapper(merchantId, amountRef.current)
      .then((result) => {
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
      })
      .catch((error) => {
        setPaymentMessage(error.message);
        setPaymentStatus('failure');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AmwalPay react native</Text>
      <Text style={styles.label}>Merchant ID</Text>
      <TextInput
        style={styles.input}
        value={merchantId}
        onChangeText={setMerchantId}
        placeholder="Enter merchant ID"
      />
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={String(amount)}
        onChangeText={setAmount}
        placeholder="Enter amount"
        keyboardType="numeric"
      />
      <Button title="Pay with Amwal" onPress={handlePay} />
      {/* render the payment result text conditionally */}
      {paymentStatus && (
        <Text
          style={[
            styles.result,
            // change the text color based on the payment status
            paymentStatus === 'success' ? styles.success : styles.failure,
          ]}
        >
          {paymentMessage}
        </Text>
      )}
    </View>
  );
}

/**
 * Defines the styles for a React Native component using StyleSheet.create.
 *
 * @type {{container: Object, label: Object, title: Object, input: Object, result: Object, success: Object, failure: Object}}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    margin: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    margin: 16,
  },
  result: {
    fontSize: 16,
    marginVertical: 10,
  },
  success: {
    color: 'green',
  },
  failure: {
    color: 'red',
  },
});
