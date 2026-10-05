import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Camera,
  ChevronRight,
  CreditCard,
  Heart,
  LogOut,
  MapPin,
  Star,
  Ticket,
  Utensils,
} from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { useAuthStore } from '../../store/useAuthStore';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customer Profile & Account</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* VIP Profile Card */}
        <View style={styles.vipCard}>
          <View style={styles.userInfoRow}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: user?.avatar }} style={styles.avatar} />
              <View style={styles.cameraIcon}>
                <Camera color="#fff" size={11} strokeWidth={2.4} />
              </View>
            </View>
            <View style={styles.userTextCol}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userSub}>{user?.phone}</Text>
              <Text style={styles.userSub}>{user?.email}</Text>
            </View>
          </View>

          {/* Belzo Gold VIP Banner */}
          <TouchableOpacity style={styles.goldBanner} onPress={() => router.push('/coupons')}>
            <View style={styles.goldLeft}>
              <View style={styles.goldIconBox}>
                <Star color="#9A6700" size={16} fill="#9A6700" strokeWidth={2} />
              </View>
              <View>
                <View style={styles.rowCenter}>
                  <Text style={styles.goldTitle}>Belzo Gold</Text>
                  <View style={styles.vipBadge}>
                    <Text style={styles.vipBadgeText}>VIP</Text>
                  </View>
                </View>
                <Text style={styles.goldSub}>{user?.vipBenefitText}</Text>
              </View>
            </View>
            <ChevronRight color={Colors.onSurfaceVariant} size={19} strokeWidth={2.2} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: Colors.primary }]}>{user?.ordersDone}</Text>
            <Text style={styles.statLabel}>Orders Done</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: Colors.onSurface }]}>₹{user?.savedYearAmount}</Text>
            <Text style={styles.statLabel}>Saved Year</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: Colors.secondary }]}>{user?.savedPlacesCount}</Text>
            <Text style={styles.statLabel}>Saved Places</Text>
          </View>
        </View>

        {/* Account & Payments Group */}
        <Text style={styles.groupHeading}>Account & Payments</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push('/onboarding/location')}
          >
            <View style={styles.rowCenter}>
              <View style={[styles.iconBox, { backgroundColor: Colors.surfaceContainerLow }]}>
                <MapPin color={Colors.primary} size={18} strokeWidth={2.2} />
              </View>
              <View>
                <View style={styles.rowCenter}>
                  <Text style={styles.menuTitle}>Saved Addresses</Text>
                  <View style={styles.defaultTag}>
                    <Text style={styles.defaultTagText}>Home Default</Text>
                  </View>
                </View>
                <Text style={styles.menuSub}>Home, Work, Parents (3 locations)</Text>
              </View>
            </View>
            <ChevronRight color={Colors.onSurfaceVariant} size={19} strokeWidth={2.2} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuRow} onPress={() => router.push('/coupons')}>
            <View style={styles.rowCenter}>
              <View style={[styles.iconBox, { backgroundColor: Colors.secondaryFixed }]}>
                <CreditCard color={Colors.secondary} size={18} strokeWidth={2.2} />
              </View>
              <View>
                <Text style={styles.menuTitle}>Payment Methods & Wallet</Text>
                <Text style={styles.menuSub}>UPI, Visa ••4821 • Belzo ₹{user?.walletBalance}</Text>
              </View>
            </View>
            <View style={styles.rowCenter}>
              <Text style={styles.walletAmount}>₹{user?.walletBalance}</Text>
              <ChevronRight color={Colors.onSurfaceVariant} size={19} strokeWidth={2.2} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Dining Habits */}
        <Text style={styles.groupHeading}>Dining Habits</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push('/favorites')}
          >
            <View style={styles.rowCenter}>
              <View style={[styles.iconBox, { backgroundColor: Colors.primaryFixed }]}>
                <Heart color={Colors.primary} size={18} fill={Colors.primary} strokeWidth={2} />
              </View>
              <View>
                <Text style={styles.menuTitle}>Favorites & Wishlist</Text>
                <Text style={styles.menuSub}>6 restaurants & 14 saved dishes</Text>
              </View>
            </View>
            <ChevronRight color={Colors.onSurfaceVariant} size={19} strokeWidth={2.2} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.rowCenter}>
              <View style={[styles.iconBox, { backgroundColor: Colors.surfaceContainerLow }]}>
                <Utensils color={Colors.secondary} size={18} strokeWidth={2.2} />
              </View>
              <View>
                <Text style={styles.menuTitle}>Dietary Preferences</Text>
                <View style={styles.tagsRow}>
                  {user?.dietaryPreferences.map((tag, idx) => (
                    <View key={idx} style={styles.prefChip}>
                      <Text style={styles.prefChipText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <ChevronRight color={Colors.onSurfaceVariant} size={19} strokeWidth={2.2} />
          </TouchableOpacity>
        </View>

        {/* Perks & Rewards */}
        <Text style={styles.groupHeading}>Perks & Rewards</Text>
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuRow} onPress={() => router.push('/coupons')}>
            <View style={styles.rowCenter}>
              <View style={[styles.iconBox, { backgroundColor: Colors.secondaryFixed }]}>
                <Ticket color={Colors.secondary} size={18} strokeWidth={2.2} />
              </View>
              <View>
                <View style={styles.rowCenter}>
                  <Text style={styles.menuTitle}>Coupons & Vouchers</Text>
                  <View style={styles.badgePrimary}>
                    <Text style={styles.badgePrimaryText}>3 Ready</Text>
                  </View>
                </View>
                <Text style={styles.menuSub}>Up to 40% OFF next 2 dinners</Text>
              </View>
            </View>
            <ChevronRight color={Colors.onSurfaceVariant} size={19} strokeWidth={2.2} />
          </TouchableOpacity>
        </View>

        {/* Log Out */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <LogOut color={Colors.error} size={17} strokeWidth={2.2} />
          <Text style={styles.logoutBtnText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionFooter}>
          Belzo v2.4.1 (Build 890){'\n'}HANDCRAFTED FOR FOODIES
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  vipCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userTextCol: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  userSub: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 1,
  },
  goldBanner: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goldLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  goldIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEDF89',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  goldTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  vipBadge: {
    backgroundColor: Colors.secondaryFixed,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  vipBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.onSecondaryFixed,
  },
  goldSub: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  groupHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginTop: 12,
    marginBottom: 6,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  menuSub: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  defaultTag: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  defaultTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  walletAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.secondary,
  },
  chevron: {
    fontSize: 18,
    color: Colors.onSurfaceVariant,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceContainerLow,
    marginLeft: 60,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
  },
  prefChip: {
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  prefChipText: {
    fontSize: 10,
    color: Colors.onSurface,
  },
  badgePrimary: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgePrimaryText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
  },
  logoutBtn: {
    backgroundColor: Colors.errorContainer,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 16,
  },
  logoutBtnText: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: '700',
  },
  versionFooter: {
    textAlign: 'center',
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 16,
    lineHeight: 18,
  },
});
