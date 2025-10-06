import Header from "@/components/header";
import Hero from "@/components/hero";
import PersonalTrainingServices from "@/components/personal-training-services";
import MediaGallery from "@/components/media-gallery";
import AboutTrainer from "@/components/about-trainer";
import BookingWizard from "@/components/booking-wizard";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <AboutTrainer />
      <PersonalTrainingServices />
      {/* <EquipmentSeries /> */}
      <MediaGallery />
      {/* <WorkoutGallery /> */}
      <section id="booking" className="py-20 bg-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">
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
    </main>
  );
}
