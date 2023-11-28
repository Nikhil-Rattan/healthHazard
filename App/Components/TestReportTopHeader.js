import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity,
    Image,
} from 'react-native';
import { Images, Helpers } from 'App/Theme'
import PropTypes from 'prop-types';

class TestReportTopHeader extends React.Component {
    render() {
        return (
            <View style={{ top: -0, backgroundColor: this.props.BGColor, width: '100%' }}>
                <Image style={{ width: '100%', height: 240, position: 'relative' }} resizeMode='stretch' source={this.props.TopHeaderResultImage} />
                <View style={{ width: '100%', top: 20, alignItems: 'flex-start', position: 'absolute' }}>
                    <TouchableOpacity
                        style={{ width: 60, height: 60, }}
                        onPress={this.props.onPressBackButton}
                    >
                        <Image
                            source={Images.BackIcon}
                            style={[Helpers.iconsmall, { marginLeft: 15, marginTop: 15 }]}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.TiTleCss, { top: 100, color: 'white', fontSize: 17, position: 'absolute' }, Helpers.bold]}>{this.props.TopText}</Text>
                <Text style={[styles.TiTleCss, { top: 150, color: 'white', fontSize: 30, position: 'absolute' }, Helpers.bold]}>{this.props.TestResultTest}</Text>

            </View>


        );
    }
}
const styles = StyleSheet.create({

    TiTleCss: {
        marginTop: 10,
        fontSize: 19,
        textAlign: 'center',
        width: '100%'
    },
});

const PropType = PropTypes
TestReportTopHeader.propTypes = {
    onPressBackButton: PropType.func,
    TopText: PropType.string,
    TestResultTest: PropType.string,
    LeftImage: PropType.string,
    BGColor: PropType.string,
    TopHeaderResultImage: PropType.string,
};
export default TestReportTopHeader;