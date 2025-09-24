import Header from "@/components/header"
import Hero from "@/components/hero"
import EquipmentSeries from "@/components/equipment-series"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <EquipmentSeries />
    </main>
  )
}
