import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const kBaseOpacity = 0.5;
const kFinalOpacity = 1;
const kAnimationDuration = 500;


class TypingIndicator extends React.Component {
  fadeDotAnim1 = new Animated.Value(kBaseOpacity); // Initial value for opacity: 0.5
  fadeDotAnim2 = new Animated.Value(kBaseOpacity);
  fadeDotAnim3 = new Animated.Value(kBaseOpacity);
  animationDuration = kAnimationDuration;
  constructor(props) {
    super(props);
    if (this.props.duration) {
      this.animationDuration = this.props.duration;
    }
  }

  componentDidMount() {
    this.runAnimation();
  }
  componentWillUnmount() {
    this.fadeDotAnim1.stopAnimation();
    this.fadeDotAnim2.stopAnimation();
    this.fadeDotAnim3.stopAnimation();
  }

  dotAnimation(dot: Animated.Value) {
    return Animated.stagger(this.animationDuration, [
      Animated.timing(dot, {
        duration: this.animationDuration,
        toValue: kFinalOpacity,
      }),
      Animated.timing(dot, {
        duration: this.animationDuration,
        toValue: kBaseOpacity,
      }),
    ]);
  }

  runAnimation() {
    Animated.parallel([
      this.dotAnimation(this.fadeDotAnim1),
      Animated.sequence([
        Animated.delay(this.animationDuration),
        this.dotAnimation(this.fadeDotAnim2),
      ]),
      Animated.sequence([
        Animated.delay(this.animationDuration * 1.5),
        this.dotAnimation(this.fadeDotAnim3),
      ]),
    ]).start(() => this.runAnimation());
  }

  render() {
    return (
      <Animated.View style={[styles.background, this.props.backgroundStyle]}>
        <View style={styles.innerContainer}>
          <Animated.View
            style={[
              styles.dotContainer,
              {
                opacity: this.fadeDotAnim1,
              },
            ]}
          >
            <View style={[styles.dot, this.props.dotStyle]} />
          </Animated.View>
          <Animated.View
            style={[
              styles.dotContainer,
              {
                opacity: this.fadeDotAnim2,
              },
            ]}
          >
            <View style={[styles.dot, this.props.dotStyle]} />
          </Animated.View>
          <Animated.View
            style={{
              opacity: this.fadeDotAnim3,
            }}
          >
            <View style={[styles.dot, this.props.dotStyle]} />
          </Animated.View>
        </View>
      </Animated.View>
    );
  }
}

TypingIndicator.defaultProps = {
  duration?: 500,
  dotStyle?: {},
  backgroundStyle?: {}
};

TypingIndicator.propTypes = {
  duration?: PropTypes.number,
  dotStyle?: PropTypes.object,
  backgroundStyle?: PropTypes.object
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    alignSelf: 'baseline',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    height: 30,
    margin: 10,
  },
  dot: {
    backgroundColor: 'white',
    borderRadius: 35,
    height: 7,
    width: 7,
  },
  dotContainer: {
    marginRight: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 11,
  },
});

export default TypingIndicator;