import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { Helpers } from 'App/Theme'
import PropTypes from 'prop-types';

class TopHeaderWithTwoOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IsImage: false
        }
    }
    render() {
        return (
            <View style={{ position: 'relative', width: '100%' }}>
                <View
                    style={{
                        width: '100%', flexDirection: 'row',
                        justifyContent: 'space-between', height: this.props.fullComponentHeight,
                        backgroundColor: this.props.fullComponentbackgroundColor
                    }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', }}>
                        <TouchableOpacity
                            style={{
                                width: 50, height: 50,
                                borderRadius: 50 / 2, marginLeft: 5,
                                backgroundColor: 'transparent', alignItems: 'center'
                            }}
                            onPress={this.props.onPressLeftButton}
                        >
                            <Image style={{ height: 20, width: 20, marginTop: 15 }} source={this.props.LeftImage} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'column', height: 60, justifyContent: 'center' }}>
                        <Text style={[Helpers.lightBook, styles.TiTleCss, { color: this.props.MiddleHeaderTitlecolor, }]}>
                            {this.props.MiddleHeaderTitle}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'column', height: 60, justifyContent: 'center' }}>
                        <TouchableOpacity
                            onPress={this.props.onPressRightButton}
                        >
                            {this.props.IsImage ?
                                <Image style={{ height: 20, width: 20, marginRight: 15 }} source={this.props.RightImage} /> :
                                <Text
                                    style={[Helpers.lightBook, styles.TiTleCss,
                                    { color: this.props.RightSideTitleColor, marginRight: 15 }]}>
                                    {this.props.RightHeaderTitle}
                                </Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    TiTleCss: {
        fontSize: 16,
        textAlign: 'left',
        width: '100%'
    },
});

const PropType = PropTypes
TopHeaderWithTwoOption.propTypes = {
    onPressLeftButton: PropType.func,
    onPressRightButton: PropType.func,
    MiddleHeaderTitle: PropType.string,
    RightHeaderTitle: PropType.string,
    LeftImage: PropType.string,
    RightImage: PropType.string,
    IsImage: PropTypes.bool,
    RightSideTitleColor: PropType.string,
    MiddleHeaderTitlecolor: PropType.string,
};

export default TopHeaderWithTwoOption;