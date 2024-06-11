import CharacterListItem, { heightItem } from './item';
import { FlatList, View } from 'react-native';
import { useState, useEffect, useCallback, } from 'react';

let page = 1
const FlatlistOptimized = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = (pageIndex) => {
        setLoading(true);

        const url = `http://localhost:3000/generate-fake-info?page=${pageIndex}`
        // const url = `http://your ip address:3000/generate-fake-info?page=${pageIndex}`
        console.log('url', url);
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (pageIndex > 1) {
                    setData(pre => {
                        const newData = pre.concat(data.data)
                        dataLength = newData.length
                        return newData
                    });

                } else {
                    setData(data.data);
                }
            })
        setLoading(false);
    };

    const handleLoadMore = () => {
        if (loading || page > 20) {
            return;
        }
        page += 1
        fetchData(page)
    }

    const onRefresh = () => {
        resetPreLoad()
        setData([]);
        page = 1
        fetchData(1);
    };

    useEffect(() => {
        fetchData(1);
        return () => {
            page = 1
        }
    }, []);

    const renderItem = useCallback(
        ({ item }) => <CharacterListItem item={item} />,
        []
    );

    const _getItemLayout = (data, index) => {
        return {
            length: heightItem + 20,
            offset: (heightItem + 20) * index,
            index,
        }
    }

    if (data?.length === 0) {
        return null;
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                contentContainerStyle={{ gap: 20 }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={5}
                refreshing={loading}
                onRefresh={onRefresh}
                keyExtractor={(item, index) => index.toString()}
                removeClippedSubviews={true}
                initialNumToRender={3}
                getItemLayout={_getItemLayout}
            />
        </View>
    );
};

export default FlatlistOptimized;