import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";
//import { QRreader  } from "react-native-qr-decode-image-camera";
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// import RNQRGenerator from 'rn-qr-generator';
export default class PatientCodeScanAndResultImageScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reader: {
        message: null,
        data: null
      }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.openPhoto();
          }}
        >
          <Text style={{ marginTop: 20 }}>просто кек бля</Text>
        </TouchableOpacity>
        <View>
          {!this.state.reader ? (
            <Text>
              {!this.state.reader.message ? "" : `${this.state.reader.message}`}
            </Text>
          ) : (
            <Text>
              {!this.state.reader.message
                ? ""
                : `${this.state.reader.message}:${this.state.reader.data}`}
            </Text>
          )}
        </View>
      </View>
    );
  }
 
  openPhoto() {
    console.log("ImagePicker");

    const options = {
       
      includeBase64: true,
      saveToPhotos:true
    };
    // launchCamera(options, (response) => {
    //   console.log( response.base64)
    //  // setDetectImageUri({uri: response.uri});

    //  let data ="data:image/jpeg;base64,"+"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"
    //   RNQRGenerator.detect({base64:  data})
    //     .then((res) => {
    //       if (res.values.length === 0) {
    //         console.log('Cannot detect', "err");
    //       } else {
    //         console.log(res.values);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log('Cannot detect', err);
    //     });
    // });


//     launchCamera
//     (
//       {
//       mediaType: 'photo',
//       includeBase64: true,
//       maxHeight: 200,
//       maxWidth: 200,
//       saveToPhotos:true
//     }, (response) => {
      
//       let path=response.uri 
//      // alert(path)
//      RNQRGenerator.detect({
//   base64: 'data:image/jpeg;base64,'+response.base64 
// })
//   .then(response => {
//     console.log(response)
//     const { values } = response; // Array of detected QR code values. Empty if nothing found.
//   })
//   .catch(error => console.log('Cannot detect QR code in image', error));
//             }
//   )


    // ImagePicker.launchImageLibrary({}, response => {
    //   console.log("Response = ", response);
 
    //   if (response.didCancel) {
    //     console.log("User cancelled image picker");
    //   } else if (response.error) {
    //     console.log("ImagePicker Error: ", response.error);
    //   } else if (response.customButton) {
    //     console.log("User tapped custom button: ", response.customButton);
    //   } else {
    //     if (response.uri) {
    //       var path = response.path;
    //       if (!path) {
    //         path = response.uri;
    //       }
    //       QRreader(path)
    //         .then(data => {
    //           this.setState({
    //             reader: {
    //               message: "message",
    //               data: data
    //             }
    //           });
    //           setTimeout(() => {
    //             this.setState({
    //               reader: {
    //                 message: null,
    //                 data: null
    //               }
    //             });
    //           }, 10000);
    //         })
    //         .catch(err => {
    //           this.setState({
    //             reader: {
    //               message: "message",
    //               data: null
    //             }
    //           });
    //         });
    //     }
    //   }
    // });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});