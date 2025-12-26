import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Helper: Random Number
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper: Random Element
const randomEl = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Data Dummy Nama Tamu (Nuansa Lokal & Internasional)
const firstNames = ["Budi", "Siti", "Dewi", "Reza", "Putri", "Kevin", "Michael", "Sarah", "Ahmad", "Diana", "Raka", "Maya", "Oscar", "Linda", "Tio", "Fanny"];
const lastNames = ["Santoso", "Wijaya", "Pratama", "Kusuma", "Siregar", "Tan", "Wibowo", "Hidayat", "Salim", "Utama", "Anggara", "Sutanto", "Hartono", "Lim", "Saputra"];

async function main() {
  console.log("🌱 Starting Massive Seeding (50+ Pax)...");

  // 1. Cleanup
  await prisma.serviceRequest.deleteMany();
  await prisma.guestPreference.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.course.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.table.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Admin
  await prisma.user.create({
    data: {
      username: "admin",
      password: "12345678",
      email: "admin@heritage.com",
      fullName: "Manager Indra",
      role: "ADMIN",
    },
  });

  // 3. Create Chapter & Menu (Full Course)
  const chapter1 = await prisma.chapter.create({
    data: {
      sequence: 1,
      title: "Chapter I: Origins",
      description: "A culinary journey traversing the archipelago.",
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      isActive: true,
      courses: {
        create: [
          { sequence: 1, name: "Prologue: The Golden Egg", description: "Smoked duck egg yolk.", pairing: "Sparkling Tea", tags: "Starter" },
          { sequence: 2, name: "Ocean: Bluefin Gohu", description: "Tuna tartare.", pairing: "Sauvignon Blanc", tags: "Seafood" },
          { sequence: 3, name: "Warmth: Heritage Broth", description: "Chicken consommé.", pairing: "Chardonnay", tags: "Soup" },
          { sequence: 4, name: "Reef: Coral Snapper", description: "Pan-seared snapper.", pairing: "Riesling", tags: "Fish" },
          { sequence: 5, name: "Intermezzo: Winter in Dieng", description: "Tamarillo sorbet.", pairing: null, tags: "Cleanser" },
          { sequence: 6, name: "Highland: The Volcanic Beef", description: "Wagyu A5 Tokushima.", pairing: "Pinot Noir", tags: "Main" },
          { sequence: 7, name: "Dawn: Morning Dew", description: "Coconut panna cotta.", pairing: "Sauternes", tags: "Pre-Dessert" },
          { sequence: 8, name: "Forest: The Floor", description: "Chocolate soil & moss.", pairing: "Port Wine", tags: "Dessert" },
          { sequence: 9, name: "Epilogue: Sweet Farewell", description: "Jajan Pasar Petit Fours.", pairing: "Java Arabica", tags: "Petit Fours" },
        ],
      },
    },
  });

  // 4. Create Tables (T1 - T15)
  const tables = [];
  for (let i = 1; i <= 15; i++) {
    const table = await prisma.table.create({
      data: {
        tableNumber: `T${i}`,
        capacity: i % 2 === 0 ? 4 : 2, // Ganjil 2 orang, Genap 4 orang
      },
    });
    tables.push(table);
  }

  // 5. Generate 50+ Pax Data
  // Kita buat loop untuk bikin reservasi
  const today = new Date();
  
  // A. Tamu "LIVE" HARI INI (Sedang Makan / Akan Makan) - 8 Meja
  console.log("🔥 Creating LIVE guests...");
  for (let i = 0; i < 8; i++) {
    const firstName = randomEl(firstNames);
    const lastName = randomEl(lastNames);
    const user = await prisma.user.create({
      data: {
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomInt(1,999)}@gmail.com`,
        fullName: `${firstName} ${lastName}`,
        phone: `081${randomInt(10000000, 99999999)}`,
        role: "GUEST",
      },
    });

    const isSeated = i < 5; // 5 Meja pertama status SEATED (Lagi makan)
    const status = isSeated ? "SEATED" : "CONFIRMED"; 
    
    const reservation = await prisma.reservation.create({
      data: {
        reservationCode: `RES-${randomInt(1000, 9999)}`,
        bookingDate: today,
        pax: randomInt(2, 4),
        status: status as any,
        depositAmount: 500000,
        currentCourse: isSeated ? randomInt(1, 9) : 0, // Kalau seated, course random 1-9
        notes: Math.random() > 0.7 ? "Alergi udang" : null,
        userId: user.id,
        chapterId: chapter1.id,
        tableId: tables[i].id, // Assign ke meja T1 - T8
      },
    });

    // Bikin Request Iseng (Buat Notifikasi Dashboard)
    if (isSeated && Math.random() > 0.3) {
        await prisma.serviceRequest.create({
            data: {
                type: randomEl(["BILL", "WATER", "NAPKIN", "CUTLERY"]),
                status: "NEW",
                reservationId: reservation.id
            }
        })
    }
  }

  // B. Tamu "HISTORY" (Sudah Makan Kemarin/Tadi Siang) - 5 Meja
  console.log("📜 Creating PAST guests...");
  for (let i = 8; i < 13; i++) {
    const user = await prisma.user.create({
        data: {
          email: `guest${i}@history.com`,
          fullName: `Tamu Selesai ${i}`,
          role: "GUEST",
        },
      });
      
    await prisma.reservation.create({
        data: {
          reservationCode: `HIS-${randomInt(1000, 9999)}`,
          bookingDate: today, // Ceritanya shift siang tadi
          pax: randomInt(2, 6),
          status: "COMPLETED",
          depositAmount: 500000,
          currentCourse: 9, 
          userId: user.id,
          chapterId: chapter1.id,
          tableId: tables[i].id, 
        },
      });
  }

  // C. Tamu "FUTURE" (Besok & Lusa) - Buat Menu Reservasi
  console.log("📅 Creating FUTURE bookings...");
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDay = new Date(today); nextDay.setDate(nextDay.getDate() + 2);

  for (let i = 0; i < 10; i++) { // 10 Bookingan masa depan
    const date = Math.random() > 0.5 ? tomorrow : nextDay;
    const user = await prisma.user.create({
        data: {
            email: `future${i}@mail.com`,
            fullName: `Future Guest ${i}`,
            role: "GUEST"
        }
    })

    await prisma.reservation.create({
        data: {
            reservationCode: `FUT-${randomInt(1000, 9999)}`,
            bookingDate: date,
            pax: randomInt(2, 8),
            status: Math.random() > 0.5 ? "CONFIRMED" : "PENDING",
            depositAmount: 500000,
            userId: user.id,
            chapterId: chapter1.id,
            // Belum assign meja (tableId null)
        }
    })
  }

  // D. Create DEMO USER (Sultan Andara) - Tetap ada buat lo tes
  const sultan = await prisma.user.create({
    data: { email: "guest@demo.com", fullName: "Sultan Andara", role: "GUEST" },
  });
  
  await prisma.reservation.create({
    data: {
      reservationCode: "DEMO-123",
      bookingDate: today,
      pax: 2,
      status: "SEATED",
      depositAmount: 1000000,
      currentCourse: 6, // Lagi makan Main Course
      notes: "VIP Owner",
      userId: sultan.id,
      chapterId: chapter1.id,
      tableId: tables[14].id, // Meja terakhir
    },
  });

  // Tambah request dari Sultan biar seru
  await prisma.serviceRequest.create({
      data: { type: "WINE_REFILL", status: "NEW", reservationId: (await prisma.reservation.findUnique({where: {reservationCode: "DEMO-123"}}))!.id }
  })

  console.log("✅ Data 50+ Pax Generated!");
  console.log("👉 Login Admin: admin / 12345678");
  console.log("👉 Demo Guest: DEMO-123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });