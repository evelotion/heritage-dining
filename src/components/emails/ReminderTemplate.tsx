import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components';

interface ReminderEmailProps {
  guestName: string;
  time: string;
  pax: number;
}

export const ReminderTemplate = ({ guestName, time, pax }: ReminderEmailProps) => (
  <Html>
    <Head />
    <Preview>Reminder: Your Dinner at Heritage Tomorrow</Preview>
    <Body style={main}>
      <Container style={container}>
        
        <Section style={header}>
          <Heading style={brand}>HERITAGE.</Heading>
        </Section>

        <Section style={content}>
          <Text style={greeting}>Good day, {guestName}.</Text>
          <Text style={paragraph}>
            This is a gentle reminder of your upcoming reservation with us <strong>tomorrow at {time}</strong> for {pax} guests.
          </Text>
          
          <Section style={box}>
            <Heading style={subHeading}>Essential Information</Heading>
            <Text style={infoText}>• <strong>Dress Code:</strong> Smart Casual (No slippers/shorts).</Text>
            <Text style={infoText}>• <strong>Arrival:</strong> Please arrive 15 minutes early.</Text>
            <Text style={infoText}>• <strong>Valet:</strong> Complimentary at the main entrance.</Text>
          </Section>

          <Text style={paragraph}>
            Our culinary team is currently prepping the ingredients for your "Origins" tasting menu. We look forward to welcoming you.
          </Text>

          <Link href="http://localhost:3000/contact" style={link}>
            Get Directions via Google Maps
          </Link>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            Need to reschedule? Please contact us at +62 21 5555 8888 immediately.
          </Text>
        </Section>

      </Container>
    </Body>
  </Html>
);

export default ReminderTemplate;

// --- STYLES ---
const main = { backgroundColor: '#f9f9f7', fontFamily: 'serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '40px 20px', maxWidth: '600px', border: '1px solid #e5e5e0' };
const header = { textAlign: 'center' as const, paddingBottom: '20px', borderBottom: '1px solid #e5e5e0' };
const brand = { fontSize: '24px', letterSpacing: '0.2em', color: '#2d2d2d', margin: '0' };
const content = { padding: '30px 20px' };
const greeting = { fontSize: '18px', color: '#2d2d2d', marginBottom: '20px' };
const paragraph = { fontSize: '14px', lineHeight: '1.6', color: '#555555', fontFamily: 'sans-serif', marginBottom: '20px' };
const box = { backgroundColor: '#f5f5f4', padding: '20px', borderRadius: '4px', marginBottom: '20px' };
const subHeading = { fontSize: '14px', textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: '#8b5a2b', marginTop: '0', marginBottom: '10px', fontFamily: 'sans-serif' };
const infoText = { fontSize: '13px', color: '#444', margin: '5px 0', fontFamily: 'sans-serif' };
const link = { fontSize: '12px', color: '#8b5a2b', textDecoration: 'underline', fontFamily: 'sans-serif' };
const footer = { textAlign: 'center' as const, paddingTop: '20px', borderTop: '1px solid #e5e5e0' };
const footerText = { fontSize: '10px', color: '#999', fontFamily: 'sans-serif' };