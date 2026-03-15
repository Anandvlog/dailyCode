'use client'

import React, { useState } from 'react'
import user from "@/data/user.json"

const SearchPgae = () => {

  const [search , setSearch] = useState("")
   
  const handleSearch = (e:any) =>{
      setSearch(e.target.value)
    }

    const filteredUsers = user.filter((u) =>
      u.name.toLowerCase().includes(search?.toLowerCase()) ||
      u.email.toLowerCase().includes(search?.toLowerCase()) ||
      u.city.toLowerCase().includes(search?.toLowerCase()) ||
      u.role.toLowerCase().includes(search?.toLowerCase())
    )

  return (
   <div className="max-w-xl mx-auto p-6">
  {/* Search Box */}
  <div className="mb-6">
    <input
      type="text"
      value={search}
      placeholder="Search user..."
      onChange={handleSearch}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-blue-500 
      focus:border-transparent shadow-sm"
    />
  </div>

  {/* User List */}
  <ul className="space-y-4">
    {filteredUsers.map((u) => (
      <li
        key={u.id}
        className="bg-white shadow-md rounded-xl p-4 
        hover:shadow-lg transition duration-200 border"
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {u.name}
            </h2>
            <p className="text-sm text-gray-500">{u.email}</p>
          </div>

          <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            {u.role}
          </span>
        </div>

        <div className="mt-2 text-sm text-gray-600">
          📍 {u.city}
        </div>
      </li>
    ))}
  </ul>
</div>
  )
}

export default SearchPgae