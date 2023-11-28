import React, { Component } from 'react';
import { Text, View, Animated, StatusBar, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, SafeAreaView } from 'react-native';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

imageCircle = require('./../../Assets/Images/Circle1.png')
imagePlus = require('./../../Assets/Images/Plus1.png')

export default class Successanimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plusPosition1: new Animated.Value(0),
      circlePosition1: new Animated.Value(0),
      circlePosition2: new Animated.Value(0),
      circlePosition3: new Animated.Value(0),
      plusPosition2: new Animated.Value(0),
      plusPosition3: new Animated.Value(0),
      circlePosition4: new Animated.Value(0),
      circlePosition5: new Animated.Value(0),
      plusPosition4: new Animated.Value(0),
      plusPosition5: new Animated.Value(0),
      circlePosition6: new Animated.Value(0),
      plusPosition6: new Animated.Value(0),
      circlePosition7: new Animated.Value(0),
      circlePosition8: new Animated.Value(0),
      circlePosition9: new Animated.Value(0),
      circlePosition10: new Animated.Value(0),
      plusPosition7: new Animated.Value(0),
      plusPosition8: new Animated.Value(0),
      plusPosition9: new Animated.Value(0),
      plusPosition10: new Animated.Value(0),
      plusPosition11: new Animated.Value(0),
      circlePosition11: new Animated.Value(0),
      circlePosition12: new Animated.Value(0),
      plusPosition12: new Animated.Value(0),     // Used in second parallel
      circlePosition13: new Animated.Value(0),
      circlePosition14: new Animated.Value(0),
      circlePosition15: new Animated.Value(0),
      plusPosition13: new Animated.Value(0),
      plusPosition14: new Animated.Value(0),
      plusPosition15: new Animated.Value(0),
    }
  }



  componentDidMount() {

    Animated.loop(
      Animated.sequence([

        Animated.parallel([

          Animated.timing(this.state.plusPosition1, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.circlePosition1, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.circlePosition2, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.circlePosition3, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.plusPosition2, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.plusPosition3, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
        ]),

        Animated.parallel([

          Animated.timing(this.state.circlePosition4, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.circlePosition5, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.plusPosition4, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.plusPosition5, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.circlePosition6, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.plusPosition12, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
        ]),
        Animated.parallel([
          Animated.timing(this.state.circlePosition7, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.plusPosition6, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.circlePosition8, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.circlePosition9, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.plusPosition7, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.plusPosition8, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
        ]),
        Animated.parallel([
          Animated.timing(this.state.plusPosition9, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.plusPosition10, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.plusPosition11, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.circlePosition10, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.circlePosition11, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
          Animated.timing(this.state.circlePosition12, {
            toValue: 100,
            useNativeDriver: false,
            duration: 5000
          }),
        ]),
        Animated.parallel([
          Animated.timing(this.state.plusPosition13, {
            toValue: 100,
            useNativeDriver: false,
            duration: 3500
          }),
          Animated.timing(this.state.plusPosition14, {
            toValue: 100,
            useNativeDriver: false,
            duration: 3500
          }),
          Animated.timing(this.state.plusPosition15, {
            toValue: 100,
            useNativeDriver: false,
            duration: 3500
          }),
          Animated.timing(this.state.circlePosition13, {
            toValue: 100,
            useNativeDriver: false,
            duration: 3500
          }),
          Animated.timing(this.state.circlePosition14, {
            toValue: 100,
            useNativeDriver: false,
            duration: 3500
          }),
          Animated.timing(this.state.circlePosition15, {
            toValue: 100,
            useNativeDriver: false,
            duration: 3500
          }),
        ])
      ])
    ).start()
  }



  render() {

    const rotateImg1 = this.state.plusPosition1.interpolate({
      inputRange: [0, 20, 40, 60, 80],
      outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg']
    })

    const rotateImgReverse = this.state.plusPosition1.interpolate({
      inputRange: [0, 20, 40, 60, 80],
      outputRange: ['0deg', '-90deg', '-180deg', '-270deg', '-360deg']
    })

    const rotateImg2 = this.state.plusPosition6.interpolate({
      inputRange: [0, 20, 40, 60, 80],
      outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg']
    })

    const rotateImg3 = this.state.plusPosition12.interpolate({
      inputRange: [0, 20, 40, 60, 80],
      outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg']
    })

    const rotateImg4 = this.state.plusPosition8.interpolate({
      inputRange: [0, 20, 40, 60, 80],
      outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg']
    })

    const rotateImg5 = this.state.plusPosition9.interpolate({
      inputRange: [0, 20, 40, 60, 80],
      outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg']
    })
    const rotateImg6 = this.state.plusPosition15.interpolate({
      inputRange: [0, 20, 40, 60, 80],
      outputRange: ['0deg', '90deg', '180deg', '270deg', '360deg']
    })

    return (
      <View>
        <Animated.View style={[styles.animatedView,        //First animated view
        {
          opacity: this.state.plusPosition1.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition1.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 50]
              }),
            },
            {
              translateY: this.state.plusPosition1.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 60]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage, { transform: [{ rotate: rotateImg1 }] }]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Second animated view
        {
          opacity: this.state.circlePosition1.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition1.interpolate({
                inputRange: [0, 100],
                outputRange: [width - 10, width - 60]
              }),
            },
            {
              translateY: this.state.circlePosition1.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 80]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Third animated view
        {
          opacity: this.state.circlePosition2.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition2.interpolate({
                inputRange: [0, 100],
                outputRange: [width / 2, width / 2 + 60]
              }),
            },
            {
              translateY: this.state.circlePosition2.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 2, height / 2 - 60]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Fourth animated view
        {
          opacity: this.state.circlePosition3.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition3.interpolate({
                inputRange: [0, 100],
                outputRange: [60, 90]
              }),
            },
            {
              translateY: this.state.circlePosition3.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 1.5, height / 1.5 - 60]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Fifth animated view
        {
          opacity: this.state.plusPosition2.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition2.interpolate({
                inputRange: [0, 100],
                outputRange: [width, width - 100]
              }),
            },
            {
              translateY: this.state.plusPosition2.interpolate({
                inputRange: [0, 100],
                outputRange: [height, height - 150]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage, { transform: [{ rotate: rotateImgReverse }] }]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Sixth animated view
        {
          opacity: this.state.plusPosition3.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition3.interpolate({
                inputRange: [0, 100],
                outputRange: [100, 150]
              }),
            },
            {
              translateY: this.state.plusPosition3.interpolate({
                inputRange: [0, 100],
                outputRange: [200, 250]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Seventh animated view
        {
          opacity: this.state.circlePosition4.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition4.interpolate({
                inputRange: [0, 100],
                outputRange: [width / 3, width / 4]
              }),
            },
            {
              translateY: this.state.circlePosition4.interpolate({
                inputRange: [0, 100, 150],
                outputRange: [height, height - 120, height - 300]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Eigth animated view
        {
          opacity: this.state.circlePosition5.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition5.interpolate({
                inputRange: [0, 100],
                outputRange: [width / 3, width / 3.5]
              }),
            },
            {
              translateY: this.state.circlePosition5.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 150]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Ninth animated view
        {
          opacity: this.state.plusPosition4.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition4.interpolate({
                inputRange: [0, 100],
                outputRange: [width / 3, width / 2]
              }),
            },
            {
              translateY: this.state.plusPosition4.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 3, height / 2]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Tenth animated view
        {
          opacity: this.state.plusPosition5.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition5.interpolate({
                inputRange: [0, 100],
                outputRange: [0, width / 4]
              }),
            },
            {
              translateY: this.state.plusPosition5.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 2 + 20, height / 2 - 80]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Eleventh animated view
        {
          opacity: this.state.circlePosition6.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition6.interpolate({
                inputRange: [0, 100],
                outputRange: [width - 20, width - 80]
              }),
            },
            {
              translateY: this.state.circlePosition6.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 2, height / 3]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Twelveth animated view
        {
          opacity: this.state.circlePosition7.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition7.interpolate({
                inputRange: [0, 100],
                outputRange: [width - 40, width - 100]
              }),
            },
            {
              translateY: this.state.circlePosition7.interpolate({
                inputRange: [0, 100],
                outputRange: [height - 100, height - 150]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Thirteenth animated view
        {
          opacity: this.state.plusPosition6.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition6.interpolate({
                inputRange: [0, 100],
                outputRange: [width / 2 - 100, width / 2 + 70]
              }),
            },
            {
              translateY: this.state.plusPosition6.interpolate({
                inputRange: [0, 100],
                outputRange: [100, 220]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage, { transform: [{ rotate: rotateImg2 }] }]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Fourteenth animated view
        {
          opacity: this.state.circlePosition8.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition8.interpolate({
                inputRange: [0, 100],
                outputRange: [width / 2, width / 3]
              }),
            },
            {
              translateY: this.state.circlePosition8.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 60]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Fifteenth animated view
        {
          opacity: this.state.circlePosition9.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition9.interpolate({
                inputRange: [0, 100],
                outputRange: [40, 80]
              }),
            },
            {
              translateY: this.state.circlePosition9.interpolate({
                inputRange: [0, 100],
                outputRange: [height - 100, height / 2 + 80]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Sixteenth animated view
        {
          opacity: this.state.plusPosition7.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition7.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 80]
              }),
            },
            {
              translateY: this.state.plusPosition7.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 2 - 50, height / 3]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>



        <Animated.View style={[styles.animatedView,        //Seventeenth animated view
        {
          opacity: this.state.plusPosition8.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition8.interpolate({
                inputRange: [0, 100],
                outputRange: [width / 2 + 20, 80]
              }),
            },
            {
              translateY: this.state.plusPosition8.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 2 + 100, height - 80]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage, { transform: [{ rotate: rotateImg5 }] }]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Eighteenth animated view
        {
          opacity: this.state.plusPosition9.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition9.interpolate({
                inputRange: [0, 100],
                outputRange: [width - width / 4, width]
              }),
            },
            {
              translateY: this.state.plusPosition9.interpolate({
                inputRange: [0, 100],
                outputRange: [0, height / 4 - 40]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage, { transform: [{ rotate: rotateImg3 }] }]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Nineteenth animated view
        {
          opacity: this.state.plusPosition10.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition10.interpolate({
                inputRange: [0, 100],
                outputRange: [30, 80]
              }),
            },
            {
              translateY: this.state.plusPosition10.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 4.5, 20]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage, { transform: [{ rotate: rotateImg4 }] }]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //Twenteeth animated view
        {
          opacity: this.state.plusPosition11.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition11.interpolate({
                inputRange: [0, 100],
                outputRange: [width - 80, width / 2 - 20]
              }),
            },
            {
              translateY: this.state.plusPosition11.interpolate({
                inputRange: [0, 100],
                outputRange: [height - 50, height - 150]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage, { transform: [{ rotate: rotateImg5 }] }]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //21st animated view
        {
          opacity: this.state.circlePosition10.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition10.interpolate({
                inputRange: [0, 100],
                outputRange: [width - 150, width / 2]
              }),
            },
            {
              translateY: this.state.circlePosition10.interpolate({
                inputRange: [0, 100],
                outputRange: [100, height / 3]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //22nd animated view
        {
          opacity: this.state.circlePosition11.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition11.interpolate({
                inputRange: [0, 100],
                outputRange: [width / 2 - 60, 20]
              }),
            },
            {
              translateY: this.state.circlePosition11.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 2 + 100, height / 2 - 80]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //23rd animated view
        {
          opacity: this.state.circlePosition12.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition12.interpolate({
                inputRange: [0, 100],
                outputRange: [width - 80, width - 60]
              }),
            },
            {
              translateY: this.state.circlePosition12.interpolate({
                inputRange: [0, 100],
                outputRange: [height - 300, height / 2 - 20]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage,]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //24rd animated view
        {
          opacity: this.state.plusPosition12.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition12.interpolate({
                inputRange: [0, 100],
                outputRange: [width / 2 + 10, width / 2 + 50]
              }),
            },
            {
              translateY: this.state.plusPosition12.interpolate({
                inputRange: [0, 100],
                outputRange: [height - 90, height - 200]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage, { transform: [{ rotate: rotateImg3 }] }]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //25th animated view
        {
          opacity: this.state.plusPosition13.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition13.interpolate({
                inputRange: [0, 100],
                outputRange: [width - 60, width - 20]
              }),
            },
            {
              translateY: this.state.plusPosition13.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 2 + 30, height / 3 + 20]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage, { transform: [{ rotate: rotateImg3 }] }]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //26th animated view
        {
          opacity: this.state.plusPosition14.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition14.interpolate({
                inputRange: [0, 100],
                outputRange: [width / 2, width / 3]
              }),
            },
            {
              translateY: this.state.plusPosition14.interpolate({
                inputRange: [0, 100],
                outputRange: [50, height / 3 - 80]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage, { transform: [{ rotate: rotateImg3 }] }]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //27th animated view
        {
          opacity: this.state.plusPosition15.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.plusPosition15.interpolate({
                inputRange: [0, 100],
                outputRange: [10, 40]
              }),
            },
            {
              translateY: this.state.plusPosition15.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 2 + 50, height - height / 3 + 20]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imagePlus} style={[styles.plusCircleImage, { transform: [{ rotate: rotateImg6 }] }]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //28th animated view
        {
          opacity: this.state.circlePosition13.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition13.interpolate({
                inputRange: [0, 100],
                outputRange: [width / 2 - 15, width / 2 - 70]
              }),
            },
            {
              translateY: this.state.circlePosition13.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 2 + 30, height / 2 - 40]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage,]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //29th animated view
        {
          opacity: this.state.circlePosition14.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition14.interpolate({
                inputRange: [0, 100],
                outputRange: [width - 80, width - 120]
              }),
            },
            {
              translateY: this.state.circlePosition14.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 2 + 60, height / 2 + 120]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage,]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.animatedView,        //30th animated view
        {
          opacity: this.state.circlePosition14.interpolate({
            inputRange: [0, 25, 50, 80, 100],
            outputRange: [0, 1, 0.3, 1, 0]
          })
        },
        {
          transform: [

            {
              translateX: this.state.circlePosition14.interpolate({
                inputRange: [0, 100],
                outputRange: [width - 100, width - 120]
              }),
            },
            {
              translateY: this.state.circlePosition14.interpolate({
                inputRange: [0, 100],
                outputRange: [height / 3 + 10, 80]
              }),
            },

          ],

        }
        ]}>

          <View style={[styles.plusCircleView]}>
            <Animated.Image source={imageCircle} style={[styles.plusCircleImage,]} />
          </View>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  animatedView: {
    width: '100%',
    height: height,
    position: 'absolute',
  },
  plusCircleView: {
    height: 25,
    width: 25
  },
  plusCircleImage: {
    height: 25,
    width: 25,
  }
})