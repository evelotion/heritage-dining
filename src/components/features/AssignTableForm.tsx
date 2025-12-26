'use client'

import { assignTable } from "@/lib/admin-actions"
import { MapPin } from "lucide-react"

interface AssignTableFormProps {
  reservationId: string;
  currentTableId: string | null;
  tables: { id: string; tableNumber: string; capacity: number }[];
  occupiedTableIds: string[];
}

export default function AssignTableForm({ 
  reservationId, 
  currentTableId, 
  tables,
  occupiedTableIds 
}: AssignTableFormProps) {
  
  return (
    <form action={assignTable} className="flex items-center gap-2">
      <input type="hidden" name="reservationId" value={reservationId} />
      
      <div className="relative">
        <MapPin className={`w-4 h-4 absolute left-3 top-2.5 pointer-events-none ${
          currentTableId ? 'text-batik' : 'text-zinc-400'
        }`} />
        
        <select 
          // --- PERBAIKAN DI SINI ---
          // Tambahkan key agar React merender ulang saat data berubah
          key={currentTableId || 'no-table'} 
          // -------------------------
          
          name="tableId" 
          defaultValue={currentTableId || ""}
          onChange={(e) => e.target.form?.requestSubmit()} 
          className={`pl-9 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:border-batik cursor-pointer transition-colors ${
            currentTableId 
              ? 'bg-white border-batik text-batik font-medium shadow-sm' 
              : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          <option value="" disabled>No Table</option>
          
          {tables.map(t => {
            // Logika disable: Jika meja diduduki DAN bukan meja milik tamu ini sendiri
            const isOccupied = occupiedTableIds.includes(t.id);
            const isMyTable = t.id === currentTableId;
            const isDisabled = isOccupied && !isMyTable;

            return (
              <option 
                key={t.id} 
                value={t.id} 
                disabled={isDisabled}
                className={isDisabled ? "text-red-300 bg-gray-50" : ""}
              >
                {t.tableNumber} ({t.capacity}p) {isDisabled ? "— Occupied" : ""}
              </option>
            )
          })}
        </select>
      </div>
    </form>
  )
}