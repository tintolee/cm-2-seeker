import React, { PureComponent } from 'react'
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

export default class index extends PureComponent {
    lastTap = null;
    handleDoubleTap = () => {
        // alert("sa")
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
            this.props.doubleTap()
        } else {
          this.lastTap = now;
        }
      }
    render() {
        return (
            <TouchableOpacity activeOpacity = {1}  onPress = {this.handleDoubleTap}>
                {this.props.children}
            </TouchableOpacity>
        )
    }
}
