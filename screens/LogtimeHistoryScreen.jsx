import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

// Dữ liệu mẫu
const logtimeData = [
    { id: '1', title: 'Prototype Planning', description: 'Lorem Ipsum is simply...', time: '00:25:35', start: '3:15PM', end: '3:40PM', color: '#C0F0DA' },
    { id: '2', title: 'Design Sprint', description: 'Add description...', time: '01:12:25', start: '3:15PM', end: '4:30PM', color: '#FFE3E3' },
    { id: '3', title: 'API Team Discussion', description: 'Add description...', time: '00:25:35', start: '5:15PM', end: '5:40PM', color: '#C0F0DA' },
    { id: '4', title: 'Knowledge Session', description: 'Add description...', time: '02:17:25', start: '5:15PM', end: '7:32PM', color: '#FFE3E3' }
];

// Thành phần cho từng mục trong lịch sử logtime
const LogtimeItem = ({ title, description, time, start, end, color }) => (
    <View style={styles.logItem}>
        {/* Chỉnh lại bố cục tiêu đề để hiển thị ngang */}
        <View style={[styles.titleContainer, { backgroundColor: color }]}>
            <Text style={styles.titleText}>{title}</Text>
        </View>
        <View style={styles.detailsContainer}>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.timeRange}>{start} - {end}</Text>
        </View>
    </View>
);

const LogtimeHistoryScreen = () => {
    return (
        <View style={styles.container}>
            {/* Phần trên cùng */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Working on these?</Text>
                <TouchableOpacity style={styles.taskButton}>
                    <Text style={styles.taskButtonText}>Brainstorming session</Text>
                    <Text style={styles.playIcon}>▶</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.taskButton}>
                    <Text style={styles.taskButtonText}>Sprint Planning & Discussion</Text>
                    <Text style={styles.playIcon}>▶</Text>
                </TouchableOpacity>
            </View>

            {/* Phần lịch sử logtime */}
            <Text style={styles.sectionTitle}>Today</Text>
            <FlatList
                data={logtimeData}
                renderItem={({ item }) => (
                    <LogtimeItem
                        title={item.title}
                        description={item.description}
                        time={item.time}
                        start={item.start}
                        end={item.end}
                        color={item.color}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

export default LogtimeHistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    taskButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFAF0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    taskButtonText: {
        fontSize: 16,
        color: '#333',
    },
    playIcon: {
        fontSize: 18,
        color: '#FF6C6C',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    logItem: {
        flexDirection: 'row', // Đặt flexDirection để hiển thị theo hàng ngang
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    titleContainer: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 10,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    detailsContainer: {
        flex: 1,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    time: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6C6C',
        marginBottom: 5,
    },
    timeRange: {
        fontSize: 12,
        color: '#888',
    },
});
