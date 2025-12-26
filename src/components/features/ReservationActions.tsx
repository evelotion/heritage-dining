'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Ban, Trash2 } from 'lucide-react';
import { cancelReservation } from '@/lib/admin-actions'; 

export default function ReservationActions({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Logic: Tutup menu kalau klik di luar area
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button (Titik 3) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-md transition-colors ${
          isOpen ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-300 hover:text-zinc-600 hover:bg-zinc-50'
        }`}
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 rounded-lg shadow-xl z-50 overflow-hidden animate-fade-in-up">
          <div className="py-1">
            <form action={cancelReservation}>
              <input type="hidden" name="id" value={id} />
              <button 
                type="submit"
                className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest font-bold text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
              >
                <Ban className="w-4 h-4" />
                Cancel Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}