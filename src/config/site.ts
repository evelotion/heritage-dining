export const siteConfig = {
  // GENERAL IDENTITY
  name: "Heritage", // Change this to your Restaurant Name
  description: "Experience the finest culinary journey with immersive storytelling.",
  slogan: "Taste the Legacy",
  url: "https://your-domain.com", // Used for SEO and Email Links
  
  // CONTACT INFORMATION (Displayed in Footer & Contact Page)
  contact: {
    address: "Jalan Senopati No. 45, Jakarta Selatan",
    phone: "+62 812 3456 7890",
    email: "reservations@heritage-dining.com",
    // Google Maps Embed Link (Get this from Google Maps -> Share -> Embed)
    mapUrl: "https://www.google.com/maps/embed?pb=...",
  },

  // SOCIAL MEDIA LINKS
  socials: {
    instagram: "https://instagram.com/#",
    tiktok: "https://tiktok.com/@#",
    facebook: "https://facebook.com/#",
  },

  // NAVIGATION LINKS
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Our Story", href: "/story" },
    { title: "Menu", href: "/menu" },
    { title: "Gallery", href: "/gallery" },
    { title: "Contact", href: "/contact" },
  ],
  
  // CURRENCY SETTINGS (Optional Future Proofing)
  currency: {
    locale: "id-ID",
    code: "IDR",
    symbol: "Rp"
  }
}

export type SiteConfig = typeof siteConfig