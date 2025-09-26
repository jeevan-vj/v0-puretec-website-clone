"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface WorkoutImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

const workoutImages: WorkoutImage[] = [
  {
    id: "1",
    src: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/481235073_630927406348677_4534719462233809901_n.jpg?stp=dst-jpg_p600x600_tt6&_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=spMNVHn45KoQ7kNvwFMmrqj&_nc_oc=AdkPRXZf0Md5C-GZVhmeZgnYw6Qxx2JF41z3oIfg6RUV6Za9Bzps-NfOGksURNe-9FYXe67IRzK6sEvZFzNKP9ys&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=9eVaNDZxsc8h3qe8X0e6Lw&oh=00_AfaIYyB34KGrJ2wgl9dkN5qC0Kq7nrzDl5OVIULlupH7bQ&oe=68DB9270",
    alt: "Ruwan Palihawadana workout session - strength training",
    title: "Strength Training Session"
  },
  {
    id: "2",
    src: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/481777778_630927036348714_6516219830521275109_n.jpg?stp=dst-jpg_p640x640_tt6&_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=0x_uNWUis5AQ7kNvwHmj_XZ&_nc_oc=Adnx5yrutFW-mob7NZC9-lFVzPxUDvxc8ugXVL4o9_wYA_TNrM4SAkLAYIsDxb7XjIXDzMpCAVQTOdCgdbEQjUfe&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=9eVaNDZxsc8h3qe8X0e6Lw&oh=00_AfYFjXuuhV0bdUgJmCESA2TajuG7IUd0huuIamsXQIMNvA&oe=68DBAE52",
    alt: "Professional gym workout - functional training",
    title: "Functional Training"
  },
  {
    id: "3",
    src: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/480990562_630927186348699_4522789896441427825_n.jpg?stp=dst-jpg_p600x600_tt6&_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_ohc=WjC3hUwSRZcQ7kNvwFtnb45&_nc_oc=AdkUeV9L0wxOGT4GKnNV5Hafeuebxlkg0YyTyWoT_jaFngvlGBwKvuPuQpxYnoM28BF8GEYVuc2Urq8MhsOHZNA8&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=9eVaNDZxsc8h3qe8X0e6Lw&oh=00_Afb6P5L1-Y9wRdDeG4DxuQFLntQ7Ups6OoCvA9srlrCWug&oe=68DBB5CF",
    alt: "Kiwi Lankan fitness training - cardio workout",
    title: "Cardio Training"
  },
  {
    id: "4",
    src: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/481117990_630927413015343_658080652707638381_n.jpg?stp=dst-jpg_p600x600_tt6&_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_ohc=iy6_2-uN6PwQ7kNvwF-B154&_nc_oc=AdnMF_a9G5-n20DQr46V600x6ApIa32NQa9B8HFw2D4rjUhG00_kBg7jJdE5m2shVZLdFOyPEn7iVxM6TgtyvxaO&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=9eVaNDZxsc8h3qe8X0e6Lw&oh=00_AfYvwX6WBE7gTUHb-nGlwQy4FnoX4f9T1cPgzQZYV52nWg&oe=68DB88E0",
    alt: "Intense HIIT workout session",
    title: "HIIT Training"
  },
  {
    id: "5",
    src: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/481820332_630927156348702_7005860189788480202_n.jpg?stp=dst-jpg_p640x640_tt6&_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=TplWQANumnoQ7kNvwH4rXCQ&_nc_oc=AdklSpw7Fdti_E6sXqHKBkSsUhRMdVqKgEqrh2UUpwRnV5KSPVQQ58NpjSCTnnVYDhDN4kM0YGvlfb3g9ytX_yDb&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=9eVaNDZxsc8h3qe8X0e6Lw&oh=00_Afb8jf_D2ZTg5QXQk-Qxfn0Wk0oBboX8HK3JYdqUAgn1wg&oe=68DB9AAE",
    alt: "Weight lifting and muscle building workout",
    title: "Muscle Building"
  },
  {
    id: "6",
    src: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/481256715_630927303015354_4021340668014042800_n.jpg?stp=dst-jpg_p600x600_tt6&_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_ohc=ZLj8mZ7557cQ7kNvwGuaaDV&_nc_oc=AdnL7GqabZTsT4FqbDQ5N6r-ICsCWCKeKOD-zUTWYwVpbLzesKqlhBvGMOVxEakME1tDTghGIZNEuu4H0ciclTG9&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=9eVaNDZxsc8h3qe8X0e6Lw&oh=00_AfbmoPmgLgJSPstT7FZUsMgvkbJ1KQpT6_agTthk0RenKA&oe=68DB9F1E",
    alt: "Flexibility and mobility training",
    title: "Mobility Training"
  },
  {
    id: "7",
    src: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/481301566_630927099682041_6871271106126527698_n.jpg?stp=dst-jpg_p600x600_tt6&_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_ohc=DUlefF8O3LEQ7kNvwGM5pgK&_nc_oc=AdlTOGCtlZ4ELrn9PrunEZKsgl45Is4XwdBWBUk5znHSbQ3y8FyCRwzP3B7HT57SP2CZcBzEDWaUdM64MwiHs1hw&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=9eVaNDZxsc8h3qe8X0e6Lw&oh=00_AfZPJ9BBKZQ3Lm-_Rf5ss1MYhw9et1E5NKlqipzoI9ESlA&oe=68DBB028",
    alt: "Core strengthening workout session",
    title: "Core Training"
  },
  {
    id: "8",
    src: "https://scontent.fakl1-3.fna.fbcdn.net/v/t39.30808-6/480798260_630927039682047_8642310337580315190_n.jpg?stp=dst-jpg_p600x600_tt6&_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_ohc=esxc6X1BfJ0Q7kNvwGNbR2T&_nc_oc=Adm4eeyU3nb8ZI10NYrz6B1N6dab1b8LS8CYglymVEiesXMF3J0j7NoxLlTka0F0UCpYFW6uo2QC35OvTqy9F-HN&_nc_zt=23&_nc_ht=scontent.fakl1-3.fna&_nc_gid=9eVaNDZxsc8h3qe8X0e6Lw&oh=00_AfafIi2cV9LtbX3xUVQpeeIhu1ML63e76PAGva2Sc8KTpw&oe=68DBA7B6",
    alt: "Professional fitness coaching session",
    title: "Personal Coaching"
  },
  {
    id: "9",
    src: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/481085966_630927293015355_8534571511570015826_n.jpg?stp=dst-jpg_p600x600_tt6&_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=x2z32KBzPukQ7kNvwHF3FBL&_nc_oc=Adld2Ml-_Oh5MTrA4bR31ehmze9A-qH8TrH24wS8pIGU2LAxUrGTOTz3nHcjvri3XXRwgLYWBKjohwJx0Psjn_-U&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=GrpP8INE43Fq-PZWED_4ig&oh=00_AfZR_zIOyGMFNg7voZNJO1784NNlhroLbwEtrvgFX6_oaQ&oe=68DB85FF",
    alt: "Elite fitness training in action",
    title: "Elite Training"
  },
  {
    id: "10",
    src: "https://scontent.fakl1-4.fna.fbcdn.net/v/t39.30808-6/482239211_630927366348681_3796575802217342311_n.jpg?stp=dst-jpg_p552x414_tt6&_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=E1OjifQJC2wQ7kNvwGHVEH6&_nc_oc=AdkwzNeYbf2-Ai4MHAmnPkPoAIoZDssd9gHy6crD59L0fypa9psQKDibikaa7o7BtC8605LUcEyFX9Jr8BhQHefQ&_nc_zt=23&_nc_ht=scontent.fakl1-4.fna&_nc_gid=GrpP8INE43Fq-PZWED_4ig&oh=00_AfY5VVZXHvlW1lB-HyJuocdpjJpXOdREG7MJrzk0qBKN3A&oe=68DBB5FA",
    alt: "Advanced fitness techniques demonstration",
    title: "Advanced Techniques"
  }
];

export default function WorkoutGallery() {
  const [selectedImage, setSelectedImage] = useState<WorkoutImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("workout-gallery");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const openModal = (image: WorkoutImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? workoutImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(workoutImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex === workoutImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(workoutImages[newIndex]);
  };

  return (
    <section id="workout-gallery" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-teal-300 to-yellow-400 bg-clip-text text-transparent mb-6">
            Workout Gallery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-teal-400 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Experience the intensity and dedication that defines Kiwi Lankan Fitness Coaching. 
            From strength training to mobility work, witness the transformative power of elite coaching.
          </p>
        </div>

        {/* Image Grid */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
        >
          {workoutImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-yellow-400/20"
              onClick={() => openModal(image, index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg mb-1 drop-shadow-lg">
                    {image.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-yellow-400 rounded-full"></div>
                </div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400/50 rounded-2xl transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div 
          className={`text-center mt-16 transform transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
        >
          <p className="text-gray-400 mb-8 text-lg">Ready to start your transformation journey?</p>
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-teal-400 text-black font-bold rounded-full hover:from-yellow-300 hover:to-teal-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25">
            Book Your First Session
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className="w-full h-full object-contain"
            />
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
            >
              <X size={24} />
            </button>

            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-xl p-4">
              <h3 className="text-white font-bold text-xl mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.alt}</p>
              <div className="flex justify-between items-center mt-3">
                <div className="w-8 h-0.5 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-400 text-sm">
                  {currentIndex + 1} of {workoutImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
