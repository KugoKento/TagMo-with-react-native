import {View, Text, StyleSheet} from 'react-native';

export default function Header() {

  return (
    <View style={styles.root}>
      <View style={styles.logo}>
        <Text style={styles.tagMo}>
          {`TagMo`}
        </Text>
      </View>
      {/* <SettingIcon/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: 376,
    height: 120,
    paddingTop: 12,
    paddingLeft: 108,
    paddingRight: 16,
    paddingBottom: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    rowGap: 60,
    columnGap: 60,
    flexShrink: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  tagMo: {
    width: 160,
    height: 32,
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
    fontFamily: 'Russo One',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  logo: {
    flexDirection: 'row',
    width: 160,
    paddingTop: 14,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
});

