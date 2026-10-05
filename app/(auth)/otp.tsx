import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../theme/colors';

export default function OtpVerifyScreen() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(41);
  const [otp] = useState(['4', '9', '2', '', '', '']);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [secondsLeft]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 20 }}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>OTP Verify</Text>
        <TouchableOpacity style={styles.helpBtn}>
          <Text style={{ fontSize: 16 }}>❓</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Step Indicator */}
        <View style={styles.stepRow}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepCircleText}>2</Text>
          </View>
          <Text style={styles.stepLabel}>Step 2 of 3</Text>
          <View style={styles.stepBars}>
            <View style={[styles.stepBar, { backgroundColor: Colors.primary }]} />
            <View style={[styles.stepBar, { backgroundColor: Colors.primary }]} />
            <View style={[styles.stepBar, { backgroundColor: Colors.surfaceContainerHigh }]} />
          </View>
        </View>

        {/* Heading */}
        <View style={styles.emailIconBox}>
          <Text style={{ fontSize: 24 }}>✉️</Text>
        </View>

        <Text style={styles.title}>Verify Phone Number</Text>
        <Text style={styles.subtitle}>
          We sent a 6-digit verification code to{'\n'}
          <Text style={styles.phoneBold}>+1 (555) 234-8901</Text>
        </Text>

        <TouchableOpacity style={styles.editPhoneBtn} onPress={() => router.back()}>
          <Text style={styles.editPhoneText}>Edit Phone Number ✏️</Text>
        </TouchableOpacity>

        {/* 6 Digit OTP Boxes */}
        <View style={styles.otpRow}>
          {['4', '9', '2', '|', '•', '•'].map((ch, idx) => (
            <View
              key={idx}
              style={[
                styles.otpBox,
                idx === 3 && styles.otpBoxActive,
                idx > 3 && styles.otpBoxEmpty,
              ]}
            >
              <Text
                style={[
                  styles.otpText,
                  idx === 3 && { color: Colors.primary },
                  idx > 3 && { color: Colors.outlineVariant },
                ]}
              >
                {ch}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.detectBox}>
          <Text style={{ fontSize: 14, marginRight: 6 }}>🔒</Text>
          <Text style={styles.detectText}>
            Auto-detecting SMS verification code safely on this device.
          </Text>
        </View>

        <View style={styles.resendCenter}>
          <Text style={styles.countdownText}>
            ⏳ Resend code in <Text style={{ fontWeight: '700' }}>0:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}</Text>
          </Text>
          <TouchableOpacity disabled={secondsLeft > 0}>
            <Text style={[styles.resendAction, secondsLeft > 0 && { opacity: 0.5 }]}>
              Resend SMS
            </Text>
          </TouchableOpacity>
        </View>

        {/* Alternative Channels */}
        <View style={styles.fallbackCard}>
          <Text style={styles.fallbackTitle}>Didn't receive a message?</Text>
          <View style={styles.fallbackRow}>
            <TouchableOpacity style={styles.fallbackBtn}>
              <Text style={{ fontSize: 16 }}>💬 WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fallbackBtn}>
              <Text style={{ fontSize: 16 }}>📞 Call Me</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Verify & Proceed Button */}
        <TouchableOpacity
          style={styles.verifyBtn}
          activeOpacity={0.9}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.verifyBtnText}>Verify & Proceed →</Text>
        </TouchableOpacity>

        <Text style={styles.encryptedFoot}>🛡️ End-to-end encrypted verification</Text>
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
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  stepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  stepCircleText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  stepLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    flex: 1,
  },
  stepBars: {
    flexDirection: 'row',
    gap: 4,
  },
  stepBar: {
    width: 24,
    height: 4,
    borderRadius: 2,
  },
  emailIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    marginTop: 6,
    lineHeight: 18,
  },
  phoneBold: {
    color: Colors.onSurface,
    fontWeight: '700',
  },
  editPhoneBtn: {
    marginTop: 6,
    marginBottom: 20,
  },
  editPhoneText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpBox: {
    width: 48,
    height: 52,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  otpBoxActive: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  otpBoxEmpty: {
    backgroundColor: Colors.surfaceContainerLow,
  },
  otpText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.onSurface,
  },
  detectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    padding: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  detectText: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    flex: 1,
  },
  resendCenter: {
    alignItems: 'center',
    marginVertical: 12,
  },
  countdownText: {
    fontSize: 12,
    color: Colors.onSurfaceVariant,
  },
  resendAction: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 4,
  },
  fallbackCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 16,
    padding: 14,
    marginVertical: 12,
  },
  fallbackTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
    marginBottom: 10,
  },
  fallbackRow: {
    flexDirection: 'row',
    gap: 10,
  },
  fallbackBtn: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  verifyBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 16,
  },
  verifyBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  encryptedFoot: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 12,
  },
});
