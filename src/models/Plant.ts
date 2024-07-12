// describes the layout of a plant object


// do i need?

// the info in a plant component
export interface Plant {
    id: number
    name: string
    species: string
    imageUrl?: string // optional image URL
    cultivar?: string
    stage: string
    location: string

}