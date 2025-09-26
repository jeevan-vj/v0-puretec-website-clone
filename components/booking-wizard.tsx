"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/toast"
import { Calendar, User, CheckCircle, ChevronLeft, ChevronRight, Clock, X, Phone, Mail, Star, Dumbbell } from "lucide-react"

interface BookingData {
  service: string
  trainer: string
  date: string
  time: string
  firstName: string
  lastName: string
  email: string
  phone: string
  countryCode: string
}

const services = [
  { id: "personal-training", name: "Personal Training", duration: "60 min", price: "$80", icon: "💪" },
  { id: "hiit-session", name: "HIIT Session", duration: "45 min", price: "$60", icon: "🔥" },
  { id: "strength-training", name: "Strength Training", duration: "75 min", price: "$90", icon: "🏋️" },
  { id: "nutrition-consultation", name: "Nutrition Consultation", duration: "30 min", price: "$50", icon: "🥗" },
  { id: "mobility-training", name: "Mobility Training", duration: "60 min", price: "$70", icon: "🧘" },
]

const trainers = [
  { 
    id: "ruwan-palihawadana", 
    name: "Ruwan Palihawadana", 
    specialty: "Personal Training",
    rating: 4.9,
    sessions: 150
  },
  { 
    id: "priya-fernando", 
    name: "Priya Fernando", 
    specialty: "HIIT & Cardio",
    rating: 4.8,
    sessions: 120
  },
  { 
    id: "daniel-silva", 
    name: "Daniel Silva", 
    specialty: "Strength Training",
    rating: 4.9,
    sessions: 200
  },
]

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
]

const countryCodes = [
  { code: "+1", flag: "🇺🇸", country: "US" },
  { code: "+44", flag: "🇬🇧", country: "UK" },
  { code: "+61", flag: "🇦🇺", country: "AU" },
  { code: "+64", flag: "🇳🇿", country: "NZ" },
]

const steps = [
  { id: "service", title: "Service", icon: Dumbbell, description: "Choose your service" },
  { id: "datetime", title: "Schedule", icon: Clock, description: "Pick date & time" },
  { id: "information", title: "Details", icon: User, description: "Your information" },
]

export default function BookingWizard() {
  const { addToast, ToastContainer } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [bookingData, setBookingData] = useState<BookingData>({
    service: "",
    trainer: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+1",
  })

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

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

    // Add days of the month (only future dates)
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      if (date >= today || date.toDateString() === today.toDateString()) {
        days.push(date)
      } else {
        days.push(null)
      }
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

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 2) {
      if (!bookingData.firstName.trim()) {
        newErrors.firstName = "First name is required"
      }
      if (!bookingData.lastName.trim()) {
        newErrors.lastName = "Last name is required"
      }
      if (!bookingData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(bookingData.email)) {
        newErrors.email = "Please enter a valid email"
      }
      if (!bookingData.phone.trim()) {
        newErrors.phone = "Phone number is required"
      } else if (!/^\d{3}-?\d{3}-?\d{4}$/.test(bookingData.phone.replace(/\s/g, ''))) {
        newErrors.phone = "Please enter a valid phone number"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return

    setIsSubmitting(true)
    
    try {
      console.log("Booking submitted:", bookingData)
      // Here you would typically send the data to your backend
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Show success message
      addToast({
        title: "🎉 Booking Submitted!",
        description: "We'll contact you soon to confirm your appointment.",
        variant: "success"
      })
      
      // Reset and close
      setIsOpen(false)
      setCurrentStep(0)
      setSelectedDate(null)
      setErrors({})
      setBookingData({
        service: "",
        trainer: "",
        date: "",
        time: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        countryCode: "+1",
      })
    } catch (error) {
      addToast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const getSelectedService = () => services.find(s => s.id === bookingData.service)
  const getSelectedTrainer = () => trainers.find(t => t.id === bookingData.trainer)

  const renderMobileStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-6 px-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
              index < currentStep
                ? "bg-green-500 text-white"
                : index === currentStep
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-700 text-gray-400"
            }`}
          >
            {index < currentStep ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 mx-1 transition-all duration-200 ${
                index < currentStep ? "bg-green-500" : "bg-gray-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Service</h2>
              <p className="text-gray-400">Select the training that fits your goals</p>
            </div>

            <div className="space-y-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setBookingData({ ...bookingData, service: service.id })}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    bookingData.service === service.id
                      ? "border-yellow-400 bg-yellow-400/10"
                      : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{service.icon}</span>
                      <div>
                        <h3 className="font-semibold text-white">{service.name}</h3>
                        <p className="text-sm text-gray-400">{service.duration}</p>
                      </div>
                    </div>
                    <span className="text-yellow-400 font-bold">{service.price}</span>
                  </div>
                </button>
              ))}
            </div>

            {bookingData.service && (
              <div className="space-y-4 mt-8">
                <h3 className="text-lg font-semibold text-white">Select Your Trainer</h3>
                {trainers.map((trainer) => (
                  <button
                    key={trainer.id}
                    onClick={() => setBookingData({ ...bookingData, trainer: trainer.id })}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      bookingData.trainer === trainer.id
                        ? "border-yellow-400 bg-yellow-400/10"
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-white">{trainer.name}</h4>
                        <p className="text-sm text-gray-400">{trainer.specialty}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-yellow-400">{trainer.rating}</span>
                          <span className="text-sm text-gray-500">• {trainer.sessions} sessions</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )

      case 1:
        return (
          <div className="space-y-6 px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Pick Your Schedule</h2>
              <p className="text-gray-400">Choose your preferred date and time</p>
            </div>

            {/* Calendar */}
            <div className="bg-gray-800/50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h3>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-400 p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((date, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (date) {
                        setSelectedDate(date)
                        setBookingData({ ...bookingData, date: date.toISOString().split("T")[0] })
                      }
                    }}
                    disabled={!date}
                    className={`aspect-square p-2 text-sm rounded-lg transition-all duration-200 ${
                      !date
                        ? "invisible"
                        : selectedDate?.toDateString() === date.toDateString()
                          ? "bg-yellow-400 text-black font-bold"
                          : "text-white hover:bg-gray-700 active:scale-95"
                    }`}
                  >
                    {date?.getDate()}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Date Display */}
            {selectedDate && (
              <div className="text-center py-4 bg-gray-800/30 rounded-xl">
                <p className="text-lg font-semibold text-white">{formatDate(selectedDate)}</p>
              </div>
            )}

            {/* Time Slots */}
            {selectedDate && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Available Times</h3>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setBookingData({ ...bookingData, time: slot })}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 active:scale-95 ${
                        bookingData.time === slot
                          ? "bg-yellow-400 text-black border-yellow-400 font-semibold"
                          : "bg-gray-800/50 text-white border-gray-700 hover:border-gray-600"
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
          <div className="space-y-6 px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Your Information</h2>
              <p className="text-gray-400">We need a few details to complete your booking</p>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-800/50 rounded-xl p-4 space-y-3">
              <h3 className="font-semibold text-white">Booking Summary</h3>
              {getSelectedService() && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Service:</span>
                  <span className="text-white font-medium">{getSelectedService()?.name}</span>
                </div>
              )}
              {getSelectedTrainer() && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Trainer:</span>
                  <span className="text-white font-medium">{getSelectedTrainer()?.name}</span>
                </div>
              )}
              {bookingData.date && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Date:</span>
                  <span className="text-white font-medium">{formatDate(new Date(bookingData.date))}</span>
                </div>
              )}
              {bookingData.time && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Time:</span>
                  <span className="text-white font-medium">{bookingData.time}</span>
                </div>
              )}
              {getSelectedService() && (
                <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                  <span className="text-gray-300">Total:</span>
                  <span className="text-yellow-400 font-bold text-lg">{getSelectedService()?.price}</span>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    First Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={bookingData.firstName}
                    onChange={(e) => {
                      setBookingData({ ...bookingData, firstName: e.target.value })
                      if (errors.firstName) {
                        setErrors({ ...errors, firstName: "" })
                      }
                    }}
                    className={`bg-gray-800 border-gray-600 text-white focus:border-yellow-400 ${
                      errors.firstName ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Last Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={bookingData.lastName}
                    onChange={(e) => {
                      setBookingData({ ...bookingData, lastName: e.target.value })
                      if (errors.lastName) {
                        setErrors({ ...errors, lastName: "" })
                      }
                    }}
                    className={`bg-gray-800 border-gray-600 text-white focus:border-yellow-400 ${
                      errors.lastName ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => {
                    setBookingData({ ...bookingData, email: e.target.value })
                    if (errors.email) {
                      setErrors({ ...errors, email: "" })
                    }
                  }}
                  className={`bg-gray-800 border-gray-600 text-white focus:border-yellow-400 ${
                    errors.email ? "border-red-500 focus:border-red-500" : ""
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">
                  Phone <span className="text-red-400">*</span>
                </Label>
                <div className="flex space-x-2">
                  <Select value={bookingData.countryCode} onValueChange={(value) => setBookingData({ ...bookingData, countryCode: value })}>
                    <SelectTrigger className="w-24 bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => {
                      setBookingData({ ...bookingData, phone: e.target.value })
                      if (errors.phone) {
                        setErrors({ ...errors, phone: "" })
                      }
                    }}
                    className={`flex-1 bg-gray-800 border-gray-600 text-white focus:border-yellow-400 ${
                      errors.phone ? "border-red-500 focus:border-red-500" : ""
                    }`}
                    placeholder="123-456-7890"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <ToastContainer />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 px-8 py-3 text-sm font-medium tracking-wide uppercase hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-md w-full max-w-[95vw] h-[90vh] max-h-[90vh] bg-gray-900 border-gray-700 text-white p-0 overflow-hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Mobile Header */}
        <DialogHeader className="p-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevStep}
                  className="text-white hover:bg-gray-700 p-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              )}
              <DialogTitle className="text-lg font-semibold">
                {steps[currentStep].title}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Step Indicator */}
        {renderMobileStepIndicator()}

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {renderStepContent()}
        </div>

        {/* Mobile Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 border-t border-gray-700">
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceedToNext()}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed py-3 font-semibold shadow-lg transition-all duration-200 active:scale-95"
              aria-label={`Continue to ${steps[currentStep + 1]?.title}`}
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceedToNext() || isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 font-semibold shadow-lg transition-all duration-200 active:scale-95"
              aria-label="Submit booking appointment"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Book Appointment
                  <CheckCircle className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}