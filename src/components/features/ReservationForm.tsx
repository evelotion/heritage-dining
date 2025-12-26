'use client'

import { useActionState } from 'react' // Hook baru React 19 / Next 15
import { createReservation } from '@/lib/actions'
import { Calendar, Clock, Users, ArrowRight, Loader2 } from 'lucide-react'

export default function ReservationForm() {
  // Menghubungkan form dengan Server Action
  const [state, formAction, isPending] = useActionState(createReservation, null)

  return (
    <form action={formAction} className="space-y-8 animate-fade-in-up">
      
      {/* --- Error Alert --- */}
      {state?.success === false && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
          {state.message}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500">Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-batik" />
            <input 
              name="date" 
              type="date" 
              required
              className="w-full bg-white border border-subtle px-12 py-3 text-ink focus:outline-none focus:border-batik transition-colors"
            />
          </div>
        </div>

        {/* Time Selection */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500">Time</label>
          <div className="relative">
            <Clock className="absolute left-4 top-3.5 w-4 h-4 text-batik" />
            <select 
              name="time" 
              className="w-full bg-white border border-subtle px-12 py-3 text-ink focus:outline-none focus:border-batik appearance-none"
            >
              <option value="18:00">18:00 - First Seating</option>
              <option value="19:30">19:30 - Prime Seating</option>
              <option value="20:30">20:30 - Late Seating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Guest Details */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500">Your Name</label>
          <input name="name" type="text" placeholder="Mr. / Ms." required className="w-full bg-white border border-subtle px-4 py-3 focus:border-batik outline-none" />
          {state?.errors?.name && <p className="text-red-500 text-xs">{state.errors.name}</p>}
        </div>
        
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500">Guests</label>
          <div className="relative">
            <Users className="absolute left-4 top-3.5 w-4 h-4 text-batik" />
            <input name="pax" type="number" min="1" max="10" defaultValue="2" required className="w-full bg-white border border-subtle px-12 py-3 focus:border-batik outline-none" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500">Email</label>
          <input name="email" type="email" required className="w-full bg-white border border-subtle px-4 py-3 focus:border-batik outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500">Phone</label>
          <input name="phone" type="tel" required className="w-full bg-white border border-subtle px-4 py-3 focus:border-batik outline-none" />
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-4 pt-4 border-t border-subtle">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500">Dietary Restrictions (Optional)</label>
          <input name="allergies" type="text" placeholder="e.g. Shellfish allergy, Vegan" className="w-full bg-white border border-subtle px-4 py-3 focus:border-batik outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500">Special Occasion (Optional)</label>
          <input name="occasion" type="text" placeholder="e.g. Anniversary, Birthday" className="w-full bg-white border border-subtle px-4 py-3 focus:border-batik outline-none" />
        </div>
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-ink text-white py-4 mt-8 uppercase tracking-[0.2em] text-xs hover:bg-batik transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Processing...
          </>
        ) : (
          <>
            Confirm Request <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

    </form>
  )
}