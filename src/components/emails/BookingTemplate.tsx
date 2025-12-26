import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface BookingEmailProps {
  guestName: string;
  reservationCode: string;
  date: string;
  time: string;
  pax: number;
}

export const BookingTemplate = ({
  guestName,
  reservationCode,
  date,
  time,
  pax,
}: BookingEmailProps) => (
  <Html>
    <Head />
    <Preview>Your Reservation at Heritage Dining</Preview>
    <Body style={main}>
      <Container style={container}>
        
        {/* Header */}
        <Section style={header}>
          <Heading style={brand}>HERITAGE.</Heading>
        </Section>

        {/* Content */}
        <Section style={content}>
          <Text style={greeting}>Dear {guestName},</Text>
          
          {/* --- PERBAIKAN DI SINI (Ganti /p menjadi /Text) --- */}
          <Text style={paragraph}>
            We are delighted to confirm your reservation for <strong>Chapter I: Origins</strong>.
            Your table is secured and our team is preparing for your arrival.
          </Text>
          {/* -------------------------------------------------- */}
          
          {/* Ticket Info */}
          <Section style={ticket}>
            <Text style={ticketLabel}>RESERVATION CODE</Text>
            <Heading style={code}>{reservationCode}</Heading>
            
            <Hr style={divider} />
            
            <Section style={grid}>
              <div style={stat}>
                <Text style={label}>DATE</Text>
                <Text style={value}>{date}</Text>
              </div>
              <div style={stat}>
                <Text style={label}>TIME</Text>
                <Text style={value}>{time}</Text>
              </div>
              <div style={stat}>
                <Text style={label}>GUESTS</Text>
                <Text style={value}>{pax} Pax</Text>
              </div>
            </Section>
          </Section>

          <Text style={paragraph}>
            Please show this code to our host upon arrival to access your personalized dining experience.
          </Text>

          <Link href={`http://localhost:3000/guest/login?code=${reservationCode}`} style={button}>
            View Digital Ticket
          </Link>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            Jl. Senopati No. 88, Jakarta Selatan<br/>
            +62 21 5555 8888
          </Text>
          <Text style={footerText}>
            © 2025 The Heritage Dining Group
          </Text>
        </Section>

      </Container>
    </Body>
  </Html>
);

export default BookingTemplate;

// --- STYLES (Inline CSS untuk Email Client) ---
const main = {
  backgroundColor: '#f9f9f7',
  fontFamily: '"Times New Roman", Times, serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
  border: '1px solid #e5e5e0',
};

const header = {
  textAlign: 'center' as const,
  paddingBottom: '20px',
  borderBottom: '1px solid #e5e5e0',
};

const brand = {
  fontSize: '24px',
  letterSpacing: '0.2em',
  color: '#2d2d2d',
  margin: '0',
};

const content = {
  padding: '40px 20px',
  textAlign: 'center' as const,
};

const greeting = {
  fontSize: '18px',
  color: '#2d2d2d',
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '26px',
  color: '#555555',
  fontFamily: 'Helvetica, Arial, sans-serif',
};

const ticket = {
  margin: '30px 0',
  padding: '20px',
  backgroundColor: '#f9f9f7',
  border: '1px dashed #8b5a2b', 
};

const ticketLabel = {
  fontSize: '10px',
  letterSpacing: '0.2em',
  color: '#8b5a2b',
  marginBottom: '10px',
  fontFamily: 'Helvetica, Arial, sans-serif',
};

const code = {
  fontSize: '32px',
  letterSpacing: '0.1em',
  color: '#2d2d2d',
  margin: '0 0 20px 0',
};

const divider = {
  borderColor: '#e5e5e0',
  margin: '20px 0',
};

const grid = {
  display: 'flex',
  justifyContent: 'space-between',
};

const stat = {
  textAlign: 'center' as const,
  width: '30%',
};

const label = {
  fontSize: '10px',
  color: '#888888',
  marginBottom: '5px',
  fontFamily: 'Helvetica, Arial, sans-serif',
  textTransform: 'uppercase' as const,
};

const value = {
  fontSize: '14px',
  color: '#2d2d2d',
  fontWeight: 'bold',
  fontFamily: 'Helvetica, Arial, sans-serif',
};

const button = {
  backgroundColor: '#2d2d2d',
  color: '#ffffff',
  padding: '12px 30px',
  fontSize: '12px',
  textDecoration: 'none',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  display: 'inline-block',
  marginTop: '20px',
  fontFamily: 'Helvetica, Arial, sans-serif',
};

const footer = {
  textAlign: 'center' as const,
  paddingTop: '20px',
  borderTop: '1px solid #e5e5e0',
};

const footerText = {
  fontSize: '10px',
  color: '#888888',
  lineHeight: '1.5',
  fontFamily: 'Helvetica, Arial, sans-serif',
};