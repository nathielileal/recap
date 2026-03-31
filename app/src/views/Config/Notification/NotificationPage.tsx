import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { BtnSwitch } from '../../../components/Switch/Switch';
import { stylesheet } from '../Config.style';
import { useThemeContext } from '../../../provider/ThemeProvider';

const STREAMINGS = [
  "Netflix",
  "Prime Video",
  "Disney+",
  "HBO Max",
  "Hulu",
  "Apple TV+",
  "Paramount+",
];

export default function NotificationPage() {
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const { theme } = useThemeContext();
  const styles = useMemo(() => stylesheet(theme), [theme]);

  const [streamings, setStreamings] = useState<Record<string, boolean>>(
    STREAMINGS.reduce((acc, s) => ({ ...acc, [s]: false }), {})
  );

  const toggleStreaming = (name: string) => {
    setStreamings(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <>
      <View style={styles.configRow}>
        <Text style={styles.configText}>Receber por e-mail</Text>

        <BtnSwitch value={notifEmail} onValueChange={setNotifEmail} />
      </View>

      <View style={styles.configRow}>
        <Text style={styles.configText}>Notificações push</Text>

        <BtnSwitch value={notifPush} onValueChange={setNotifPush} />
      </View>

      <Text style={styles.label}>Meus serviços de Streaming</Text>
      {STREAMINGS.map((s) => (
        <View key={s} style={styles.configRow}>
          <Text style={styles.configText}>{s}</Text>

          <BtnSwitch value={streamings[s]} onValueChange={() => toggleStreaming(s)} />
        </View>
      ))}
    </>
  );
}