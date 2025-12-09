import Header from "@/components/header";
import Hero from "@/components/hero";
import PersonalTrainingServices from "@/components/personal-training-services";
import MediaGallery from "@/components/media-gallery";
import AboutTrainer from "@/components/about-trainer";
import BookingWizard from "@/components/booking-wizard";
import Footer from "@/components/footer";
import FloatingFAB from "@/components/floating-fab";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutTrainer />
      <PersonalTrainingServices />
      {/* <EquipmentSeries /> */}
      <MediaGallery />
      {/* <WorkoutGallery /> */}
      <section id="booking" className="relative py-20 overflow-hidden bg-gradient-to-br from-[#05070f] via-[#0f111d] to-[#05070f] text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.2),_transparent_65%)]"></div>
        <div className="absolute inset-0 showcase-noise opacity-50"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-yellow-400"></div>
            <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">BOOK YOUR SESSION</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Book your first session with our expert trainers and begin your
            journey to a healthier, stronger you.
          </p>
          <BookingWizard />
        </div>
      </section>
      <Footer />
      <FloatingFAB />
    </main>
  );
}
