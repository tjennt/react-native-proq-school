import React, { Component } from 'react';
import { View, 
  StyleSheet, 
  Dimensions, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator } from 'react-native';

import { Button, 
  Header,
  Text, 
  ThemeProvider, 
  ListItem, 
  Avatar, 
  SearchBar,
  Image } from 'react-native-elements';

import STYLE_GOBAL from '../../styles';

// IMPORT LOCALE
import { APP, NAVIGATOR } from '../../constants/Locale';

// IMPORT PARAMETER
import * as PARAMETER from '../../constants/Parameter';

import * as COLORS from '../../constants/Colors';
import Constants from 'expo-constants';

// IMPORT REDUX
import * as actions from '../../actions';
import { connect } from 'react-redux';

// IMPORT RENDER HTML
import HTML from "react-native-render-html";

import GLOBAL_STYLES from '../../styles';

export default class NewDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: true
  });

  constructor(props) {
    super(props)
    this.state = {
      opacityImage: 1
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    // console.log(navigation.getParam('news'))
    // console.log(this.props)
  }

  handleScroll = (event)=> {
    
    let height = event.nativeEvent.contentOffset.y
    let heightResult = 1

    if (height >= 10 && height < 40) {
      heightResult = 0.9
    }
    else if (height >= 40 && height < 60){
      heightResult = 0.8
    }
    else if (height >= 60 && height < 80){
      heightResult = 0.7
    }
    else if (height >= 80 && height < 100){
      heightResult = 0.6
    }
    else if (height >= 100 && height < 120){
      heightResult = 0.5
    }
    else if (height >= 120 && height < 140){
      heightResult = 0.4
    }
    else if (height >= 140 && height < 160){
      heightResult = 0.3
    }
    else if (height >= 160 && height < 180){
      heightResult = 0.2
    }
    else if (height >= 180 && height < 200){
      heightResult = 0.1
    }
    else if (height >= 200){
      heightResult = 0
    }
    
    this.setState({opacityImage: heightResult})
  }
  
  render() {
    const news = this.props.navigation.getParam('news');
    const { opacityImage } = this.state
    return (
      <View style={ styles.container }>
        <View style={ styles.viewImage }>
          <Image
            source={{ uri: news.image }}
            style={ [styles.image, { opacity: opacityImage } ] }
            PlaceholderContent={<ActivityIndicator color={ COLORS.MAIN_PRIMARY } />}
          />
        </View>

        <ScrollView 
          style={ styles.scrollView }
          onScroll={this.handleScroll}
        >
          <View style={ styles.viewContent }>
          <Text style={ [styles.title] }>
            {/* { news.title } */}
            Thông báo Kết quả thi Tiếng Anh đầu vào Học Kỳ Fall 2020 (K17.1.v1) Ngày thi 14/11/2020
            </Text>
              
              {/* AUTHOR, TIME */}
              <View style={ { flexDirection: 'row', marginTop: 10 } }>
                <Text style={ [GLOBAL_STYLES.TextStyle, styles.author] }>{ APP.author }: tiennt</Text>
                <Text 
                  style={ [GLOBAL_STYLES.TextStyle, styles.time] }>{ APP.time }: 10/09/2020</Text>
              </View>

              {/* CONTENT */}
              <View style={ styles.viewText }>
                <Text style={[ GLOBAL_STYLES.TextStyle, { fontSize: 20 }] }></Text>
                <HTML 
                  // tagsStyles={styles.HTML}
                  html={ `
                  <div class="kt-portlet kt-portlet--mobile"><div class="kt-portlet__head"><strong style="box-sizing: border-box;">Lưu ý:</strong></p> <p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(51, 51, 51); font-family: &quot;Segoe UI&quot;, Arial, Helvetica, sans-serif; font-size: 14px;">
                          -&nbsp;&nbsp;&nbsp; Sinh viên muốn hủy kết quả miễn giảm và học lại từ level 1A, vui lòng lên trường làm đơn tại phòng CTSV.</p> <ul style="box-sizing: border-box; margin-top: 0px; margin-bottom: 10px; color: rgb(51, 51, 51); font-family: &quot;Segoe UI&quot;, Arial, Helvetica, sans-serif; font-size: 14px;"><li style="box-sizing: border-box;">
                            CS1 : Tầng 5 -&nbsp;<em style="box-sizing: border-box;">391A Nam Kỳ Khởi Nghĩa, Phường 7,Quận 3, TP. Hồ Chí Minh</em></li> <li style="box-sizing: border-box;">
                            CS2: &nbsp;Tầng trệt -&nbsp;<em style="box-sizing: border-box;">778/B1 Nguyễn Kiệm, Phường 4,&nbsp;Quận Phú Nhuận, TP. Hồ Chí Minh</em></li> <li style="box-sizing: border-box;">
                            CS3 :&nbsp;<em style="box-sizing: border-box;">Toà nhà Innovation, lô 24, Công viên phần mềm Quang Trung, Quận 12, Hồ Chí Minh</em></li></ul> <p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(51, 51, 51); font-family: &quot;Segoe UI&quot;, Arial, Helvetica, sans-serif; font-size: 14px;">
                          -&nbsp; &nbsp; &nbsp;Hạn chót :&nbsp;<strong style="box-sizing: border-box;"><strong style="box-sizing: border-box;"><span style="box-sizing: border-box; background-color: rgb(255, 255, 0);">25/11/2</span></strong><span style="box-sizing: border-box; background-color: rgb(255, 255, 0);">020. Sau ngày 25/11/2020, yêu cầu hủy điểm sẽ không được giải quyết</span></strong></p> <p style="box-sizing: border-box; margin: 0px 0px 10px; color: rgb(51, 51, 51); font-family: &quot;Segoe UI&quot;, Arial, Helvetica, sans-serif; font-size: 14px;">
                          &nbsp;</p> <hr> <table border="0" cellpadding="0" cellspacing="0" width="787" style="width: 789px;"><colgroup><col> <col> <col> <col> <col> <col span="2"></colgroup> <tbody><tr height="22"><td height="22" style="height: 22px; width: 64px;">
                                STT</td> <td style="width: 87px;">
                                MSSV</td> <td style="width: 241px;">
                                Họ và tên</td> <td style="width: 143px;">
                                Level miễn giảm</td> <td style="width: 127px;">
                                Cơ sở</td> <td style="width: 64px;">
                                Ghi Chú</td> <td style="width: 64px;">
                                Version</td></tr> <tr height="22"><td height="22" style="height: 22px;">
                                1</td> <td>
                                PS19098</td> <td>
                                Lê Phước&nbsp;Đức</td> <td>
                                TOPNOTCH 1</td> <td>
                                FPL HCM</td> <td>
                                CS1</td> <td>
                                V1</td></tr> <tr height="22"><td height="22" style="height: 22px;">
                                2</td> <td>
                                PS19122</td> <td>
                                Nguyễn Thị&nbsp;Hạnh</td> <td>
                                TOPNOTCH 1</td> <td>
                                FPL HCM</td> <td>
                                CS2</td> <td>
                                V1</td></tr> <tr height="22"><td height="22" style="height: 22px;">
                                3</td> <td>
                                PS19175</td> <td>
                                Nguyễn Phi&nbsp;Long</td> <td>
                                TOPNOTCH 1</td> <td>
                                FPL HCM</td> <td>
                                CS1</td> <td>
                                V1</td></tr> <tr height="22"><td height="22" style="height: 22px;">
                                4</td> <td>
                                PS19105</td> <td>
                                Cao Hoài Bảo&nbsp;Ngọc</td> <td>
                                TOPNOTCH 1</td> <td>
                                FPL HCM</td> <td>
                                CS3</td> <td>
                                V1</td></tr> <tr height="22"><td height="22" style="height: 22px;">
                                5</td> <td>
                                PS19178</td> <td>
                                Nguyễn Hoàng Bảo&nbsp;Trân</td> <td>
                                TOPNOTCH 1</td> <td>
                                FPL HCM</td> <td>
                                CS1</td> <td>
                                V1</td></tr> <tr height="22"><td height="22" style="height: 22px;">
                                6</td> <td>
                                PS19108</td> <td>
                                Nguyễn Hữu&nbsp;Trí</td> <td>
                                TOPNOTCH 1</td> <td>
                                FPL HCM</td> <td>
                                CS3</td> <td>
                                V1</td></tr> <tr height="22"><td height="22" style="height: 22px;">
                                7</td> <td>
                                PS19087</td> <td>
                                Lê Hoàng&nbsp;Việt</td> <td>
                                TOPNOTCH 1</td> <td>
                                FPL HCM</td> <td>
                                CS1</td> <td>
                                V1</td></tr></tbody></table> <p>
                          &nbsp;</p> <em>
                        Người đăng: loannyb<br>
                        Thời gian: 16:24:06 - 18/11/2020<br></em></div></div>` } 
                  contentWidth={100}
                />
              </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT 
  },
  viewContent: {
    padding: 10,
    marginTop: 190,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.LIGHT,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5
  },
  scrollView: {
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  author: { 
    flex: 0.5, 
    color: COLORS.MAIN_GRAY
  },
  time: { 
    flex: 0.5, 
    color: COLORS.MAIN_GRAY, 
    textAlign: 'right', 
    alignSelf: 'stretch' 
  },
  viewText: {
    marginTop: 10
  },
  viewImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    backgroundColor: "#000000"
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 200,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  HTML: {

  }
});