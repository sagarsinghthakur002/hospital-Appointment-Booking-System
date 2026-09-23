/**
 * ALGORITHM 3 — Booking Conflict Detection (interval scheduling check)
 * ----------------------------------------------------------------------
 * Before a slot can be booked, or before it's even shown as available,
 * this checks whether the chosen doctor is already booked for that
 * exact date + time. It's the same core idea as classic interval-
 * overlap detection: two bookings for the same doctor "conflict" if
 * their [date, time] key matches and neither is cancelled.
 * Runs in O(n) over the current appointment list.
 */
export const isSlotTaken = (appointments, docId, slotDate, slotTime) => {
    return appointments.some(
        (a) => a.docId === docId && a.slotDate === slotDate && a.slotTime === slotTime && !a.cancelled
    )
}

/**
 * Given a day's generated time slots (each with a `datetime` and
 * `time`), strips out any slot that's already taken for that doctor —
 * so a booked slot simply disappears from the picker instead of
 * letting two patients grab the same appointment.
 */
export const filterAvailableSlots = (daySlots, appointments, docId) => {
    return daySlots.filter((slot) => {
        const date = slot.datetime
        const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`
        return !isSlotTaken(appointments, docId, slotDate, slot.time)
    })
}
