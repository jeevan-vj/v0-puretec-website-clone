"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, User, CheckCircle, ChevronLeft, ChevronRight, Clock, X, Menu } from "lucide-react"

interface BookingData {
  service: string
  trainer: string
  date: string
  time: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

const services = [
  { id: "personal-training", name: "Personal Training", duration: "60 min", price: "$80" },
  { id: "hiit-session", name: "HIIT Session", duration: "45 min", price: "$60" },
  { id: "strength-training", name: "Strength Training", duration: "75 min", price: "$90" },
  { id: "nutrition-consultation", name: "Nutrition Consultation", duration: "30 min", price: "$50" },
  { id: "mobility-training", name: "Mobility Training", duration: "60 min", price: "$70" },
]

const trainers = [
  { id: "ruwan-palihawadana", name: "Ruwan Palihawadana", specialty: "Personal Training" },
  { id: "priya-fernando", name: "Priya Fernando", specialty: "HIIT & Cardio" },
  { id: "daniel-silva", name: "Daniel Silva", specialty: "Strength Training" },
]

const timeSlots = [
  "09:00 - 10:00",
  "09:30 - 10:30",
  "10:00 - 11:00",
  "10:30 - 11:30",
  "11:00 - 12:00",
  "11:30 - 12:30",
  "14:00 - 15:00",
  "14:30 - 15:30",
  "15:00 - 16:00",
  "15:30 - 16:30",
  "16:00 - 17:00",
  "16:30 - 17:30",
]

const steps = [
  { id: "service", title: "Service Selection", icon: Calendar, description: "Choose your service" },
  { id: "datetime", title: "Date & Time", icon: Clock, description: "Pick your schedule" },
  { id: "information", title: "Your Information", icon: User, description: "Contact details" },
]

export default function BookingWizard() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [bookingData, setBookingData] = useState<BookingData>({
    service: "",
    trainer: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentYear, currentMonth, day))
    }

    return days
  }

  const isStepCompleted = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return bookingData.service && bookingData.trainer
      case 1:
        return bookingData.date && bookingData.time
      case 2:
        return bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone
      default:
        return false
    }
  }

  const canProceedToNext = () => {
    return isStepCompleted(currentStep)
  }

  const nextStep = () => {
    if (canProceedToNext() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Booking submitted:", bookingData)
    // Handle form submission
    setIsOpen(false)
    // Reset form
    setCurrentStep(0)
    setBookingData({
      service: "",
      trainer: "",
      date: "",
      time: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <ChevronLeft className="w-5 h-5 text-gray-400" />
              <h2 className="text-2xl font-bold text-white">Service Selection</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Service: <span className="text-red-400">*</span>
                </label>
                <select
                  value={bookingData.service}
                  onChange={(e) => setBookingData({ ...bookingData, service: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.duration} ({service.price})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Trainer:</label>
                <select
                  value={bookingData.trainer}
                  onChange={(e) => setBookingData({ ...bookingData, trainer: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                >
                  <option value="">Select a trainer</option>
                  {trainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name} - {trainer.specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <ChevronLeft className="w-5 h-5 text-gray-400" />
              <h2 className="text-2xl font-bold text-white">Date & Time</h2>
            </div>

            {/* Calendar */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-400 p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays().map((date, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (date) {
                        setSelectedDate(date)
                        setBookingData({ ...bookingData, date: date.toISOString().split("T")[0] })
                      }
                    }}
                    disabled={!date || date < new Date()}
                    className={`p-2 text-sm rounded-lg transition-all duration-200 ${
                      !date
                        ? "invisible"
                        : date < new Date()
                          ? "text-gray-600 cursor-not-allowed"
                          : selectedDate?.toDateString() === date.toDateString()
                            ? "bg-yellow-400 text-black font-bold"
                            : "text-white hover:bg-gray-700"
                    }`}
                  >
                    {date?.getDate()}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Date Display */}
            {selectedDate && (
              <div className="text-center py-4">
                <p className="text-lg font-semibold text-white">{formatDate(selectedDate)}</p>
              </div>
            )}

            {/* Time Slots */}
            {selectedDate && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Available Times</h3>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setBookingData({ ...bookingData, time: slot })}
                      className={`p-3 rounded-lg border transition-all duration-200 ${
                        bookingData.time === slot
                          ? "bg-yellow-400 text-black border-yellow-400 font-semibold"
                          : "bg-gray-800 text-white border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <ChevronLeft className="w-5 h-5 text-gray-400" />
              <h2 className="text-2xl font-bold text-white">Your Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  First Name: <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={bookingData.firstName}
                  onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name: <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={bookingData.lastName}
                  onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email:</label>
                <input
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone:</label>
                <div className="flex">
                  <select className="p-3 bg-gray-800 border border-gray-600 rounded-l-lg text-white border-r-0 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors">
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                  </select>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="flex-1 p-3 bg-gray-800 border border-gray-600 rounded-r-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 px-8 py-3 text-sm font-medium tracking-wide uppercase hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Book Appointment
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex h-full">
          {/* Sidebar Navigation */}
          <div
            className={`bg-gray-800 transition-all duration-300 ${
              isCollapsed ? "w-16" : "w-80"
            } flex-shrink-0 relative`}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                {!isCollapsed && (
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">BOOK AN APPOINTMENT</h1>
                    <p className="text-gray-400 text-sm">Book a class with our professional trainers.</p>
                  </div>
                )}
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Steps */}
            <div className="p-4 space-y-2">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep
                const isCompleted = isStepCompleted(index)

                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(index)}
                    disabled={index > currentStep && !isStepCompleted(index - 1)}
                    className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? "bg-yellow-400 text-black"
                        : isCompleted
                          ? "bg-green-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    } ${index > currentStep && !isStepCompleted(index - 1) ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                      </div>
                      {!isCollapsed && (
                        <div>
                          <div className="font-semibold">{step.title}</div>
                          {isActive && bookingData.service && index === 0 && (
                            <div className="text-xs opacity-80 mt-1">
                              {services.find((s) => s.id === bookingData.service)?.name}
                              {bookingData.trainer && (
                                <div>{trainers.find((t) => t.id === bookingData.trainer)?.name}</div>
                              )}
                            </div>
                          )}
                          {isActive && bookingData.date && index === 1 && (
                            <div className="text-xs opacity-80 mt-1">
                              {new Date(bookingData.date).toLocaleDateString()} - {bookingData.time}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Collapse Toggle */}
            {!isCollapsed && (
              <div className="absolute bottom-4 left-4 right-4">
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="w-full p-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Collapse menu
                </button>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <div className="text-gray-400 text-sm">Book a class with our professional trainers.</div>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Content */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 min-h-0">
                {renderStepContent()}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-700 bg-gray-900 flex items-center justify-between shadow-lg flex-shrink-0">
              <div className="flex items-center gap-4">
                {currentStep > 0 && (
                  <Button
                    onClick={prevStep}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {currentStep < steps.length - 1 ? (
                  <Button
                    onClick={nextStep}
                    disabled={!canProceedToNext()}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceedToNext()}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Book Appointment
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
