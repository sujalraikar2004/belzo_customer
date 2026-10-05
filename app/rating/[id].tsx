import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../theme/colors';

export default function OrderRatingScreen() {
  const router = useRouter();
  const [foodStars, setFoodStars] = useState(5);
  const [courierStars, setCourierStars] = useState(5);
  const [selectedTip, setSelectedTip] = useState(30);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 20 }}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Rating</Text>
        <TouchableOpacity style={styles.helpBtn}>
          <Text style={{ fontSize: 16 }}>❓</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.deliveredKicker}>✓ DELIVERED at 7:45 PM</Text>
          <Text style={styles.bannerHeading}>How was your feast from The Urban Grill?</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.orderRef}>Order #BG-89421</Text>
            <Text style={styles.coinsBonus}>⭐ Earn +20 Coins</Text>
          </View>
        </View>

        {/* Food & Flavors Rating Card */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <Text style={{ fontSize: 20 }}>🍴</Text>
              <View>
                <Text style={styles.cardTitle}>Food & Flavors</Text>
                <Text style={styles.cardSub}>The Urban Grill • 3 items</Text>
              </View>
            </View>
            <Text style={styles.ratingBadge}>Loved it!</Text>
          </View>

          {/* Star selector */}
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <TouchableOpacity key={s} onPress={() => setFoodStars(s)}>
                <Text style={[styles.starChar, s <= foodStars && styles.starActive]}>★</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tags */}
          <Text style={styles.tagSectionTitle}>What stood out most?</Text>
          <View style={styles.tagsWrap}>
            {['Tasted Amazing 😋', 'Super Fresh & Hot 🔥', 'Generous Portions 🍱', 'Great Packaging 📦'].map(
              (tag, idx) => (
                <View key={idx} style={styles.tagChip}>
                  <Text style={styles.tagChipText}>{tag}</Text>
                </View>
              )
            )}
          </View>
        </View>

        {/* Courier Partner Rating */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhFXCeUQGIcCNbO1i3SZLyO-Y8xsMXXcgncilHuzLSMbpAO03aQoduLp4ThD_hN35f-HIHn0SHQYDvxdri2BArSa4lO2OWY8CuIYiEQydH0cG_0r1DM50d5IMeXubSeKdWNlzKOeH4P36eGs8srqT-4lXPUPgjqlpq2eLsqOC-gU3KdpwnFtJ0FExUg76LcsFie9ZLvzUclj2xXL1nhP43MwL-CX0K13Jokv-tspLXtkQlL3I-i58a',
                }}
                style={styles.courierThumb}
              />
              <View>
                <Text style={styles.cardTitle}>Alex Morgan</Text>
                <Text style={styles.cardSub}>Your Delivery Superstar</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity key={s} onPress={() => setCourierStars(s)}>
                  <Text style={{ fontSize: 16, color: '#D97706' }}>★</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.tagsWrap}>
            {['Speedy Delivery ⚡', 'Friendly & Polite 😊', 'Safe Driving 🛵'].map((tag, idx) => (
              <View key={idx} style={styles.tagChip}>
                <Text style={styles.tagChipText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Add a Tip */}
          <View style={styles.tipBox}>
            <Text style={styles.tipHeading}>🤝 Add a tip for Alex (Optional)</Text>
            <Text style={styles.tipSub}>100% of tips go directly to Alex</Text>
            <View style={styles.tipRow}>
              {[20, 30, 50].map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[styles.tipBtn, selectedTip === t && styles.tipBtnActive]}
                  onPress={() => setSelectedTip(t)}
                >
                  <Text style={[styles.tipBtnText, selectedTip === t && styles.tipBtnTextActive]}>
                    ₹{t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Detailed Review */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detailed Review (Optional)</Text>
          <TextInput
            value={reviewText}
            onChangeText={setReviewText}
            placeholder="Tell other foodies what made this meal special..."
            style={styles.reviewInput}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Food Snapshots */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>📸 Food Snapshots</Text>
            <Text style={styles.coinsBadge}>+20 COINS</Text>
          </View>
          <View style={styles.photoRow}>
            <View style={styles.addPhotoBox}>
              <Text style={{ fontSize: 24 }}>📷</Text>
              <Text style={styles.addPhotoText}>ADD PHOTO</Text>
            </View>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiLkSVyrIJgrj_wWqwWFPmsKVciwLd82aWncy4sHe5BOrOTNJ5wfC8Cn6L_SupUrcJTIThhVPYdhXC4TxBXFSgu7-Okcpccag_y7CTkyoPCcgcxxn9ip1BDewtIlbgAg-BCo6p_yNHJQr5vxRHJ3lShNFCJrf9_O1vsaYC6GPh80hD_83H0NEH4QnJ51ukofwKCsbw82RW-p2V-BfwRNgkSC6UNjT4yP4a2UglcD5kUlOU0S7JDrVm',
              }}
              style={styles.previewPhoto}
            />
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJb5tMd-GDeURItDkBjvVwKAkwiaU-3lealKGyXLcHbMd5MxDkFqm_o2grotQn2Htb7J_9wRIVwlekVjdziji8j5omxUJJf32_UhXgHhM3Voj3FX-XzgowZvAPo_riYVqCKcr-ceSlXiVdoITak9euCICpencEx9yk4HPVR2p8xAnNfFhmEKYQKuBt9yfMEfPzDe5sh2vW9SLQbVqFiqo3TUVIYTCDWcg_zimMPWiFwpXo2e69SRwc',
              }}
              style={styles.previewPhoto}
            />
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>
            {submitted ? '✓ Review Submitted & Coins Claimed!' : '⭐ Submit Review & Claim Coins →'}
          </Text>
        </TouchableOpacity>
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
  helpBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  banner: {
    backgroundColor: Colors.secondaryFixed,
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
  },
  deliveredKicker: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
  bannerHeading: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.onSecondaryFixed,
    marginVertical: 6,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderRef: {
    fontSize: 11,
    color: Colors.onSecondaryFixed,
  },
  coinsBonus: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  cardSub: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  ratingBadge: {
    backgroundColor: Colors.primaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 16,
  },
  starChar: {
    fontSize: 32,
    color: Colors.surfaceContainerHigh,
  },
  starActive: {
    color: '#D97706',
  },
  tagSectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    marginBottom: 8,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagChip: {
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  tagChipText: {
    fontSize: 11,
    color: Colors.onSurface,
  },
  courierThumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tipBox: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 12,
    marginTop: 14,
  },
  tipHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  tipSub: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    marginBottom: 8,
  },
  tipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tipBtn: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  tipBtnActive: {
    backgroundColor: Colors.primary,
  },
  tipBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  tipBtnTextActive: {
    color: '#fff',
  },
  reviewInput: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    fontSize: 12,
    color: Colors.onSurface,
    textAlignVertical: 'top',
  },
  coinsBadge: {
    backgroundColor: Colors.secondaryFixed,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    fontSize: 9,
    fontWeight: '700',
    color: Colors.onSecondaryFixed,
  },
  photoRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  addPhotoBox: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.primary,
    marginTop: 4,
  },
  previewPhoto: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
});
