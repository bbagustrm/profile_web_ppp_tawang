'use client'

import { useState } from 'react'

export default function DeleteUserPage() {
    const [userId, setUserId] = useState('')
    const [message, setMessage] = useState('')

    const handleDelete = async () => {
        const res = await fetch('/api/delete-user', {
            method: 'POST',
            body: JSON.stringify({ user_id: userId }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const result = await res.json()
        if (result.success) {
            setMessage('✅ User berhasil dihapus.')
        } else {
            setMessage(`❌ Gagal: ${result.error}`)
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Hapus User Supabase</h1>
            <input
                type="text"
                placeholder="Masukkan user_id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full border px-4 py-2 rounded"
            />
            <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
                Hapus User
            </button>
            {message && <p>{message}</p>}
        </div>
    )
}
