import React, { useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

const IFramWebView = (props) => {
    const [visible, setVisible] = useState(true);
    // const videoUrl = "https://staging.covistix.com/assets/media/instruction.mp4";
    const videoUrl = typeof props['authenticatedUser'] != 'undefined' && typeof props['authenticatedUser']['LanguageId'] != 'undefined' && props.authenticatedUser.LanguageId == 2 ? "https://staging.covistix.com/assets/media/instruction_spanish.mp4" : "https://staging.covistix.com/assets/media/instruction.mp4";
    // const { videoUrl } = props
    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: videoUrl }}
                style={{ flex: 1 }}
                mediaPlaybackRequiresUserAction={true}
                allowsFullscreenVideo={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onLoadStart={() => setVisible(true)}
                onLoadEnd={() => setVisible(false)}
            />

            {visible && <View style={styles.activityIndicatorStyle}>
                <ActivityIndicator
                    color="#696969"
                    size="large"
                />
            </View>}
        </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    activityIndicatorStyle: {
        flex: 1,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
});

export default IFramWebView