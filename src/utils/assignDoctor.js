/**
 * ALGORITHM 2 — Least-Busy Load Balancing (Least Connections)
 * -------------------------------------------------------------
 * The same strategy load balancers use to route traffic: among the
 * candidate doctors (matching the requested speciality, if any),
 * pick whoever currently has the fewest active, non-cancelled
 * appointments. This spreads emergency cases across doctors instead
 * of always routing to the same one — O(n * m) where n = doctors,
 * m = appointments, both small enough here to run on every request.
 */
export const assignLeastBusyDoctor = (doctors, appointments, speciality) => {
    const candidates = speciality
        ? doctors.filter((d) => d.speciality === speciality)
        : doctors

    const pool = candidates.length > 0 ? candidates : doctors
    if (pool.length === 0) return null

    let chosen = pool[0]
    let minLoad = Infinity

    pool.forEach((doc) => {
        const load = appointments.filter((a) => a.docId === doc._id && !a.cancelled).length
        if (load < minLoad) {
            minLoad = load
            chosen = doc
        }
    })

    return chosen
}
