
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { CircularProgress } from "@/components/others/Circular-Progress"
import { LineChart } from "@/components/others/Line-Charts"
import { Header } from "@/components/header/Header"
import { AppSidebar } from "@/components/sidebar/AppSidebar"

const queueData = [
  { name: "Jette Joushua", calls: 150, waitingTime: 4, avgCallTime: "2:00" },
  { name: "Jisoo Michel", calls: 200, waitingTime: 1, avgCallTime: "4:20" },
  { name: "Aspen Press", calls: 100, waitingTime: 4, avgCallTime: "1:00" },
  { name: "Eka Bothman", calls: 50, waitingTime: 4, avgCallTime: "3:10" },
  { name: "Ann Lipshutz", calls: 120, waitingTime: 3, avgCallTime: "2:00" },
  { name: "Lindy Siphron", calls: 210, waitingTime: 9, avgCallTime: "2:00" },
  { name: "Michel Freya", calls: 180, waitingTime: 4, avgCallTime: "5:30" },
  { name: "Cristofer Dias", calls: 40, waitingTime: 4, avgCallTime: "2:00" },
]

const usageData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [10, 22, 8, 38, 10, 20, 5],
      borderColor: "#4040ff",
      backgroundColor: "rgba(64, 64, 255, 0.1)",
      tension: 0.4,
      pointBackgroundColor: "#4040ff",
      pointBorderColor: "#4040ff",
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
}

export default function DailyUsage() {
  return (
    <>
    <div className="flex h-screen bg-black overflow-hidden">
        <AppSidebar />
    <div className="flex-1 flex flex-col h-full">
        <Header title="Daily Usage" />

       <div className="flex-1 overflow-y-auto p-6 bg-[#121212]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column with charts */}
          <div className="space-y-6">
            {/* Daily Limit Chart */}
            <Card className="overflow-hidden bg-[#0a1a0a] border-0">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="mb-4">
                  <CircularProgress percentage={80} color="#00c000" bgColor="#0a3a0a" size={140}>
                    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center">
                      <span className="text-3xl font-bold text-black">80%</span>
                    </div>
                  </CircularProgress>
                </div>
                <div className="text-center">
                  <p className="text-gray-300">80% of daily limit used</p>
                  <p className="text-gray-500 text-sm">30 min remaining</p>
                </div>
              </CardContent>
            </Card>

            {/* Answered Calls Chart */}
            <Card className="overflow-hidden bg-[#0a0a1a] border-0">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="mb-4">
                  <CircularProgress percentage={65} color="#4040ff" bgColor="#0a0a3a" size={140}>
                    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center">
                      <span className="text-3xl font-bold text-black">65%</span>
                    </div>
                  </CircularProgress>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="bg-blue-500 p-1.5 rounded-full">
                      <ArrowDownLeft className="h-3.5 w-3.5 text-white" />
                    </div>
                    <p className="text-gray-300">Answered Calls (Inbound)</p>
                  </div>
                  <p className="text-gray-500 text-sm">30 min remaining</p>
                </div>
              </CardContent>
            </Card>

            {/* Missed Calls Chart */}
            <Card className="overflow-hidden bg-[#1a0a0a] border-0">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="mb-4">
                  <CircularProgress percentage={30} color="#ff4040" bgColor="#3a0a0a" size={140}>
                    <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center">
                      <span className="text-3xl font-bold text-black">30%</span>
                    </div>
                  </CircularProgress>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="bg-red-500 p-1.5 rounded-full">
                      <ArrowUpRight className="h-3.5 w-3.5 text-white" />
                    </div>
                    <p className="text-gray-300">Missed Calls</p>
                  </div>
                  <p className="text-gray-500 text-sm">40 min remaining</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column with chart and table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Minutes Used Chart */}
            <Card className="overflow-hidden bg-[#1a1a1a] border-0">
              <CardHeader className="pb-2 pt-4 px-6">
                <CardTitle className="text-base font-medium text-gray-200">Minutes Used per Day</CardTitle>
              </CardHeader>
              <CardContent className="p-4 h-[220px]">
                <LineChart data={usageData} />
              </CardContent>
            </Card>

            {/* Operators Table */}
            <Card className="overflow-hidden bg-[#1a1a1a] border-0">
              <CardHeader className="pb-2 pt-4 px-6">
                <CardTitle className="text-base font-medium text-gray-200">Operators</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-6 text-sm font-medium text-gray-400">Call queue</th>
                        <th className="text-right py-3 px-6 text-sm font-medium text-gray-400">call</th>
                        <th className="text-right py-3 px-6 text-sm font-medium text-gray-400">Waiting time</th>
                        <th className="text-right py-3 px-6 text-sm font-medium text-gray-400">Average call time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queueData.map((item, index) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="py-3 px-6 text-sm font-medium text-gray-300">{item.name}</td>
                          <td className="py-3 px-6 text-sm text-right text-gray-300">{item.calls}</td>
                          <td className="py-3 px-6 text-sm text-right text-gray-300">{item.waitingTime}</td>
                          <td className="py-3 px-6 text-sm text-right text-gray-300">{item.avgCallTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  )
}
