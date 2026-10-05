import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../theme/colors';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('Sophia Bennett');
  const [email, setEmail] = useState('sophia.b@example.com');
  const [phone, setPhone] = useState('(555) 412-8920');
  const [refCode, setRefCode] = useState('EATDELIGHT24');
  const [selectedDiets, setSelectedDiets] = useState<string[]>(['Vegetarian', 'Vegan']);

  const toggleDiet = (diet: string) => {
    if (selectedDiets.includes(diet)) {
      setSelectedDiets(selectedDiets.filter((d) => d !== diet));
    } else {
      setSelectedDiets([...selectedDiets, diet]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 20 }}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Signup</Text>
        <TouchableOpacity style={styles.helpBtn}>
          <Text style={{ fontSize: 16 }}>❓</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.badgePill}>
          <Text style={styles.badgePillText}>🍴 JOIN 150K+ FOOD LOVERS</Text>
        </View>

        <Text style={styles.heading}>Create your Belzo account</Text>
        <Text style={styles.subheading}>
          Unlock exclusive food deals, instant live tracking, and earn reward coins with every delicious order.
        </Text>

        {/* Welcome Perk Unlocked */}
        <View style={styles.perkCard}>
          <Text style={{ fontSize: 22, marginRight: 10 }}>🎉</Text>
          <View>
            <Text style={styles.perkTitle}>Welcome Perk Unlocked</Text>
            <Text style={styles.perkSub}>Free delivery on your first 3 artisan orders</Text>
          </View>
        </View>

        {/* Form Inputs */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="e.g. Sophia Bennett"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            placeholder="e.g. sophia.b@example.com"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
            placeholder="(555) 000-0000"
          />
        </View>

        {/* Referral Box */}
        <View style={styles.refCard}>
          <Text style={styles.refTitle}>🎁 Have a friend's invite code?</Text>
          <View style={styles.refRow}>
            <TextInput
              value={refCode}
              onChangeText={setRefCode}
              style={styles.refInput}
              autoCapitalize="characters"
            />
            <View style={styles.appliedBadge}>
              <Text style={styles.appliedText}>Applied</Text>
            </View>
          </View>
          <Text style={styles.refBonus}>✓ +₹100 bonus voucher unlocked for first order</Text>
        </View>

        {/* Dietary Preferences */}
        <Text style={styles.dietHeading}>Dietary Preferences (Customizes feed)</Text>
        <View style={styles.dietRow}>
          {['Vegetarian', 'Non-Veg', 'Vegan', 'Halal', 'Gluten-Free'].map((d) => {
            const active = selectedDiets.includes(d);
            return (
              <TouchableOpacity
                key={d}
                style={[styles.dietChip, active && styles.dietChipActive]}
                onPress={() => toggleDiet(d)}
              >
                <Text style={[styles.dietText, active && styles.dietTextActive]}>{d}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Complete Signup Button */}
        <TouchableOpacity
          style={styles.submitBtn}
          activeOpacity={0.9}
          onPress={() => router.push('/(auth)/otp')}
        >
          <Text style={styles.submitBtnText}>Complete Signup →</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to our Terms of Use and Privacy Policy.
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
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  badgePill: {
    backgroundColor: Colors.secondaryFixed,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  badgePillText: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.onSecondaryFixed,
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  subheading: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
    marginTop: 4,
    lineHeight: 18,
  },
  perkCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 14,
    marginVertical: 12,
    alignItems: 'center',
  },
  perkTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  perkSub: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  inputGroup: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    marginBottom: 4,
    marginLeft: 2,
  },
  input: {
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 14,
    color: Colors.onSurface,
  },
  refCard: {
    backgroundColor: Colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 14,
    marginVertical: 8,
  },
  refTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  refRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  refInput: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    paddingVertical: 8,
  },
  appliedBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  appliedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  refBonus: {
    fontSize: 11,
    color: '#12B76A',
    fontWeight: '600',
    marginTop: 6,
  },
  dietHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
    marginTop: 10,
    marginBottom: 6,
  },
  dietRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dietChip: {
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  dietChipActive: {
    backgroundColor: Colors.inverseSurface,
  },
  dietText: {
    fontSize: 12,
    color: Colors.onSurface,
  },
  dietTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  termsText: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 14,
  },
});
