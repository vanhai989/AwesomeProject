import { View, Text, StyleSheet } from 'react-native';
import { memo } from 'react';
import FastImage from 'react-native-fast-image';

export const heightItem = 555

const WrapTitle = (props) => {
    return (
        <View style={styles.wrapTitle}>
             <Text style={styles.name}>{props.title}: </Text>
             <Text style={styles.name} numberOfLines={2}>{props.value}</Text>
        </View>
    )
}

const CharacterListItem = ({ item }) => {

    return (
    <View style={styles.container}>
      <FastImage source={{ uri: item.avatar }} style={styles.image} />
      <WrapTitle title={'username'} value={item.username} />
      <WrapTitle title={'email'} value={item.email} />
      <WrapTitle title={'userId'} value={item.userId} />
      <WrapTitle title={'birthdate'} value={item.birthdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: heightItem,
    width: '100%',
    borderRadius: 10,
  },
  wrapTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20
  },
  name: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'grey',
    alignSelf: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default memo(
  CharacterListItem,
  (prevProps, nextProps) => prevProps.item.userId === nextProps.item.userId
);