import React, { Component } from 'react';
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Image
} from 'react-native';
import { Colors, Images, Helpers } from 'App/Theme'
import PropTypes from 'prop-types';

class ListCard extends React.Component {
   render() {
      return (
         <View style={[Helpers.boxWithShadow, {
            flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', width: '90%',
            paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 8, borderRadius: 13
         }]}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: 'transparent', width: '33%' }}>

               <Image style={Helpers.PharmacyPic, { height: 100, width: 100, borderRadius: 11 }} resizeMode='contain'
                  source={Images.PharmacyImage}
               />
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: 'transparent', width: '49%', marginLeft: 7 }}>
               <Text numberOfLines={1} style={[Helpers.bold, { fontSize: 20, color: '#333333', textAlign: 'left', width: '90%' }]}>
                  {this.props.name}
               </Text>
               <Text numberOfLines={3} style={[Helpers.mediumFont, { fontSize: 14, color: '#333333', textAlign: 'left', width: '90%', marginTop: 4 }]}>
                  {this.props.address}
               </Text>

               <View style={{ flexDirection: 'row', marginTop: 4 }}>
                  <Text style={[, { fontSize: 12, color: Colors.facilityColor, textAlign: 'left', width: '90%' }]}>
                     {this.props.distance}
                  </Text>
               </View>
            </View>

            <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: 'transparent', width: '13%' }}>
               <TouchableOpacity onPress={this.props.getItemDetail.bind(this)}>
                  <Image style={[Helpers.icon, { transform: [{ rotate: '180deg' }] }]} resizeMode='contain' source={Images.PurPleBackIcon} />
               </TouchableOpacity>
            </View>

         </View>
      );
   }
}
const styles = StyleSheet.create({
});

const PropType = PropTypes
ListCard.propTypes = {
   onPressBackButton: PropType.func,
   HeaderTitle: PropType.string,
   LeftImage: PropType.string,
   name: PropType.string,
   address: PropType.string,
   distance: PropType.string,
   getItemDetail: PropType.func,

};
export default ListCard;