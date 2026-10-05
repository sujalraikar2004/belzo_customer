import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../theme/colors';
import { MOCK_ORDERS } from '../../mock/orders';

export default function LiveOrderTrackingScreen() {
  const router = useRouter();
  const order = MOCK_ORDERS[0];
  const [summaryExpanded, setSummaryExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 20 }}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Order Tracking</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={{ fontSize: 16 }}>🔗</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Reference & Support Bar */}
        <View style={styles.refRow}>
          <View style={styles.rowCenter}>
            <View style={styles.refIcon}>
              <Text style={{ fontSize: 14 }}>🧾</Text>
            </View>
            <View>
              <Text style={styles.refLabel}>ORDER REFERENCE</Text>
              <Text style={styles.refVal}>{order.id}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.helpBtn}>
            <Text style={styles.helpBtnText}>🎧 Help & Support</Text>
          </TouchableOpacity>
        </View>

        {/* ETA Pulse Banner */}
        <View style={styles.etaBanner}>
          <View style={styles.rowBetween}>
            <View style={styles.liveBadge}>
              <View style={styles.pulseDot} />
              <Text style={styles.liveBadgeText}>LIVE TRACKING</Text>
            </View>
            <Text style={styles.etaEstimated}>Estimated: 07:45 PM</Text>
          </View>
          <Text style={styles.arrivingBig}>Arriving in 18 mins</Text>
          <Text style={styles.arrivingSub}>Alex is on the way with your food!</Text>
          <Text style={styles.arrivingMeta}>
            Pedaling smoothly through Central Ave. Fresh & steaming hot.
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '80%' }]} />
          </View>
        </View>

        {/* Live Vector Map Simulation */}
        <View style={styles.mapContainer}>
          <View style={styles.mapCanvasMock}>
            {/* Visual simulation of streets and route */}
            <View style={styles.mapStreet1} />
            <View style={styles.mapStreet2} />
            <View style={styles.restaurantPin}>
              <Text style={styles.pinLabel}>🍴 The Urban Grill</Text>
            </View>
            <View style={styles.homePin}>
              <Text style={styles.pinLabel}>🏠 Home (Apt 4B)</Text>
            </View>
            {/* Scooter Courier Pin */}
            <View style={styles.scooterMarker}>
              <View style={styles.scooterPulse} />
              <View style={styles.scooterCircle}>
                <Text style={{ fontSize: 16 }}>🛵</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Delivery Partner Information Card */}
        <View style={styles.courierCard}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <Image source={{ uri: order.courier?.avatar }} style={styles.courierAvatar} />
              <View>
                <View style={styles.rowCenter}>
                  <Text style={styles.courierName}>{order.courier?.name}</Text>
                  <View style={styles.ratingTag}>
                    <Text style={styles.ratingTagText}>★ {order.courier?.rating}</Text>
                  </View>
                </View>
                <Text style={styles.courierSub}>{order.courier?.deliveryCount}</Text>
                <Text style={styles.courierSub}>{order.courier?.vehicle}</Text>
              </View>
            </View>
            <View style={styles.courierActions}>
              <TouchableOpacity
                style={styles.actionCircleBtn}
                onPress={() => router.push('/chat/driver')}
              >
                <Text style={{ fontSize: 18 }}>📞</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionCircleBtn, { backgroundColor: Colors.primary }]}
                onPress={() => router.push('/chat/driver')}
              >
                <Text style={{ fontSize: 18, color: '#fff' }}>💬</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Courier Note */}
          <View style={styles.driverNoteBox}>
            <Text style={styles.driverNoteKicker}>LATEST NOTE FROM ALEX</Text>
            <Text style={styles.driverNoteText}>"{order.courierNote}"</Text>
          </View>

          {/* Safety Strip */}
          <View style={styles.safetyStrip}>
            <Text style={styles.safetyItem}>✓ Vaccinated Partner</Text>
            <Text style={styles.safetyItem}>🌡️ Temp Checked (98.2°F)</Text>
            <Text style={styles.safetyItem}>🛡️ Contactless</Text>
          </View>
        </View>

        {/* 5-Stage Live Order Timeline */}
        <View style={styles.timelineCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardHeading}>Order Progress</Text>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>STEP 4 OF 5</Text>
            </View>
          </View>

          <View style={styles.timelineList}>
            {order.timeline.map((step) => (
              <View key={step.step} style={styles.timelineItem}>
                <View style={styles.stepIndicatorCol}>
                  <View
                    style={[
                      styles.stepCircle,
                      step.isCompleted && styles.stepCircleCompleted,
                      step.isActive && styles.stepCircleActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepNum,
                        (step.isCompleted || step.isActive) && { color: '#fff' },
                      ]}
                    >
                      {step.isCompleted ? '✓' : step.step}
                    </Text>
                  </View>
                  {step.step < order.timeline.length && <View style={styles.stepLine} />}
                </View>
                <View style={styles.stepContent}>
                  <View style={styles.rowBetween}>
                    <Text
                      style={[
                        styles.stepTitle,
                        step.isActive && { color: Colors.primary, fontWeight: '800' },
                      ]}
                    >
                      {step.title}
                    </Text>
                    <Text style={styles.stepTime}>{step.time}</Text>
                  </View>
                  <Text style={styles.stepDesc}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Collapsible Order Summary */}
        <View style={styles.summaryCard}>
          <TouchableOpacity
            style={styles.summaryHeader}
            onPress={() => setSummaryExpanded(!summaryExpanded)}
          >
            <View style={styles.rowCenter}>
              <Text style={{ fontSize: 20 }}>🍔</Text>
              <View>
                <Text style={styles.summaryTitle}>3 items from {order.restaurantName}</Text>
                <Text style={styles.summarySub}>Total ₹{order.bill.toPay} • Paid via Google Pay UPI</Text>
              </View>
            </View>
            <Text style={{ fontSize: 18 }}>{summaryExpanded ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {summaryExpanded && (
            <View style={styles.summaryExpandedContent}>
              {order.items.map((i) => (
                <View key={i.id} style={styles.rowBetween}>
                  <Text style={styles.sumItemText}>{i.quantity}x {i.dish.name}</Text>
                  <Text style={styles.sumItemPrice}>₹{i.itemTotal}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  iconBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  refRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
  },
  refVal: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  helpBtn: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  helpBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  etaBanner: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    gap: 4,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSecondaryFixed,
  },
  etaEstimated: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  arrivingBig: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
    marginTop: 8,
  },
  arrivingSub: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
    marginTop: 2,
  },
  arrivingMeta: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: Colors.primary,
  },
  mapContainer: {
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#e9edff',
  },
  mapCanvasMock: {
    flex: 1,
    position: 'relative',
  },
  mapStreet1: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: '#fff',
  },
  mapStreet2: {
    position: 'absolute',
    left: 140,
    top: 0,
    bottom: 0,
    width: 12,
    backgroundColor: '#fff',
  },
  restaurantPin: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 2,
  },
  homePin: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 2,
  },
  pinLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  scooterMarker: {
    position: 'absolute',
    top: 100,
    left: '52%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scooterPulse: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(182, 23, 21, 0.2)',
  },
  scooterCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  courierCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  courierAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  courierName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  ratingTag: {
    backgroundColor: Colors.secondaryFixed,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  ratingTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSecondaryFixed,
  },
  courierSub: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  courierActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverNoteBox: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  driverNoteKicker: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.primary,
  },
  driverNoteText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: Colors.onSurface,
    marginTop: 2,
  },
  safetyStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  safetyItem: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
  },
  timelineCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  stepBadge: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  stepBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.primary,
  },
  timelineList: {
    marginTop: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 52,
  },
  stepIndicatorCol: {
    alignItems: 'center',
    width: 28,
  },
  stepCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleCompleted: {
    backgroundColor: Colors.secondary,
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
  },
  stepNum: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.surfaceContainerHigh,
  },
  stepContent: {
    flex: 1,
    paddingLeft: 8,
    paddingBottom: 14,
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  stepTime: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  stepDesc: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  summaryCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  summarySub: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  summaryExpandedContent: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceContainerLow,
    gap: 6,
  },
  sumItemText: {
    fontSize: 12,
    color: Colors.onSurface,
  },
  sumItemPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
});
