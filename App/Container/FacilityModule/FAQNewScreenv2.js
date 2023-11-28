

 import React, { Component } from 'react';
 import {
 StyleSheet,
 Text,SafeAreaView,
 View,Linking,
 TouchableHighlight,TouchableOpacity,
 Image,TextInput,
 Alert,
 ScrollView,AppState
 } from 'react-native';
 import {Colors, Fonts, Images, Metrics, Helpers, ApplicationStyles } from 'App/Theme'
 import AuthenticateActions from 'App/Stores/Authentication/Actions'
import NavigationService from 'App/Services/NavigationService'
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux'
 import CustomHeaderNew from 'App/Components/CustomHeaderNew';
 import FacilityProfileActions from 'App/Stores/FacilityProfile/Actions'
 class FAQNewScreen extends React.Component {
 constructor(props) {
 super(props);
 this.state={
  Faq:[],FaqTabClose:false,
  FaqNormalOpen:2
 }

 this._GetNotificationCount=this._GetNotificationCount.bind(this)
 }
 componentDidMount() {
  const { navigation } = this.props; 
    this._unsubscribe  = navigation.addListener("focus", () => {
      this.props.resetFaqList()
      this.props.getFaqList();

    });



   

  AppState.addEventListener("change", this._GetNotificationCount);

  }
  


    componentWillUnmount()
    {
      AppState.removeEventListener("change", this._GetNotificationCount);
    }

   
  
    _GetNotificationCount()
    {
      if(!(AppState.currentState=='background'))
      {
        let {UserId}=this.props.authenticatedUser
        this.props.getNotificationCount({UserId:UserId}) 
      }
      
     
    }

    componentDidUpdate(prevProps, prevState)
    {
    
     
    if(this.props.faqContentSuccessMessage!=null && prevProps.faqContentSuccessMessage!=this.props.faqContentSuccessMessage)
    {
    // this.RBErrorSheet.open()
    
    
    let list=this.props.faqContentList.slice();
     
      this.setState({Faq:list})
      setTimeout(() => {
        this._ShowQuestionDetailsNew()
      }, 600);
      
    }
    
    }

    _ShowQuestionDetailsNew(){
      let PositiveFAQ = this.props.route.params?.PositiveFAQ;
      
      if(PositiveFAQ==0)
      {
        let faq=this.state.Faq.slice()
        //  alert(JSON.stringify(faq))
          faq[PositiveFAQ].IsQuestionClicked=!faq[PositiveFAQ].IsQuestionClicked
          this.setState({Faq:faq})
      }
else{

}
    }
 _ShowQuestionDetails(item)
 {

 //    this.setState({IsDataShow: !this.state.IsDataShow })

 let faq=this.state.Faq.slice();

 let index=faq.findIndex((d)=>{return d.Question==item.Question});
 
  faq[index].IsQuestionClicked=!faq[index].IsQuestionClicked
  this.setState({Faq:faq})

 }
 renderItem(Item)
 {
     return(
       <ScrollView>
 <View style={{width:'100%',flexDirection:'row',justifyContent:'center',}}>
         <View
  style={{flexDirection:'row',width:'95%',backgroundColor:'white',justifyContent:'space-between',
  //borderBottomWidth:1,
  //borderBottomColor:'#DCDCDC'
  }}>
 <View style={{flexDirection:'column',marginVertical:15,width:'85%',justifyContent:'center'}}>
 <Text style={[Helpers.btnText,{color:Item.IsQuestionClicked? Colors.patientColor:Colors.Black,fontSize:14,textAlign:'left',marginLeft:30,marginTop:5}]}>
 {Item.Question}</Text>
 {Item.IsQuestionClicked?
 Item.Child.map((data)=>{
     return (
 <View>
  {this.renderChildItem(data)}
  </View>

     )
 })

 :null
 }
 </View>
 <View style={{width:'15%'}}>
 <TouchableOpacity
   style={{height:50,width:50,marginLeft:10,flexDirection:'column',borderRadius:50/2,justifyContent:Item.IsQuestionClicked?'flex-start':'center',}}
   onPress={this._ShowQuestionDetails.bind(this,Item)}>

           <Image style={[Helpers.iconsmall,{marginTop:Item.IsQuestionClicked?22:10,}]} resizeMode='contain' source={Item.IsQuestionClicked?Images.minusgrayIcon:Images.grayplusIcon} />
         </TouchableOpacity>
 </View>
 </View>

 </View>
 </ScrollView>
     )
 }

 renderChildItem(item)
 {
    if(item.IsImageURL)
    {
 return(
     <Image style={[{height:200,width:200,marginLeft:50}]} resizeMode='contain'
      source={{uri:  item.ContentText}} />
 )
    }
    else if(item.Child.length>0){
     return (item.Child.map((i)=>{
         return( this.renderChildItem(i))
     }))


    }
    else if(item.IsButton)
    {
     return(
         <View  style={{justifyContent:'flex-end',alignItems:'flex-end',width:'90%'}}>
         <TouchableOpacity onPress={this.downloadPDF.bind(this,item.URL)}>
         <View style={{width:150,height:40,flexDirection:'row',borderRadius:20,backgroundColor:Colors.patientColor,justifyContent:'center',alignItems:'center',
     }}>
        <Text  style={[Helpers.mediumFont,{fontSize:12,color:'white',textAlign:'center',width:'90%'}]}>
        {item.ContentText}
         </Text>
         </View>
         </TouchableOpacity>
         </View>
     )
    }
    else{
     return(<Text style={[Helpers.btnText,{color:Colors.Black,fontSize:14,textAlign:'left',marginLeft:30,marginTop:5}]}>
     {item.ContentText}</Text>
       )
    }
 }


 _OnClickCancel(){
    this.setState({IsCancelButton:false,searchvalue:''})
    this.setState({Faq: this.props.faqContentList})

    }
    downloadPDF(URL)
    {
        Linking.canOpenURL(URL)
        .then(supported => {
        if (supported) { 
     
        return Linking.openURL(URL);
        }
        })
        .catch(err => console.log(err));
    }
 SearchTextChanged(text)
{
  if(text != ''){
      let filter=this.state.Faq.filter((d)=>{return d.Question.toLowerCase().includes(text.toLowerCase())})
    this.setState({searchvalue:text,IsCancelButton:true,Faq:filter})
  }
  else{
    this.setState({searchvalue:text,IsCancelButton:false,Faq:this.props.faqContentList})
  }
}
 _CloseFAQtb(){
    this.setState({FaqTabClose:true})

    }

 render() {

     return (

<SafeAreaView style={[{backgroundColor:'white',flex:1}]}>
<Image style={{width:100,height:100,alignSelf:'center'}} resizeMode='contain' source={Images.MainLogo} />



<Text style={[{fontSize:25,color:Colors.BlueColorNew,width:'70%',marginLeft:20,textAlign:'left',marginTop:0,fontFamily:'gothamrounded-bold'}]}>

{this.props.selectedMessage["FAQuestion-Questions"]}
</Text>
<Text style={[styles.TiTleCss,{color:'#614698',width:'70%',marginLeft:20,textAlign:'left',marginTop:0,fontFamily:'gothamrounded-bold'}]}>
 
{this.props.selectedMessage["FAQuestion-FrequentlyAsked"]} 
  </Text>




<ScrollView >
<View style={[{marginBottom:50,width:'100%',position:'relative',backgroundColor:'#fbfbfb',height:'100%',}]}>



<View style={{flexDirection:'row',marginTop:35,justifyContent:'center',position:'relative', alignItems:'center',
width:'100%',backgroundColor:'transparent',height:55,}}>
  <View style={[{flexDirection:'row',marginTop:0,borderWidth:1,borderColor:Colors.DisableGrayColor,justifyContent:'center',backgroundColor:'white', width:'90%',borderRadius:12},this.state.IsCancelButton? {width:'70%'} :{width:'90%'}  ]}>
  {this.state.IsCancelButton?
        <Image style={[Helpers.iconsmall,{marginLeft:20,marginVertical:15}]} resizeMode='contain' source={Images.NewSearchIcon} />

       :
       <Image style={[Helpers.iconsmall,{marginLeft:20,marginVertical:15}]} resizeMode='contain' source={Images.NewSearchIcon} />
}
  <TextInput
      style={{ height: 40,fontSize:17, borderColor: 'gray',marginLeft:10,width:'80%',marginTop:10 }}
placeholderTextColor='#8492A6'
//placeholder='Search Questions By Title'
      placeholder={this.props.selectedMessage["FAQuestion-SearchQuestion"]}
      onChangeText={this.SearchTextChanged.bind(this)}

      value={this.state.searchvalue}
    />

  </View>
  {this.state.IsCancelButton?
  // <TouchableOpacity
  // style={{height:50,width:50,marginLeft:10,borderRadius:50/2,alignItems:'center',backgroundColor:'red'}}
  // onPress={this._OnClickCancel.bind(this)}>

  //         <Image style={[Helpers.iconsmall,{marginVertical:17}]} resizeMode='contain' source={Images.CrossIcon} />
  //       </TouchableOpacity>
  <TouchableOpacity onPress={this._OnClickCancel.bind(this)}>
  <Text style={[,{fontSize:18,color:'#152C52',textAlign:'left',marginLeft:20,marginTop:0}]}>
  {this.props.selectedMessage["TestResult-Cancel"]} 
        </Text>
        </TouchableOpacity>
        :
        null
  }

</View>



<View style={{alignItems:'center',height:10 }}>

{/* <Text style={[Helpers.btnText,Helpers.bold,{color:Colors.lightblack,fontSize:18,marginTop:50,textAlign:'center',}]}>{this.props.selectedMessage["FAQuestion-TopQuestion"]} </Text> */}
</View>

{this.state.Faq.map((i)=>{

   return(this.renderItem(i))
})} 

<View style={{height:50,marginBottom:50}}></View>



</View>
</ScrollView>

</SafeAreaView>

    );
  }
 }
 FAQNewScreen.propTypes = {





    authenticatedUser: PropTypes.any,


    getFaqList:PropTypes.func,
    faqContentList: PropTypes.any,
    faqContentSuccessMessage: PropTypes.any,
    faqContentErrorrMessage: PropTypes.any,
    logOut:PropTypes.func,
    selectedMessage:PropTypes.any,
    locale:PropTypes.any,
    getUserDetailById: PropTypes.func,
    getNotificationCount:PropTypes.func,
    }


    const mapStateToProps = (state) => ({


    authenticatedUser: state.authenticate.authenticatedUser,
    faqContentList: state.facilityProfile.faqContentList,
    faqContentSuccessMessage: state.facilityProfile.faqContentSuccessMessage,
    faqContentErrorrMessage: state.facilityProfile.faqContentErrorrMessage,
    selectedMessage:state.startup.selectedMessage,
    locale: state.startup.locale,

    })

    const mapDispatchToProps = (dispatch) => ({
    getFaqList: () => dispatch(FacilityProfileActions.getFaqList()),
    resetFaqList: () => dispatch(FacilityProfileActions.resetFaqList()),

    logOut: () => dispatch(AuthenticateActions.logOut()),
    getUserDetailById:(data)=>dispatch(AuthenticateActions.getUserDetailById(data)),
    getNotificationCount: (data) => dispatch(AuthenticateActions.getNotificationCount(data)),


    })

    export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(FAQNewScreen)

    const styles = StyleSheet.create({
      TiTleCss:{
        marginTop:10,
        fontSize:16 ,
        textAlign:'left',
        width:'100%',
        fontFamily:'Poppins-Medium'
      },
    });