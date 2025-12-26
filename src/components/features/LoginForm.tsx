'use client'

import { useActionState } from 'react'
import { loginGuest } from '@/lib/auth-actions'
import { Loader2, ArrowRight } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function LoginForm() {
  // Logic Server Action
  const [state, formAction, isPending] = useActionState(loginGuest, null)
  
  // Ambil kode otomatis dari URL jika ada (setelah booking)
  const searchParams = useSearchParams()
  const defaultCode = searchParams.get('code') || ''
  const isNewBooking = searchParams.get('new') === 'true'

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      
      {/* Jika ini redirect dari booking baru, ucapkan terima kasih */}
      {isNewBooking && (
        <div className="p-4 bg-green-50 border border-green-100 text-green-800 text-sm text-center animate-fade-in">
          Reservation Request Received! <br/>
          Please sign in to view your digital ticket.
        </div>
      )}

      {/* Error Alert */}
      {state?.success === false && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm text-center">
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gray-500">
            Reservation Code or Email
          </label>
          <input 
            name="identifier" 
            type="text" 
            defaultValue={defaultCode}
            placeholder="e.g. RES-1234 or your@email.com" 
            required 
            className="w-full bg-white border border-subtle px-6 py-4 text-center text-lg tracking-wider focus:border-batik outline-none transition-colors"
          />
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-ink text-white py-4 uppercase tracking-[0.2em] text-xs hover:bg-batik transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
            </>
          ) : (
            <>
              Access Guest Portal <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-gray-400 font-light">
        Lost your code? Please contact our concierge.
      </p>
    </div>
  )
}