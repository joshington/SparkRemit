import React,{useState,useEffect} from 'react';
import {Text,View,TextInput,StyleSheet,TouchableOpacity} from 'react-native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ButtonWIthText from '../components/ButtonWithText/ButtonWithText';

import Toast from "react-native-simple-toast";
import { Picker } from "@react-native-picker/picker";
import PayWithFlutterwave from "flutterwave-react-native";
import PropTypes from 'prop-types'
import {useSelector,useDispatch} from  'react-redux';
import {walletTopUp} from '../actions';



const LabelInput = ({label,placeText}) => {
    return (
        <View style={{marginTop:hp('4%')}}>
            <Text style={{fontSize:30}}>{label}</Text>
            <TextInput
                placeholder={placeText}
                style={{display:"flex",
                    height:hp('5%'),width:wp('50%'),borderRadius:wp('2%'),borderWidth:wp('0.3%'),
                    marginVertical:hp('6%')
                }}
            />
        </View>
    )
}

// FLWPUBK-cb38d8ffef2a9521711f24187beb95aa-X



//this code now
const styles = StyleSheet.create({
    amountContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: 10,
    },
    textInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        margin: 3,
        padding: 10,
        width: "60%",
    },
    label: {
        width: "35%",
    },
    payWithFlutterwaveContainer: {
        margin: 10,
        marginHorizontal:20
    },
});

const CustomTextInput = ({
    label,
    placeholder,
    placeholderTextColor,
    keyboardType,
    handleChangeText,
    value,
}) => {
    return (
        <View style={styles.amountContainer}>
            <Text style={styles.label}>{label}:</Text>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                keyboardType={keyboardType}
                onChangeText={handleChangeText}
                value={value}
            />
        </View>
    );
};

CustomTextInput.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    keyboardType: PropTypes.string,
    handleChangeText: PropTypes.func,
    // value: PropTypes.string,
};

const CurrencyPicker = ({ currency, onValueChange }) => (
    <Picker
        selectedValue={currency}
        style={{ height: 70, width: 400 }}
        onValueChange={onValueChange}
    >
        <Picker.Item label="Burundi Franc" value="BIF" />
        <Picker.Item label="Canadian Dollar" value="CAD" />
        <Picker.Item label="Congolese Franc" value="CDF" />
        <Picker.Item label="Cape Verdean Escudo" value="CVE" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="British Pound Sterling" value="GBP" />
        <Picker.Item label="Ghanaian Cedi" value="GHS" />
        <Picker.Item label="Gambian Dalasi" value="GMD" />
        <Picker.Item label="Guinean Franc" value="GNF" />
        <Picker.Item label="Kenyan Shilling" value="KES" />
        <Picker.Item label="Liberian Dollar" value="LRD" />
        <Picker.Item label="Malawian Kwacha" value="MWK" />
        <Picker.Item label="Mozambican Metical" value="MZN" />
        <Picker.Item label="Nigerian Naira" value="NGN" />
        <Picker.Item label="Rwandan Franc" value="RWF" />
        <Picker.Item label="Sierra Leonean Leone" value="SLL" />
        <Picker.Item label="São Tomé and Príncipe Dobra" value="STD" />
        <Picker.Item label="Tanzanian Shilling" value="TZS" />
        <Picker.Item label="Ugandan Shilling" value="UGX" />
        <Picker.Item label="United States Dollar" value="USD" />
        <Picker.Item label="CFA Franc BEAC" value="XAF" />
        <Picker.Item label="CFA Franc BCEAO" value="XOF" />
        <Picker.Item label="Zambian Kwacha" value="ZMW" />
        <Picker.Item label="Zimbabwean Dollar" value="ZWD" />
    </Picker>
);

CurrencyPicker.propTypes = {
    currency: PropTypes.string,
    onValueChange: PropTypes.func,
};

const MobileMoney = () => {
    const [currency, setCurrency] = useState("UGX");
    const [amount, setAmount] = useState(10000);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phonenumber, setPhone] = useState("");

    const makeid = (length) => {
        let result = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i += 1) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    };

    //handle the redirectParams 

    const target_email = useSelector(state => state.wallet.user_email)

    //just initiate dispatch
    const dispatch = useDispatch();

    const handleRedirect = (data) => {
        // // You can store these values in a database
        // console.log(
        //     `Status: ${status}\n ID: ${transaction_id}\n Ref: ${tx_ref}`
        // );

        //===now go ahead and update the wallet
        if(data.status === "successful"){
            //dispatch action to move funds to the user's wallet 
            //the endpoint takes in the amount to increase the balance and email for the wallet user,
            //and the transaction id
            //==time for the margic to start
            dispatch(walletTopUp(target_email,amount))
            //this above does the magic
        }else if(data.status === "cancelled"){
            Toast.show("Payment Not completed")
            //and thus do nothing to our wallet data.
        }
    };
    const handleIntializeError = ({ code, message, errorId, errors }) => {
        // You can use these for debugging
        Toast.show("Payment could not be initialized");
        console.log(
            "Code: %s\nMessage: %s\nID: %s\nErrors: %O",
            code,
            message,
            errorId,
            errors
        );
    };

    const handleWillInitialize = () => {
        Toast.show("Payment initializing...");
    };

    const handleDidInitialize = () => {
        Toast.show("Payment initialized...");
    };

    const handleOnAbort = () => {
        Toast.show("Payment cancelled...");
    };

    const handleChangeCurrency = (itemValue) => {
        setCurrency(itemValue);
    };

    const handleChangeAmount = (text) => setAmount(text);

    const handleChangeEmail = (text) => setEmail(text);

    const handleChangeName = (text) => setName(text);

    const handleChangePhone = (text) => setPhone(text);

    // useEffect(() => {
    //    console.log
    // }, []);


    
    return (
        <View style={{marginHorizontal:wp('10%'),paddingVertical:hp('9%')}}>
            {/* AMOUNT */}
            <CustomTextInput
                label="AMOUNT"
                placeholder="ENTER AMOUNT"
                placeholderTextColor="gray"
                keyboardType="numeric"
                handleChangeText={handleChangeAmount}
                value={amount}
            />

            {/* CURRENCY */}
            <View style={styles.amountContainer}>
                <Text style={styles.label}>CURRENCY:</Text>
                <CurrencyPicker
                    currency={currency}
                    onValueChange={handleChangeCurrency}
                />
            </View>

            <View style={styles.payWithFlutterwaveContainer}>
                <PayWithFlutterwave
                    onRedirect={handleRedirect}
                    onInitializeError={handleIntializeError}
                    onWillInitialize={handleWillInitialize}
                    onDidInitialize={handleDidInitialize}
                    onAbort={handleOnAbort}
                    options={{
                        tx_ref: makeid(10),
                        authorization:
                            "FLWPUBK-cb38d8ffef2a9521711f24187beb95aa-X",
                        customer: {
                            email:target_email,
                            name:'user',
                            phonenumber:'+256760810134',
                        },
                        amount,
                        currency,
                        payment_options:
                            "mpesa, mobilemoneyghana, mobilemoneyuganda, mobilemoneyrwanda, mobilemoneyzambia. mobilemoneytanzania",
                    
                    
                    }}
                    customButton={(props) => (
                        <TouchableOpacity
                            style={{backgroundColor:"green",height:40,alignItems:"center",borderRadius:15}}
                            onPress={props.onPress}
                            isBusy={props.isInitializing}
                            disabled={props.disabled}>
                                <Text style={{fontSize:18,color:"white"}}>Pay </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
};

MobileMoney.propTypes = {
    navigation: PropTypes.object,
    handleOnComplete: PropTypes.func,
    transactionReference: PropTypes.string,
};

export default MobileMoney;



//default no:+256771233788 - vibem