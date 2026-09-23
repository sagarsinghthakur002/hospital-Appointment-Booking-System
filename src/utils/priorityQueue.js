/**
 * ALGORITHM 1 — Priority Scheduling (binary min-heap based Priority Queue)
 * ---------------------------------------------------------------------
 * This is the same idea operating systems use for priority process
 * scheduling: every appointment gets a numeric priority key, lower
 * key = served first. Emergency cases always get tier 0 (highest
 * priority); normal appointments get tier 1. Within the same tier,
 * whoever booked first is served first (FIFO tiebreaker via
 * `createdAt`).
 *
 * Implemented as a real binary min-heap (not just Array.sort) so
 * insert/extract are O(log n) and the whole ordering is a proper
 * heap-sort: O(n log n) for n appointments.
 */

class PriorityQueue {
    constructor() {
        this.heap = []
    }

    size() {
        return this.heap.length
    }

    _parent(i) { return Math.floor((i - 1) / 2) }
    _left(i) { return 2 * i + 1 }
    _right(i) { return 2 * i + 2 }
    _swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]] }

    insert(item, priority) {
        this.heap.push({ item, priority })
        let i = this.heap.length - 1
        while (i > 0 && this.heap[this._parent(i)].priority > this.heap[i].priority) {
            this._swap(i, this._parent(i))
            i = this._parent(i)
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null
        const top = this.heap[0]
        const last = this.heap.pop()
        if (this.heap.length > 0) {
            this.heap[0] = last
            this._bubbleDown(0)
        }
        return top.item
    }

    _bubbleDown(i) {
        let smallest = i
        const l = this._left(i)
        const r = this._right(i)
        if (l < this.heap.length && this.heap[l].priority < this.heap[smallest].priority) smallest = l
        if (r < this.heap.length && this.heap[r].priority < this.heap[smallest].priority) smallest = r
        if (smallest !== i) {
            this._swap(i, smallest)
            this._bubbleDown(smallest)
        }
    }
}

/**
 * Sorts appointments so emergency cases always come first, using the
 * heap above. Returns a new array — does not mutate the input.
 */
export const sortAppointmentsByPriority = (appointments) => {
    const pq = new PriorityQueue()

    appointments.forEach((appt) => {
        const tier = appt.emergency ? 0 : 1               // 0 = emergency, 1 = normal
        const tieBreaker = appt.createdAt || 0             // earlier booking wins within a tier
        const priority = tier * 1e15 + tieBreaker
        pq.insert(appt, priority)
    })

    const sorted = []
    while (pq.size() > 0) sorted.push(pq.extractMin())
    return sorted
}

export default PriorityQueue
