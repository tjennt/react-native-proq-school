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

class NewDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerShown: true,
    title: '',
    headerStyle: { 
      height: 50, 
    },
    headerTransparent: true
  });

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleAddNewsDetail = () => {
    this.props.addNewsDetail();
  };

  componentDidMount() {
    const { navigation } = this.props;
    // console.log(navigation.getParam('news'))
    console.log(this.props)
  }

  render() {
    const news = this.props.navigation.getParam('news');

    return (
      <View style={ styles.container }>
        <View style={ styles.viewImage }>
          <Image
            source={{ uri: news.image }}
            style={ styles.image }
            />
        </View>

        <ScrollView style={ styles.scrollView }>
          <View style={ styles.viewContent }>
          <Text style={ styles.title }>{ news.title }</Text>
              
              {/* AUTHOR, TIME */}
              <View style={ { flexDirection: 'row', marginTop: 10 } }>
                <Text style={ styles.author }>{ APP.author }: hoangvc</Text>
                <Text 
                  style={ styles.time }>{ APP.time }: 10/09/2020</Text>
              </View>

              {/* CONTENT */}
              <View style={ styles.viewText }>
                <Text style={{ fontSize: 20 }}>
                Hey guys, ở 2 phần trước, chúng ta đã hiểu và cài đặt Redux dùng với React Native, giờ là đến phần quan trọng nhất của Redux, cái mà chúng ta gần như sẽ dùng nó liên tục trong dự án thực tế, đó chính là middleware.
                Middleware là gì?
                Xét ví dụ: ở bài 2 khi bấm nút INCREASE thì bộ đếm counter ngay lập tức tăng lên 1 đơn vị:
                export const counterIncrease 
                Giờ bài toán đặt ra là: muốn bấm vào button increase nhưng sau 1s bộ đếm counter mới tăng lên 1 đơn vị, vậy phải xử lý ntn?
                Chúng ta thử modify cái action ở trên thành như này liệu ok ko nhé?
                export const counterIncrease
                Nhìn qua thì ok đấy, nhưng bạn thử xem, code chạy lập tức báo lỗi vì sao?
                vì đơn giản là tác giả Redux nói rằng :)).
                Actions must be plain objects, use custom middleware for async actions.
                Nghĩa là bạn ko bao giờ được phép viết “linh tinh” vào thân hàm action kia vì action phải là 1 plain object.
                Bạn sẽ hỏi tại sao là 1 plain object?
                Câu trả lời là nếu bạn làm mọi thứ theo cách đơn giản thì khi gặp vấn đề bạn cũng dễ dàng tìm ra nguyên do của nó.
                plain object mô tả hành động xảy ra theo cách clear nhất, nhìn vào object đó nó giúp bạn hiểu ngay được những gì đang diễn ra trong app và tại sao nó thay đổi.
                Để giải quyết các vấn đề phát sinh, râu ria lằng ngoằng này, Redux cung cấp 1 thằng mang tên middleware có nhiệm vụ tạo ra side-effect và xử lý trước khi gọi action.
                Về cơ bản nó là 1 bước trung gian như đúng cái tên của nó nghĩa là nhận các action đầu vào rồi và trả ra cũng là các action.
                </Text>
                <HTML 
                  tagsStyles={styles.HTML}
                  html={ news.description } 
                  contentWidth={100}
                />
              </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  title: state.newsDetail
});

export default connect(mapStateToProps, actions)(NewDetailScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT 
  },
  viewContent: { 
    padding: 10,
    marginTop: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.LIGHT
  },
  scrollView: {
    height: PARAMETER.HEIGHT_SCROLL != 0 ? PARAMETER.HEIGHT_SCROLL + 200 : 'unset',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  author: { 
    flex: 0.5, 
    color: '#cccccc' 
  },
  time: { 
    flex: 0.5, 
    color: '#cccccc', 
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
    justifyContent: 'flex-start'
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    height: 200,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20
  },
  HTML: {

  }
});