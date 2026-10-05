import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../theme/colors';

interface ChatMessage {
  id: string;
  sender: 'driver' | 'user';
  text: string;
  time: string;
}

export default function DriverChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'driver',
      text: 'Hello Sophia! I\'ve picked up your order and am taking Central Blvd to reach you quickly. 🛵',
      time: '7:30 PM',
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'Thanks Alex! Please ring the doorbell twice when you arrive at Apt 4B.',
      time: '7:31 PM',
    },
    {
      id: 'm3',
      sender: 'driver',
      text: 'Got it! Almost near your street now.',
      time: '7:33 PM',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: '7:35 PM',
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 20 }}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Driver Chat</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={{ fontSize: 16 }}>❓</Text>
        </TouchableOpacity>
      </View>

      {/* Driver Sticky Sub-Bar Card */}
      <View style={styles.driverSubBar}>
        <View style={styles.rowCenter}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAy6UE7m6JzVHWXCOt7-jNW7Vq-gbLT5JLVRZ3n0aFCnUcsASuz8_Ck4a07_3YNC6impnE7ixrRc-4GB7BxvBAsiq3qE8nQhqdG91_GdDevgvsehPTVtKfCvi3T5-G9nht0NRcyO82NQsx7Rl9wPK1lM-ix9KlGp6-bu1qGWOmg1MyG5EVojAYl1PQBXT5406_sBXXJbfia6xGqRnEY2zXaumc3W3jN-onLdoUQgD8sQLknnmREAld',
            }}
            style={styles.driverAvatar}
          />
          <View>
            <View style={styles.rowCenter}>
              <Text style={styles.driverName}>Alex Morgan</Text>
              <Text style={styles.driverRating}>★ 4.9</Text>
            </View>
            <Text style={styles.driverSub}>Honda Activa 6G • NY-04-AB-3291</Text>
            <Text style={styles.driverStatus}>🔴 On the way • 12 mins away</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.callCircleBtn}>
          <Text style={{ fontSize: 16, color: '#fff' }}>📞</Text>
        </TouchableOpacity>
      </View>

      {/* Riding Safety Notice */}
      <View style={styles.safetyBox}>
        <Text style={{ fontSize: 16, marginRight: 6 }}>🛵</Text>
        <Text style={styles.safetyText}>
          <Text style={{ fontWeight: '700' }}>Alex is currently riding.</Text> Voice call or brief messages are recommended for safety.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* System Pill */}
        <View style={styles.systemPill}>
          <Text style={styles.systemPillText}>
            🍴 Alex picked up your order from <Text style={{ fontWeight: '700' }}>The Urban Grill</Text> • 7:29 PM
          </Text>
        </View>

        {/* Message Stream */}
        {messages.map((m) => (
          <View
            key={m.id}
            style={[
              styles.messageWrap,
              m.sender === 'user' ? styles.userWrap : styles.driverWrap,
            ]}
          >
            <View
              style={[
                styles.bubble,
                m.sender === 'user' ? styles.userBubble : styles.driverBubble,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  m.sender === 'user' && { color: '#fff' },
                ]}
              >
                {m.text}
              </Text>
            </View>
            <Text style={styles.messageTime}>{m.time}</Text>
          </View>
        ))}

        {/* Live Route Snippet Card */}
        <View style={styles.routeCard}>
          <View style={styles.rowCenter}>
            <Text style={{ fontSize: 24, marginRight: 8 }}>🗺️</Text>
            <View>
              <Text style={styles.routeKicker}>LIVE ROUTE</Text>
              <Text style={styles.routeTitle}>Entering Pine Ridge Way</Text>
              <Text style={styles.routeMeta}>Approx. 400m away • Speed ~28 km/h</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Quick Reply Chips */}
      <View style={styles.quickReplyBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            'Please leave at door',
            "I'm downstairs",
            'Ring the bell',
            'Call when outside',
          ].map((chip, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.quickChip}
              onPress={() => sendMessage(chip)}
            >
              <Text style={styles.quickChipText}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input Field Bar */}
      <View style={styles.inputBar}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message to Alex..."
          style={styles.textInput}
          placeholderTextColor={Colors.onSurfaceVariant}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={() => sendMessage(inputText)}>
          <Text style={{ color: '#fff', fontWeight: '800' }}>➤</Text>
        </TouchableOpacity>
      </View>
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
  driverSubBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  driverAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  driverRating: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
    backgroundColor: Colors.secondaryFixed,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  driverSub: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  driverStatus: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
  },
  callCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerHigh,
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  safetyText: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  systemPill: {
    alignSelf: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginVertical: 10,
  },
  systemPillText: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  messageWrap: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  userWrap: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  driverWrap: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  driverBubble: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 13,
    color: Colors.onSurface,
    lineHeight: 18,
  },
  messageTime: {
    fontSize: 10,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
    marginHorizontal: 4,
  },
  routeCard: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: 14,
    padding: 12,
    marginVertical: 12,
  },
  routeKicker: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.primary,
  },
  routeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSurface,
  },
  routeMeta: {
    fontSize: 11,
    color: Colors.onSurfaceVariant,
  },
  quickReplyBar: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.surface,
  },
  quickChip: {
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  quickChipText: {
    fontSize: 12,
    color: Colors.onSurface,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.surfaceContainerLowest,
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 13,
    color: Colors.onSurface,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
