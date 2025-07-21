"use client"

import { useEffect, useState } from "react"

// Simple icon components using emoji
const TrophyIcon = () => <span>🏆</span>
const CrownIcon = () => <span>👑</span>
const CoinsIcon = ({ className }) => <span className={className}>🪙</span>

// Centralized API utility
const api = {
  getLeaderboard: async () => (await fetch("http://localhost:5001/api/v1/get-leaderboard")).json(),
}

export default function LeaderBoard() {
  const [leaders, setLeaders] = useState([])

  // Fetch leaderboard data
  const fetchLeaders = async () => {
    const data = await api.getLeaderboard()
    setLeaders(data.users || [])
  }

  useEffect(() => {
    fetchLeaders()
  }, [])

  const topThree = leaders.slice(0, 3)
  const remaining = leaders.slice(3)

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-amber-400 to-yellow-300 rounded-3xl p-5 shadow-xl font-sans">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="flex justify-center gap-5 mb-2.5">
          <button className="bg-white/30 text-amber-900 font-semibold text-base px-4 py-2 rounded-full cursor-pointer transition-all hover:bg-white/20">
            Daily
          </button>
          <button className="text-amber-800 font-semibold text-base px-4 py-2 rounded-full cursor-pointer transition-all hover:bg-white/20">
            Monthly
          </button>
        </div>
        <div className="text-xs text-amber-800 font-medium">Settlement time: 14 days 07:46:47</div>
      </div>

      {/* Trophy Icon */}
      <div className="flex justify-center my-5">
        <div className="relative flex items-center justify-center animate-[bounce_3s_ease-in-out_infinite]">
          <div className="absolute w-10 h-5 bg-gradient-to-r from-white to-gray-100 rounded-l-full -left-6 top-1/2 -translate-y-1/2 -rotate-15 shadow-md"></div>
          <div className="w-[60px] h-[60px] bg-gradient-to-br from-amber-400 to-amber-500 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] flex items-center justify-center border-3 border-white shadow-lg z-10 text-2xl">
            <CrownIcon />
          </div>
          <div className="absolute w-10 h-5 bg-gradient-to-r from-white to-gray-100 rounded-r-full -right-6 top-1/2 -translate-y-1/2 rotate-15 scale-x-[-1] shadow-md"></div>
        </div>
      </div>

      {/* Top 3 Podium */}
      {topThree.length > 0 && (
        <div className="my-8">
          <div className="flex justify-center items-end gap-2.5 px-5">
            {/* 2nd Place */}
            {topThree[1] && (
              <div className="flex flex-col items-center text-center order-1">
                <div className="relative mb-2">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-3 border-white shadow-md relative">
                    <img
                      src={`https://ui-avatars.com/api/?name=${topThree[1].username}&size=60&background=random`}
                      alt={topThree[1].username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center font-bold text-xs text-white border-2 border-white">
                    2
                  </div>
                </div>
                <div className="font-semibold text-sm text-amber-900 mb-1 max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {topThree[1].username}
                </div>
                <div className="flex items-center gap-1 font-semibold text-amber-800 text-xs">
                  <CoinsIcon className="text-sm" />
                  {topThree[1].points}
                </div>
              </div>
            )}

            {/* 1st Place */}
            {topThree[0] && (
              <div className="flex flex-col items-center text-center order-2">
                <div className="relative mb-2">
                  <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-4 border-amber-400 shadow-lg relative group transition-transform duration-200 hover:scale-105">
                    <img
                      src={`https://ui-avatars.com/api/?name=${topThree[0].username}&size=80&background=random`}
                      alt={topThree[0].username}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xl drop-shadow-md">👑</div>
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center font-bold text-xs text-white border-2 border-white transition-transform duration-200 group-hover:scale-110">
                    1
                  </div>
                </div>
                <div className="font-bold text-base text-amber-900 mb-1 max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {topThree[0].username}
                </div>
                <div className="flex items-center gap-1 font-semibold text-amber-900 text-sm">
                  <CoinsIcon className="text-sm" />
                  {topThree[0].points}
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {topThree[2] && (
              <div className="flex flex-col items-center text-center order-3">
                <div className="relative mb-2">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-3 border-white shadow-md relative">
                    <img
                      src={`https://ui-avatars.com/api/?name=${topThree[2].username}&size=60&background=random`}
                      alt={topThree[2].username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-amber-700 to-amber-800 flex items-center justify-center font-bold text-xs text-white border-2 border-white">
                    3
                  </div>
                </div>
                <div className="font-semibold text-sm text-amber-900 mb-1 max-w-[80px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {topThree[2].username}
                </div>
                <div className="flex items-center gap-1 font-semibold text-amber-800 text-xs">
                  <CoinsIcon className="text-sm" />
                  {topThree[2].points}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Remaining Users List */}
      {remaining.length > 0 && (
        <div className="bg-white/90 rounded-xl p-4 mt-5">
          {remaining.map((user, index) => (
            <div
              key={user._id}
              className="flex items-center py-3 border-b border-gray-100 last:border-b-0 hover:bg-amber-50 hover:rounded-lg transition-colors duration-200"
            >
              <div className="w-8 font-bold text-gray-600 text-base">{index + 4}</div>
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-white shadow-sm">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.username}&size=40&background=random`}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-gray-800 font-semibold text-sm">{user.username}</div>
              </div>
              <div className="flex items-center gap-1 font-semibold text-gray-600">
                <CoinsIcon className="text-xs" />
                {user.points}
              </div>
            </div>
          ))}
        </div>
      )}

      {leaders.length === 0 && (
        <div className="text-center py-10 text-amber-800">
          <span className="block text-4xl mb-4 opacity-60">🏆</span>
          <p className="text-base font-medium m-0">No users on the leaderboard yet</p>
        </div>
      )}
    </div>
  )
}
