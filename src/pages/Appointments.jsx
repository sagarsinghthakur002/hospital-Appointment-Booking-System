import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Appointments = () => {

  const { docId } = useParams()
  const { doctors } = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)

  const fetchDocInfo = () => {
    const doc = doctors.find((doc) => doc.id === docId)
    setDocInfo(doc)
  }

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      fetchDocInfo()
    }
  }, [doctors, docId])

  return (
    <div>

      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">

        {/* Doctor Image */}
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo?.image}
            alt={docInfo?.name || "Doctor"}
          />

          <h2 className="text-xl font-semibold mt-2">
            {docInfo?.name}
          </h2>

          <p className="text-gray-600">
            {docInfo?.speciality}
          </p>
        </div>

        {/* Doctor Information */}
        <div className="flex-1 border border-gray-300 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-lg">

          {/* Doctor Name */}
          <div className="flex items-center gap-2">

            <h1 className="text-2xl font-semibold">
              {docInfo?.name}
            </h1>

            <img
              className="w-5"
              src={assets.verified_icon}
              alt="Verified"
            />

          </div>

          {/* Degree and Experience */}
          <div className="flex items-center gap-3 mt-2">

            <p className="text-gray-700">
              {docInfo?.degree} - {docInfo?.speciality}
            </p>

            <button className="border border-gray-300 rounded-full px-3 py-1 text-sm">
              {docInfo?.experience}
            </button>

          </div>

          {/* About */}
          <div className="mt-5">

            <div className="flex items-center gap-2">

              <p className="font-semibold">
                About
              </p>

              <img
                className="w-4"
                src={assets.about_icon}
                alt="About"
              />

            </div>

            <p className="text-gray-600 mt-2">
              {docInfo?.about}
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Appointments