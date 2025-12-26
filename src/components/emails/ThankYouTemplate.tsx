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
  Button,
} from '@react-email/components';

interface ThankYouEmailProps {
  guestName: string;
}

export const ThankYouTemplate = ({ guestName }: ThankYouEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for dining at Heritage</Preview>
    <Body style={main}>
      <Container style={container}>
        
        <Section style={header}>
          <Heading style={brand}>HERITAGE.</Heading>
        </Section>

        <Section style={content}>
          <Text style={greeting}>Dear {guestName},</Text>
          <Text style={paragraph}>
            It was an honor to host you at our table yesterday. We hope the flavors of the "Origins" chapter brought you a memorable journey through the archipelago.
          </Text>
          <Text style={paragraph}>
            We constantly strive for perfection. If you have a moment, we would deeply appreciate your private feedback to our Chef.
          </Text>

          <Button style={button} href="https://forms.gle/placeholder-link">
            Rate Your Experience
          </Button>

          <Text style={subParagraph}>
            Or simply reply to this email if you wish to speak with our manager directly.
          </Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            We look forward to welcoming you back for Chapter II soon.
          </Text>
        </Section>

      </Container>
    </Body>
  </Html>
);

export default ThankYouTemplate;

// --- STYLES ---
const main = { backgroundColor: '#f9f9f7', fontFamily: 'serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '40px 20px', maxWidth: '600px', border: '1px solid #e5e5e0' };
const header = { textAlign: 'center' as const, paddingBottom: '20px', borderBottom: '1px solid #e5e5e0' };
const brand = { fontSize: '24px', letterSpacing: '0.2em', color: '#2d2d2d', margin: '0' };
const content = { padding: '40px 20px', textAlign: 'center' as const };
const greeting = { fontSize: '18px', color: '#2d2d2d', marginBottom: '20px' };
const paragraph = { fontSize: '14px', lineHeight: '1.6', color: '#555555', fontFamily: 'sans-serif', marginBottom: '20px' };
const subParagraph = { fontSize: '12px', color: '#888', fontFamily: 'sans-serif', marginTop: '20px' };
const button = { backgroundColor: '#8b5a2b', color: '#fff', padding: '12px 24px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none', textTransform: 'uppercase' as const, letterSpacing: '0.1em' };
const footer = { textAlign: 'center' as const, paddingTop: '20px', borderTop: '1px solid #e5e5e0' };
const footerText = { fontSize: '10px', color: '#999', fontFamily: 'sans-serif' };