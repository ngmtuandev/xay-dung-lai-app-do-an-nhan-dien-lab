import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { routers } from "../navigate/routers";
import face from "../assets/images/face.png"

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={face} // Placeholder for the header image
                        style={styles.headerImage}
                    />
                </View>

                {/* Categories Section */}
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => navigation.navigate(routers.OVERALL_ACTIVE)} style={[styles.membershipCard, { backgroundColor: '#FFE9E5' }]}>
                        <Text style={styles.planTitle}>TỔNG QUAN PHÒNG</Text>
                        <TouchableOpacity style={styles.tryNowButton}>
                            <Text style={styles.tryNowButtonText}>XEM</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate(routers.LOGTIME_HISTORY)} style={[styles.membershipCard, { backgroundColor: '#E9FDE5' }]}>
                        <Text style={styles.planTitle}>XEM LẠI LỊCH SỬ VÀO / RA</Text>
                        <TouchableOpacity style={styles.tryNowButton}>
                            <Text style={styles.tryNowButtonText}>XEM</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate(routers.REGISTER_FACE)} style={[styles.membershipCard, { backgroundColor: '#c1ffd2' }]}>
                        <Text style={styles.planTitle}>ĐĂNG KÍ THÔNG TIN</Text>
                        <TouchableOpacity style={styles.tryNowButton}>
                            <Text style={styles.tryNowButtonText}>ĐĂNG KÍ</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate(routers.WELCOME)} style={[styles.membershipCard, { backgroundColor: '#FFE9E5' }]}>
                        <Text style={styles.planTitle}>ĐĂNG KÍ KHUÔN MẶT</Text>
                        <TouchableOpacity style={styles.tryNowButton}>
                            <Text style={styles.tryNowButtonText}>ĐĂNG KÍ</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    

                </View>

                {/* Skin Type Section */}
                {/* <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skin Type</Text>
                    <View style={styles.grid}>
                        <TouchableOpacity style={styles.gridItem}>
                            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.iconImage} />
                            <Text style={styles.gridText}>NORMAL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridItem}>
                            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.iconImage} />
                            <Text style={styles.gridText}>DRY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridItem}>
                            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.iconImage} />
                            <Text style={styles.gridText}>OILY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridItem}>
                            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.iconImage} />
                            <Text style={styles.gridText}>COMBINE</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </ScrollView>

            {/* Bottom Navigation with Centered Floating Button */}
            {/* <View style={styles.bottomNavContainer}>
                <View style={styles.bottomNav}>
                    <TouchableOpacity>
                        <Image style={styles.navIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.navIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.navIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.navIcon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.floatingButton}>
                    <Text style={styles.floatingButtonText}>+</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    header: {
        height: 200,
        backgroundColor: '#FF7A44', // Solid color instead of gradient
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        alignContent: "center"
    },
    headerImage: {
        position: 'absolute',
        width: '50%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        opacity: 0.8,
        objectFit: "contain"
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "#FFF",
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 20,
        height: 360
    },
    membershipCard: {
        width: '100%',
        backgroundColor: '#FFF', // Change the background color for each card
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        position: 'relative', // For the badge positioning
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        height: "40%",
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    planTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF7A44', // Same color as in the header
        marginBottom: 10,
    },
    planPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    tryNowButton: {
        backgroundColor: '#FF7A44', // Adjust button color
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    tryNowButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    badge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#FFA17F', // Adjust badge color
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '45%',
        height: 240,
        borderRadius: 10,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    gridText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    iconImage: {
        width: 100,
        height: 100,
        marginBottom: 5,
    },
    bottomNavContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
    },
    navIcon: {
        width: 30,
        height: 30,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 35,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFA17F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButtonText: {
        fontSize: 36,
        color: '#FFF',
        lineHeight: 40,
    },
});
