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

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('98765 43210');
  const [countryCode, setCountryCode] = useState('+1');

  const handleContinue = () => {
    router.push('/(auth)/otp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 20 }}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
        <TouchableOpacity style={styles.helpBtn}>
          <Text style={{ fontSize: 16 }}>❓</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Brand Icon Showcase */}
        <View style={styles.brandCenter}>
          <View style={styles.brandIconCircle}>
            <Text style={{ fontSize: 36 }}>🍽️</Text>
          </View>
          <Text style={styles.brandTitle}>Belzo</Text>
          <Text style={styles.brandTagline}>GOOD FOOD. DELIVERED.</Text>
        </View>

        {/* Welcome Text */}
        <Text style={styles.welcomeHeading}>Welcome to Belzo</Text>
        <Text style={styles.welcomeSub}>
          Enter your phone number to login or create a new account in seconds.
        </Text>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.phoneRow}>
            <View style={styles.countryPill}>
              <Text style={styles.flagEmoji}>🇺🇸</Text>
              <Text style={styles.countryCodeText}>{countryCode}</Text>
              <Text style={{ fontSize: 10 }}>▼</Text>
            </View>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.phoneInput}
              placeholder="98765 43210"
              placeholderTextColor={Colors.onSurfaceVariant}
            />
          </View>
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity
          style={styles.submitBtn}
          activeOpacity={0.9}
          onPress={handleContinue}
        >
          <Text style={styles.submitBtnText}>Continue with OTP →</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social SSO */}
        <TouchableOpacity
          style={styles.socialBtn}
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={styles.socialBtnText}>🌐 Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialBtn, { backgroundColor: Colors.inverseSurface }]}
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={[styles.socialBtnText, { color: Colors.inverseOnSurface }]}>
             Continue with Apple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialBtn}
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={styles.socialBtnText}>✉️ Continue with Email</Text>
        </TouchableOpacity>

        {/* First Order Deal Callout */}
        <View style={styles.dealCard}>
          <Text style={{ fontSize: 24, marginRight: 10 }}>🍔</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.dealBadge}>⭐ FIRST ORDER DEAL</Text>
            <Text style={styles.dealTitle}>Get $0 Delivery Fee + 20% off</Text>
            <Text style={styles.dealSub}>Applied automatically upon verification</Text>
          </View>
        </View>

        <Text style={styles.termsFooter}>
          By continuing, you agree to Belzo's Terms of Service & Privacy Policy.
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
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  brandCenter: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  brandIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.primary,
  },
  brandTagline: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.secondary,
    marginTop: 2,
  },
  welcomeHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  welcomeSub: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginVertical: 8,
    lineHeight: 18,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 12,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    marginBottom: 6,
    marginLeft: 4,
  },
  phoneRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  countryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: Colors.surfaceContainerLow,
    gap: 6,
  },
  flagEmoji: {
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  submitBtn: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginVertical: 12,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.surfaceContainerHigh,
  },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.onSurfaceVariant,
    marginHorizontal: 10,
    letterSpacing: 1,
  },
  socialBtn: {
    width: '100%',
    backgroundColor: Colors.surfaceContainerLowest,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  socialBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  dealCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 12,
    width: '100%',
    marginTop: 16,
    alignItems: 'center',
  },
  dealBadge: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.primary,
  },
  dealTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.onSurface,
    marginTop: 2,
  },
  dealSub: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
  },
  termsFooter: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 24,
  },
});
