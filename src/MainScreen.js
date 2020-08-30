import React from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import {
  numberButtons,
  mathButtons,
  isIpX,
  isiOS,
  initialOutput,
} from './constants';
import Button from './Button';
import {connect} from 'react-redux';

const lastMathIndex = mathButtons.length - 1;

const MainScreen = (props) => {
  const _handleEvent = (value) => {
    if (value == 'clear') {
      return props.clear();
    }
    if (value == '=') {
      const re = /(?:(?:^|[-+_*÷])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;
      const isValidMathExpression = re.test(props.output);

      if (isValidMathExpression) {
        props.replaceBy('/');
        props.evaluate();
        props.resetMath(true);
      }
      return;
    }

    // reset after calculate
    if (props.reset) {
      if (isNaN(value)) {
        // is operator
        props.concat(value);
      } else {
        // is number
        props.concatWithout(value);
      }
      props.resetMath(false);
      return;
    }

    let strLastChar = props.output.slice(-1);

    // new expression replace old expression
    if (isNaN(strLastChar) && isNaN(value)) {
      props.replace(value);
    } else if (props.output !== initialOutput || isNaN(value)) {
      props.concat(value);
    } else {
      props.concatWithout(value);
    }
  };

  return (
    <View style={[styles.container, isIpX && {marginBottom: 34}]}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.placeHolderOutput}>
        <Text style={styles.txtDefault}>
          {props.output.toString().replace(/[/]/, '÷')}
        </Text>
      </View>
      <View style={styles.contRow}>
        <View style={styles.flexNumbers}>
          {numberButtons.map((row, index) => (
            <View key={index} style={styles.contRow}>
              {row.map((col, index) => (
                <Button
                  key={index}
                  textStyle={{
                    color: col == 'clear' ? 'rgba(46,46,46,0.65)' : 'black',
                  }}
                  onPress={() => _handleEvent(col)}
                  text={col}
                />
              ))}
            </View>
          ))}
        </View>
        <View style={styles.container}>
          {mathButtons.map((row, index) => (
            <Button
              style={[
                styles.button,
                {
                  borderTopWidth: index == 0 ? 0 : 1,
                  borderBottomWidth: index == lastMathIndex ? 0 : 1,
                },
              ]}
              textStyle={styles.operator}
              key={index}
              onPress={() => _handleEvent(row)}
              text={row}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexNumbers: {
    flex: 3,
  },
  container: {
    flex: 1,
  },
  contRow: {
    flex: 1,
    flexDirection: 'row',
  },
  placeHolderOutput: {
    flex: 1,
    backgroundColor: '#433437',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
  },
  txtDefault: {
    color: 'white',
    fontFamily: 'System',
    fontSize: 60,
  },
  button: {
    backgroundColor: '#f2274f',
    borderWidth: 0,
    borderTopColor: 'white',
    borderBottomColor: 'white',
  },
  operator: {color: 'white', fontSize: 40, fontWeight: 'bold'},
});

const mapStateToProps = (state) => ({
  output: state.calReducer.output,
  reset: state.calReducer.reset,
});
const mapDispatchToProps = (dispatch) => {
  const {
    clear,
    evaluate,
    replace,
    replaceBy,
    concat,
    concatWithout,
    resetMath,
  } = require('./actions');
  return {
    clear: () => dispatch(clear()),
    evaluate: () => dispatch(evaluate()),
    replace: (value) => dispatch(replace(value)),
    replaceBy: (value) => dispatch(replaceBy(value)),
    concat: (value) => dispatch(concat(value)),
    concatWithout: (value) => dispatch(concatWithout(value)),
    resetMath: (value) => dispatch(resetMath(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
